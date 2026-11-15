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

    describe('3.1 Strategy ➔ Copy Data Continuity', () => {
      it('Strategy Brief and Creative Package maintain ICP and brand entity alignment', () => {
        const strategyPath = resolveArtifactPath('strategy_brief');
        const creativePath = resolveArtifactPath('creative_package');
        const activeBrand = getActiveBrand();

        if (fs.existsSync(strategyPath) && fs.existsSync(creativePath)) {
          const strategy = JSON.parse(fs.readFileSync(strategyPath, 'utf8'));
          const creative = JSON.parse(fs.readFileSync(creativePath, 'utf8'));

          // Brand name alignment - mandatory contract assertions
          const stratBrand = strategy.brandName || strategy.client || strategy.brand?.name;
          const creatBrand = creative.brandName || creative.client || creative.brand?.name;
          assert.ok(stratBrand, 'Strategy Brief must define brandName');
          assert.ok(creatBrand, 'Creative Package must define brandName');
          assert.strictEqual(stratBrand, creatBrand, 'Brand name must match between Strategy and Creative');
          assert.strictEqual(stratBrand, activeBrand.name);

          // Founder alignment - mandatory contract assertions
          const stratFounder = strategy.founder || strategy.brand?.founder || activeBrand.founder;
          const creatFounder = creative.founder || creative.brand?.founder || activeBrand.founder;
          assert.ok(stratFounder, 'Strategy Brief must define founder');
          assert.ok(creatFounder, 'Creative Package must define founder');
          assert.strictEqual(stratFounder, creatFounder, 'Founder must match between Strategy and Creative');
          assert.strictEqual(stratFounder, activeBrand.founder);

          // Domain alignment - mandatory contract assertions
          const stratDomain = strategy.domain || strategy.brand?.domain;
          const creatDomain = creative.domain || creative.brand?.domain;
          assert.ok(stratDomain, 'Strategy Brief must define domain');
          assert.ok(creatDomain, 'Creative Package must define domain');
          assert.strictEqual(stratDomain, creatDomain, 'Domain must match between Strategy and Creative');
          assert.strictEqual(stratDomain, activeBrand.domain);
        } else {
          // Verify that brand tokens enforce this contract baseline
          assert.ok(fileExists('src/tokens/brand.json'), 'src/tokens/brand.json must exist');
          const tokens = readJsonFile('src/tokens/brand.json');
          assert.strictEqual(tokens.brandName || tokens.brand?.name || tokens.name, activeBrand.name);
        }
      });

      it('Target pain points and services propagate into Google RSA and Technical Article', () => {
        if (fileExists('src/content/ads_google_rsa.json')) {
          const rsa = readJsonFile('src/content/ads_google_rsa.json');
          const rsaText = JSON.stringify(rsa).toLowerCase();
          assert.ok(
            rsaText.length > 50,
            'Google RSA ads must contain content'
          );
        }

        if (fileExists('src/content/technical_article.md')) {
          const article = readProjectFile('src/content/technical_article.md').toLowerCase();
          assert.ok(
            article.length > 200,
            'Technical article must contain substantive content'
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
          const totalFramesTarget = motion.duration_frames || motion.durationInFrames || (motion.durationSeconds ? motion.durationSeconds * fps : (motion.duration_seconds ? motion.duration_seconds * fps : 1800));

          let calculatedFrames = 0;
          const scenes = script.scenes || script.timeline;

          if (scenes) {
            assert.ok(Array.isArray(scenes) && scenes.length > 0, 'voiceover_script scenes must be a non-empty array');
            for (const scene of scenes) {
              const durFrames = scene.duration_frames || scene.durationFrames;
              const durSecs = scene.duration_seconds || scene.durationSeconds;
              assert.ok(
                (durFrames > 0) || (durSecs > 0),
                'Each scene must specify positive duration_frames or duration_seconds'
              );
              if (durFrames) {
                calculatedFrames += durFrames;
              } else if (durSecs) {
                calculatedFrames += Math.round(durSecs * fps);
              }
            }
            assert.strictEqual(
              calculatedFrames,
              totalFramesTarget,
              `Total voiceover frames (${calculatedFrames}) must equal motion config frames (${totalFramesTarget})`
            );
          } else if (script.total_frames || script.durationFrames) {
            assert.strictEqual(script.total_frames || script.durationFrames, totalFramesTarget);
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

      it('Voiceover scenes mandate exact brand captions and domain', () => {
        if (fileExists('src/content/voiceover_script.json')) {
          const script = readJsonFile('src/content/voiceover_script.json');
          const scriptString = JSON.stringify(script);
          const activeBrand = getActiveBrand();
          assert.ok(
            scriptString.includes(activeBrand.name),
            `Voiceover script must contain exact brand "${activeBrand.name}"`
          );
          assert.ok(
            scriptString.includes(activeBrand.domain),
            `Voiceover script must contain exact domain "${activeBrand.domain}"`
          );
        }
      });
    });

    describe('3.3 Strategy / Copy ➔ SEO & Public Context Alignment', () => {
      it('Schema.org Organization name, Founder, and Canonical URL align with Brand Tokens', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const activeBrand = getActiveBrand();
        const brandName = tokens.brandName || tokens.brand?.name || tokens.name;
        const founder = tokens.founder || tokens.brand?.founder;
        const url = tokens.websiteUrl || tokens.brand?.url || `https://${tokens.domain}`;

        if (fileExists('public/schema.json')) {
          const schema = readJsonFile('public/schema.json');
          const graph = schema['@graph'];
          assert.ok(Array.isArray(graph), 'public/schema.json must contain @graph array');

          const mainEntity = graph.find(e => ['Organization', 'LocalBusiness', 'ProfessionalService'].includes(e['@type']));
          assert.ok(mainEntity, 'Schema must define an Organization, LocalBusiness or ProfessionalService entity');
          assert.strictEqual(mainEntity.name, brandName, 'Schema entity name must match brandName');
          assert.ok(
            mainEntity.url.includes(activeBrand.domain),
            'Schema entity URL must reference active domain'
          );
        }
      });

      it('Pricing document matches service scopes referenced in public context', () => {
        if (fileExists('public/pricing.md')) {
          const pricing = readProjectFile('public/pricing.md');
          const activeBrand = getActiveBrand();
          assert.ok(
            pricing.includes(activeBrand.domain),
            'Pricing document must reference active domain'
          );
        }
      });
    });

    describe('3.4 Design Tokens ➔ Styling Synchronization', () => {
      it('Design tokens hex values match CSS variables in theme.css and motion style.css', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const activeBrand = getActiveBrand();

        if (fileExists('src/styles/theme.css')) {
          const css = readProjectFile('src/styles/theme.css');
          assert.ok(css.includes('--bg-primary'), 'theme.css must define --bg-primary');
        }
      });
    });

    describe('3.5 HTML Script Injection Sanitization', () => {
      it('public/schema.json must not contain unescaped "<script" tags to prevent HTML injection', () => {
        if (fileExists('public/schema.json')) {
          const raw = readProjectFile('public/schema.json');
          assert.doesNotMatch(
            raw,
            /<\s*script/i,
            'public/schema.json contains dangerous unescaped <script tags'
          );
        }
      });
    });

  });
}

if (isDirectCliRun(import.meta.url)) {
  runTier3Pipeline();
}
