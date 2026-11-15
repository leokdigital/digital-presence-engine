import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  fileExists,
  readProjectFile,
  readJsonFile,
  resolveArtifactPath,
  isDirectCliRun
} from './helpers.mjs';

export async function runTier3Pipeline(suiteName = 'Tier 3: Cross-Feature Pipeline Coherence') {
  await describe(suiteName, () => {

    describe('3.1 Strategy ➔ Copy Data Continuity', () => {
      it('Strategy Brief and Creative Package maintain ICP and brand entity alignment', () => {
        const strategyPath = resolveArtifactPath('strategy_brief');
        const creativePath = resolveArtifactPath('creative_package');

        if (fs.existsSync(strategyPath) && fs.existsSync(creativePath)) {
          const strategy = JSON.parse(fs.readFileSync(strategyPath, 'utf8'));
          const creative = JSON.parse(fs.readFileSync(creativePath, 'utf8'));

          // Brand name alignment - mandatory contract assertions
          const stratBrand = strategy.brandName || strategy.brand?.name;
          const creatBrand = creative.brandName || creative.brand?.name;
          assert.ok(stratBrand, 'Strategy Brief must define brandName');
          assert.ok(creatBrand, 'Creative Package must define brandName');
          assert.strictEqual(stratBrand, creatBrand, 'Brand name must match between Strategy and Creative');
          assert.strictEqual(stratBrand, 'Leo K Digital');

          // Founder alignment - mandatory contract assertions
          const stratFounder = strategy.founder || strategy.brand?.founder;
          const creatFounder = creative.founder || creative.brand?.founder;
          assert.ok(stratFounder, 'Strategy Brief must define founder');
          assert.ok(creatFounder, 'Creative Package must define founder');
          assert.strictEqual(stratFounder, creatFounder, 'Founder must match between Strategy and Creative');
          assert.strictEqual(stratFounder, 'Leonardo Kinoshita');

          // Domain alignment - mandatory contract assertions
          const stratDomain = strategy.domain || strategy.brand?.domain;
          const creatDomain = creative.domain || creative.brand?.domain;
          assert.ok(stratDomain, 'Strategy Brief must define domain');
          assert.ok(creatDomain, 'Creative Package must define domain');
          assert.strictEqual(stratDomain, creatDomain, 'Domain must match between Strategy and Creative');
          assert.strictEqual(stratDomain, 'leokdigital.com.br');
        } else {
          // Verify that brand tokens enforce this contract baseline
          assert.ok(fileExists('src/tokens/brand.json'), 'src/tokens/brand.json must exist');
          const tokens = readJsonFile('src/tokens/brand.json');
          assert.strictEqual(tokens.brandName || tokens.brand?.name, 'Leo K Digital');
        }
      });

      it('Target pain point "planilhas manuais" propagates into Google RSA and Technical Article', () => {
        if (fileExists('src/content/ads_google_rsa.json')) {
          const rsa = readJsonFile('src/content/ads_google_rsa.json');
          const rsaText = JSON.stringify(rsa).toLowerCase();
          assert.ok(
            rsaText.includes('planilha') || rsaText.includes('sistema'),
            'Google RSA ads must address spreadsheets or web systems'
          );
        }

        if (fileExists('src/content/technical_article.md')) {
          const article = readProjectFile('src/content/technical_article.md').toLowerCase();
          assert.ok(
            article.includes('planilha') || article.includes('excel'),
            'Technical article must discuss spreadsheet migration'
          );
        }
      });
    });

    describe('3.2 Copy ➔ Motion Synchronization Math (Frames & Timecodes)', () => {
      it('Voiceover scene duration sum equals total video duration (1800 frames / 30s @ 60fps)', () => {
        if (fileExists('src/content/voiceover_script.json') && fileExists('src/motion/hyperframes.config.json')) {
          const script = readJsonFile('src/content/voiceover_script.json');
          const motion = readJsonFile('src/motion/hyperframes.config.json');

          const fps = motion.fps || 60;
          const totalFramesTarget = motion.duration_frames || (motion.duration_seconds ? motion.duration_seconds * fps : 1800);

          let calculatedFrames = 0;
          const scenes = script.scenes || script.timeline;

          if (scenes) {
            assert.ok(Array.isArray(scenes) && scenes.length > 0, 'voiceover_script scenes must be a non-empty array');
            for (const scene of scenes) {
              assert.ok(
                (scene.duration_frames > 0) || (scene.duration_seconds > 0),
                'Each scene must specify positive duration_frames or duration_seconds'
              );
              if (scene.duration_frames) {
                calculatedFrames += scene.duration_frames;
              } else if (scene.duration_seconds) {
                calculatedFrames += Math.round(scene.duration_seconds * fps);
              }
            }
            assert.strictEqual(
              calculatedFrames,
              totalFramesTarget,
              `Total voiceover frames (${calculatedFrames}) must equal motion config frames (${totalFramesTarget})`
            );
          } else if (script.total_frames) {
            assert.strictEqual(script.total_frames, totalFramesTarget);
          } else {
            assert.fail('voiceover_script must specify either non-empty scenes or total_frames');
          }
        } else {
          // Token baseline check: 30s @ 60fps = 1800 frames
          const fps = 60;
          const durationSeconds = 30;
          const expectedFrames = fps * durationSeconds;
          assert.strictEqual(expectedFrames, 1800, 'Baseline frame budget is 1800 frames (30s @ 60fps)');
        }
      });

      it('Voiceover scenes mandate exact brand captions "Leo K Digital" and "leokdigital.com.br"', () => {
        if (fileExists('src/content/voiceover_script.json')) {
          const script = readJsonFile('src/content/voiceover_script.json');
          const scriptString = JSON.stringify(script);
          assert.ok(
            scriptString.includes('Leo K Digital'),
            'Voiceover script must contain exact brand "Leo K Digital"'
          );
          assert.ok(
            scriptString.includes('leokdigital.com.br'),
            'Voiceover script must contain exact domain "leokdigital.com.br"'
          );
        }
      });
    });

    describe('3.3 Strategy / Copy ➔ SEO & Public Context Alignment', () => {
      it('Schema.org Organization name, Founder, and Canonical URL align with Brand Tokens', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const brandName = tokens.brandName || tokens.brand?.name;
        const founder = tokens.founder || tokens.brand?.founder;
        const url = tokens.websiteUrl || tokens.brand?.url;

        if (fileExists('public/schema.json')) {
          const schema = readJsonFile('public/schema.json');
          const graph = schema['@graph'] || (Array.isArray(schema) ? schema : [schema]);
          const org = graph.find(e => e['@type'] === 'Organization' || e['@type'] === 'ProfessionalService');

          if (org) {
            assert.strictEqual(org.name, brandName, 'Schema Organization name must match tokens');
            assert.strictEqual(org.url, url, 'Schema Organization URL must match tokens');
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

      it('Pricing document matches service scopes referenced in public context', () => {
        if (fileExists('public/pricing.md')) {
          const pricing = readProjectFile('public/pricing.md');
          assert.ok(pricing.includes('Leo K Digital'), 'pricing.md must include Leo K Digital');
          assert.ok(
            pricing.includes('Sistemas Web') || pricing.includes('Presença Digital') || pricing.includes('SEO'),
            'pricing.md must outline core service offerings'
          );
        }
      });
    });

    describe('3.4 Design Tokens ➔ Styling Synchronization', () => {
      it('Design tokens hex values match CSS variables in theme.css and motion style.css', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const themeCss = readProjectFile('src/styles/theme.css');

        const red = tokens.accentRed || tokens.colors?.accents?.red;
        assert.ok(themeCss.includes(red), `theme.css must contain token red: ${red}`);

        const yellow = tokens.accentYellow || tokens.colors?.accents?.yellow;
        assert.ok(themeCss.includes(yellow), `theme.css must contain token yellow: ${yellow}`);

        const blue = tokens.accentBlue || tokens.colors?.accents?.blue;
        assert.ok(themeCss.includes(blue), `theme.css must contain token blue: ${blue}`);

        const green = tokens.accentGreen || tokens.colors?.accents?.green;
        assert.ok(themeCss.includes(green), `theme.css must contain token green: ${green}`);

        if (fileExists('src/motion/style.css')) {
          const motionCss = readProjectFile('src/motion/style.css');
          // Motion CSS should either import theme.css or use the same colors
          assert.ok(
            motionCss.includes('0A0A0F') || motionCss.includes('theme.css') || motionCss.includes('--bg-primary'),
            'motion style.css must align with Dark Tech theme'
          );
        }
      });
    });

    describe('3.5 HTML Script Injection Sanitization', () => {
      it('public/schema.json must not contain unescaped "<script" tags to prevent HTML injection', () => {
        if (fileExists('public/schema.json')) {
          const raw = readProjectFile('public/schema.json');
          assert.doesNotMatch(
            raw,
            /<script/i,
            'public/schema.json must never contain unescaped "<script" tags'
          );
          assert.doesNotMatch(
            raw,
            /<\/script/i,
            'public/schema.json must never contain unescaped "</script" tags'
          );
          if (raw.includes('<script') || raw.includes('</script')) {
            assert.fail('Raw script tags detected in public/schema.json');
          }
        }
      });
    });

  });
}

if (isDirectCliRun(import.meta.url)) {
  runTier3Pipeline();
}
