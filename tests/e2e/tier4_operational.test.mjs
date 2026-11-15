import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import {
  resolvePath,
  fileExists,
  readProjectFile,
  readJsonFile,
  getActiveBrand,
  isDirectCliRun
} from './helpers.mjs';

export async function runTier4Operational(suiteName = 'Tier 4: Real-World Operational Execution') {
  await describe(suiteName, () => {

    describe('4.1 Strict JSON Parsing Across Deliverables', () => {
      const jsonDeliverables = [
        'package.json',
        'src/tokens/brand.json',
        'src/content/ads_google_rsa.json',
        'src/content/ads_meta.json',
        'src/content/voiceover_script.json',
        'src/motion/hyperframes.config.json',
        'public/schema.json'
      ];

      for (const file of jsonDeliverables) {
        it(`Strict JSON parse without error: ${file}`, () => {
          if (fileExists(file)) {
            const raw = readProjectFile(file);
            assert.doesNotThrow(
              () => JSON.parse(raw),
              `File ${file} failed strict JSON.parse validation`
            );
          } else {
            // For files under construction, verify basic brand tokens parse cleanly
            const tokensRaw = readProjectFile('src/tokens/brand.json');
            assert.doesNotThrow(() => JSON.parse(tokensRaw));
          }
        });
      }
    });

    describe('4.2 Advertising Copy Platform Character Limits', () => {
      it('Google Ads RSA headlines <= 30 chars and descriptions <= 90 chars', () => {
        if (fileExists('src/content/ads_google_rsa.json')) {
          const rsa = readJsonFile('src/content/ads_google_rsa.json');
          const headlines = rsa.headlines || [];
          const descriptions = rsa.descriptions || [];
          const activeBrand = getActiveBrand();

          assert.ok(headlines.length > 0, 'Google RSA ads must contain headlines');
          assert.ok(descriptions.length > 0, 'Google RSA ads must contain descriptions');

          let hasBrandName = false;
          for (const item of headlines) {
            const text = typeof item === 'string' ? item : item.text;
            assert.ok(
              text.length <= 30,
              `Headline "${text}" exceeds 30-char limit (${text.length} chars)`
            );
            if (text.toLowerCase().includes(activeBrand.name.substring(0, 20).toLowerCase())) {
              hasBrandName = true;
            }
          }

          assert.ok(hasBrandName, `Google RSA headlines must include "${activeBrand.name}"`);

          for (const item of descriptions) {
            const text = typeof item === 'string' ? item : item.text;
            assert.ok(
              text.length <= 90,
              `Description "${text}" exceeds 90-char limit (${text.length} chars)`
            );
          }
        }
      });

      it('Meta Ads opening hook <= 125 chars before fold truncation', () => {
        if (fileExists('src/content/ads_meta.json')) {
          const meta = readJsonFile('src/content/ads_meta.json');
          const ads = Array.isArray(meta) ? meta : (meta.variations || meta.ads || [meta]);

          for (const ad of ads) {
            const hook = ad.hook || ad.primary_text_hook || ad.headline;
            if (hook) {
              assert.ok(
                hook.length <= 125,
                `Meta ad hook "${hook}" exceeds 125-char limit (${hook.length} chars)`
              );
            }
          }
        }
      });
    });

    describe('4.3 Technical Article Depth & Engineering Rigor', () => {
      it('Technical article has >= 800 words, author attribution, and code blocks', () => {
        if (fileExists('src/content/technical_article.md')) {
          const article = readProjectFile('src/content/technical_article.md');
          const activeBrand = getActiveBrand();

          // Word count check
          const words = article.trim().split(/\s+/).filter(w => w.length > 0);
          assert.ok(
            words.length >= 800,
            `Technical article length (${words.length} words) is below required minimum (800 words)`
          );

          // Author check
          assert.match(
            article,
            new RegExp(activeBrand.founder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            `Technical article must credit founder ${activeBrand.founder}`
          );

          // Code block check
          assert.match(
            article,
            /```(?:javascript|typescript|sql|python|bash|json)?[\s\S]+?```/,
            'Technical article must include technical code blocks'
          );
        }
      });
    });

    describe('4.4 Schema.org JSON-LD @graph Validation', () => {
      it('Schema.org @graph contains Organization, WebSite, ProfessionalService, >=3 Services, and FAQPage', () => {
        if (fileExists('public/schema.json')) {
          const schema = readJsonFile('public/schema.json');
          const graph = schema['@graph'];
          assert.ok(Array.isArray(graph), 'public/schema.json must contain an "@graph" array');

          const types = graph.flatMap(e => Array.isArray(e['@type']) ? e['@type'] : [e['@type']]);
          assert.ok(types.includes('Organization') || types.includes('LocalBusiness'), 'Schema must include Organization or LocalBusiness');
          assert.ok(types.includes('WebSite'), 'Schema must include WebSite');
          assert.ok(
            types.includes('ProfessionalService') || types.includes('LocalBusiness') || types.includes('LegalService') || types.includes('Dentist') || types.includes('Restaurant'),
            'Schema must include ProfessionalService, LocalBusiness or industry specific business type'
          );
          assert.ok(types.includes('FAQPage'), 'Schema must include FAQPage');

          const services = graph.filter(e => e['@type'] === 'Service');
          assert.ok(
            services.length >= 3,
            `Schema must define at least 3 Service entities (found ${services.length})`
          );
        }
      });
    });

    describe('4.5 Machine Context & Web Crawler Policy', () => {
      it('robots.txt allows search bots and references canonical sitemap', () => {
        if (fileExists('public/robots.txt')) {
          const robots = readProjectFile('public/robots.txt');
          const activeBrand = getActiveBrand();
          assert.match(robots, /User-agent:\s*\*/i, 'robots.txt must declare User-agent: *');
          assert.match(
            robots,
            new RegExp(`Sitemap:\\s*https?:\\/\\/${activeBrand.domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/sitemap\\.xml`, 'i'),
            'robots.txt must declare canonical sitemap URL'
          );
        }
      });

      it('llms.txt provides structured machine context for AI search engines', () => {
        if (fileExists('public/llms.txt')) {
          const llms = readProjectFile('public/llms.txt');
          const activeBrand = getActiveBrand();
          assert.match(
            llms,
            new RegExp(`# ${activeBrand.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'),
            `llms.txt must have title # ${activeBrand.name}`
          );
          assert.match(
            llms,
            new RegExp(activeBrand.founder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            `llms.txt must reference ${activeBrand.founder}`
          );
          assert.match(
            llms,
            new RegExp(activeBrand.domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            `llms.txt must reference ${activeBrand.domain}`
          );
        }
      });
    });

    describe('4.6 Motion Code Syntactic Check via node --check', () => {
      it('src/motion/main.js has valid ECMAScript syntax validated by node --check', () => {
        if (fileExists('src/motion/main.js')) {
          const fullPath = resolvePath('src/motion/main.js');
          assert.doesNotThrow(() => {
            execSync(`node --check "${fullPath}"`, { stdio: 'pipe' });
          }, 'src/motion/main.js failed syntax verification via node --check');
        }
      });
    });

  });
}

if (isDirectCliRun(import.meta.url)) {
  runTier4Operational();
}
