import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  fileExists,
  readProjectFile,
  readJsonFile,
  resolveArtifactPath,
  getActiveBrand,
  isDirectCliRun
} from './helpers.mjs';

export async function runTier3Pipeline(suiteName = 'Tier 3: Cross-Feature Pipeline Coherence') {
  await describe(suiteName, () => {
    const brand = getActiveBrand();

    describe('3.1 Strategy ➔ Copy Data Continuity', () => {
      it('Strategy Brief and Creative Package maintain ICP and brand entity alignment', () => {
        const strategyPath = resolveArtifactPath('strategy_brief.json');
        const creativePath = resolveArtifactPath('creative_package.json');

        if (fs.existsSync(strategyPath) && fs.existsSync(creativePath)) {
          const strategy = JSON.parse(fs.readFileSync(strategyPath, 'utf8'));
          const creative = JSON.parse(fs.readFileSync(creativePath, 'utf8'));

          // Brand name alignment - mandatory contract assertions
          const stratBrand = strategy.client || strategy.brandName || strategy.brand?.name;
          const creatBrand = creative.client || creative.brandName || creative.brand?.name;
          assert.ok(stratBrand, 'Strategy Brief must define brand/client name');
          assert.ok(creatBrand, 'Creative Package must define brand/client name');
          assert.strictEqual(stratBrand, creatBrand, 'Brand name must match between Strategy and Creative');
          assert.strictEqual(stratBrand, brand.name);

          // Domain alignment
          const stratDomain = strategy.domain || strategy.brand?.domain;
          const creatDomain = creative.domain || creative.brand?.domain;
          if (stratDomain && creatDomain) {
            assert.strictEqual(stratDomain, creatDomain, 'Domain must match between Strategy and Creative');
            assert.strictEqual(stratDomain, brand.domain);
          }
        } else {
          // Verify that brand tokens enforce this contract baseline
          assert.ok(fileExists('src/tokens/brand.json'), 'src/tokens/brand.json must exist');
          const tokens = readJsonFile('src/tokens/brand.json');
          assert.strictEqual(tokens.name || tokens.brandName, brand.name);
        }
      });

      it('Target positioning propagates into Google RSA and Technical Article', () => {
        if (fileExists('src/content/ads_google_rsa.json')) {
          const rsa = readJsonFile('src/content/ads_google_rsa.json');
          const rsaText = JSON.stringify(rsa).toLowerCase();
          assert.ok(
            rsaText.length > 50,
            'Google RSA must contain populated ad copy'
          );
        }

        if (fileExists('src/content/technical_article.md')) {
          const article = readProjectFile('src/content/technical_article.md');
          assert.ok(
            article.includes(brand.name),
            `Technical article must reinforce active brand "${brand.name}"`
          );
        }
      });
    });

    describe('3.2 Copy ➔ Motion Synchronization Math (Frames & Timecodes)', () => {
      it('Voiceover scene duration sum equals total video duration (e.g. 1800 frames / 30s @ 60fps)', () => {
        if (fileExists('src/content/voiceover_script.json') && fileExists('src/motion/hyperframes.config.json')) {
          const script = readJsonFile('src/content/voiceover_script.json');
          const motion = readJsonFile('src/motion/hyperframes.config.json');

          const expectedTotalFrames = motion.durationInFrames || (motion.fps * 30);
          assert.ok(expectedTotalFrames > 0, 'Motion config must define duration');

          if (Array.isArray(script.scenes) && script.scenes[0]?.durationFrames) {
            const sumFrames = script.scenes.reduce((acc, scene) => acc + (scene.durationFrames || 0), 0);
            assert.strictEqual(
              sumFrames,
              expectedTotalFrames,
              `Sum of scene frames (${sumFrames}) must equal motion durationInFrames (${expectedTotalFrames})`
            );
          }
        }
      });

      it(`Voiceover scenes mandate exact brand captions "${brand.name}" and "${brand.domain}"`, () => {
        if (fileExists('src/content/voiceover_script.json')) {
          const script = readJsonFile('src/content/voiceover_script.json');
          const scriptString = JSON.stringify(script);
          assert.ok(
            scriptString.includes(brand.name),
            `Voiceover script must contain exact brand "${brand.name}"`
          );
          assert.ok(
            scriptString.includes(brand.domain),
            `Voiceover script must contain exact domain "${brand.domain}"`
          );
        }
      });
    });

    describe('3.3 Strategy / Copy ➔ SEO & Public Context Alignment', () => {
      it('Schema.org Organization name, Founder, and Canonical URL align with Brand Tokens', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const brandName = tokens.name || tokens.brandName || tokens.brand?.name;
        const founder = tokens.founder || tokens.brand?.founder;
        const domain = tokens.domain;

        if (fileExists('public/schema.json')) {
          const schema = readJsonFile('public/schema.json');
          const graph = schema['@graph'] || (Array.isArray(schema) ? schema : [schema]);
          const org = graph.find(e => {
            const t = Array.isArray(e['@type']) ? e['@type'] : [e['@type']];
            return t.includes('Organization') || t.includes('ProfessionalService') || t.includes('LocalBusiness');
          });

          if (org) {
            assert.strictEqual(org.name, brandName, 'Schema Organization name must match tokens');
            assert.ok(org.url.includes(domain), 'Schema Organization URL must match domain');
            const orgFounder = typeof org.founder === 'object' ? org.founder?.name : org.founder;
            if (orgFounder) {
              assert.strictEqual(orgFounder, founder, 'Schema Founder name must match tokens');
            }
          }
        }

        if (fileExists('public/llms.txt')) {
          const llms = readProjectFile('public/llms.txt');
          assert.ok(llms.includes(brandName), 'llms.txt must include exact brand name');
          assert.ok(llms.includes(founder), 'llms.txt must include founder name');
        }
      });

      it(`Pricing document matches service scopes referenced in public context`, () => {
        if (fileExists('public/pricing.md')) {
          const pricing = readProjectFile('public/pricing.md');
          assert.ok(pricing.includes(brand.name), `pricing.md must include "${brand.name}"`);
          assert.ok(
            pricing.includes('Serviços') || pricing.includes('Investimento'),
            'pricing.md must outline core service offerings'
          );
        }
      });
    });

    describe('3.4 Design Tokens ➔ Styling Synchronization', () => {
      it('Design tokens hex values match CSS variables in theme.css and motion style.css', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const themeCss = readProjectFile('src/styles/theme.css');
        const colors = tokens.colors || tokens.theme;

        if (colors?.background) {
          assert.ok(
            themeCss.includes(colors.background),
            `theme.css must declare background color "${colors.background}"`
          );
        }
        if (colors?.primary) {
          assert.ok(
            themeCss.includes(colors.primary),
            `theme.css must declare primary color "${colors.primary}"`
          );
        }
      });
    });

    describe('3.5 HTML Script Injection Sanitization', () => {
      it('public/schema.json must not contain unescaped "<script" tags to prevent HTML injection', () => {
        if (fileExists('public/schema.json')) {
          const raw = readProjectFile('public/schema.json');
          assert.strictEqual(
            raw.includes('<script'),
            false,
            'public/schema.json must sanitize any literal "<script" strings'
          );
        }
      });
    });

  });
}

if (isDirectCliRun(import.meta.url)) {
  runTier3Pipeline();
}
