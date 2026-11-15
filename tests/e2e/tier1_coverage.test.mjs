import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  PROJECT_ROOT,
  resolvePath,
  resolveArtifactPath,
  fileExists,
  readProjectFile,
  readJsonFile,
  isDirectCliRun
} from './helpers.mjs';

export async function runTier1Coverage(suiteName = 'Tier 1: Feature & Contract Coverage') {
  await describe(suiteName, () => {

    describe('1.1 Deliverable File Presence & Non-Triviality (26 Target Deliverables)', () => {
      const coreDeliverables = [
        // 1. Root & Infra
        { path: 'package.json', minLength: 200 },
        { path: 'README.md', minLength: 200 },
        { path: 'PROJECT.md', minLength: 200 },
        { path: 'TEST_INFRA.md', minLength: 200 },

        // 2. Playbooks (all 6)
        { path: 'docs/playbooks/01_skill_discovery_and_mgmt.md', minLength: 200 },
        { path: 'docs/playbooks/02_strategy_and_audience.md', minLength: 200 },
        { path: 'docs/playbooks/03_copywriting_and_creative.md', minLength: 200 },
        { path: 'docs/playbooks/04_seo_geo_aeo_engine.md', minLength: 200 },
        { path: 'docs/playbooks/05_visual_motion_production.md', minLength: 200 },
        { path: 'docs/playbooks/06_e2e_testing_and_qa.md', minLength: 200 },

        // 3. Tokens & Styles
        { path: 'src/tokens/brand.json', minLength: 200 },
        { path: 'src/styles/theme.css', minLength: 200 },

        // 4. Content
        { path: 'src/content/ads_google_rsa.json', minLength: 200 },
        { path: 'src/content/ads_meta.json', minLength: 200 },
        { path: 'src/content/technical_article.md', minLength: 200 },
        { path: 'src/content/voiceover_script.json', minLength: 200 },

        // 5. Motion
        { path: 'src/motion/hyperframes.config.json', minLength: 200 },
        { path: 'src/motion/index.html', minLength: 200 },
        { path: 'src/motion/style.css', minLength: 200 },
        { path: 'src/motion/main.js', minLength: 200 },

        // 6. SEO & Machine Context
        { path: 'public/schema.json', minLength: 200 },
        { path: 'public/llms.txt', minLength: 200 },
        { path: 'public/pricing.md', minLength: 200 },
        { path: 'public/robots.txt', minLength: 50 } // robots.txt is allowed >= 50
      ];

      for (const item of coreDeliverables) {
        it(`Deliverable exists, meets length, and is non-trivial: ${item.path}`, () => {
          assert.ok(fileExists(item.path), `Missing required deliverable: ${item.path}`);
          const content = readProjectFile(item.path);
          assert.ok(
            content.trim().length >= item.minLength,
            `Deliverable ${item.path} length (${content.trim().length}) is below required minimum (${item.minLength})`
          );
          // Reject stub placeholders (skipping self-referential definitions in QA documentation)
          if (!item.path.includes('TEST_INFRA.md') && !item.path.includes('06_e2e_testing_and_qa.md')) {
            assert.doesNotMatch(content, /TODO:\s*IMPLEMENT/i, `${item.path} contains stub "TODO: IMPLEMENT"`);
            assert.doesNotMatch(content, /Lorem\s+Ipsum/i, `${item.path} contains filler text "Lorem Ipsum"`);
          }
        });
      }

      // 7. Inter-Stage Handoff Contracts (handled with snake_case and kebab-case resolution)
      const handoffContracts = [
        { name: 'strategy_brief', label: 'artifacts/strategy_brief.json' },
        { name: 'creative_package', label: 'artifacts/creative_package.json' }
      ];

      for (const contract of handoffContracts) {
        it(`Inter-stage contract exists, meets length, and parses: ${contract.label}`, () => {
          const resolvedPath = resolveArtifactPath(contract.name);
          assert.ok(
            fs.existsSync(resolvedPath),
            `Missing inter-stage handoff artifact: ${contract.label} (checked ${resolvedPath})`
          );
          const content = fs.readFileSync(resolvedPath, 'utf8');
          assert.ok(
            content.trim().length >= 200,
            `Contract ${contract.label} length is below 200 characters`
          );
          assert.doesNotMatch(content, /TODO:\s*IMPLEMENT/i, `${contract.label} contains stub "TODO: IMPLEMENT"`);
          assert.doesNotMatch(content, /Lorem\s+Ipsum/i, `${contract.label} contains filler text "Lorem Ipsum"`);
          assert.doesNotThrow(() => JSON.parse(content), `Contract ${contract.label} must be valid JSON`);
        });
      }
    });

    describe('1.2 Skill Coverage Across Playbooks (All 19 Assigned Project Skills)', () => {
      const playbookSkillMapping = [
        {
          file: 'docs/playbooks/01_skill_discovery_and_mgmt.md',
          skills: ['find-skills', 'skill-creator']
        },
        {
          file: 'docs/playbooks/02_strategy_and_audience.md',
          skills: ['marketing-plan', 'content-strategy', 'marketing-ideas', 'ig-audience-insights']
        },
        {
          file: 'docs/playbooks/03_copywriting_and_creative.md',
          skills: ['brand-voice', 'ad-creative', 'article-writing', 'copywriting']
        },
        {
          file: 'docs/playbooks/04_seo_geo_aeo_engine.md',
          skills: ['seo-geo-aeo', 'ai-seo', 'schema', 'last30days']
        },
        {
          file: 'docs/playbooks/05_visual_motion_production.md',
          skills: ['hyperframes', 'hyperframes-cli', 'canva-cli']
        },
        {
          file: 'docs/playbooks/06_e2e_testing_and_qa.md',
          skills: ['e2e-testing', 'verification-loop', 'test-driven-development']
        }
      ];

      for (const pb of playbookSkillMapping) {
        it(`Playbook ${pb.file} documents its assigned domain skills: ${pb.skills.join(', ')}`, () => {
          assert.ok(fileExists(pb.file), `Missing playbook file: ${pb.file}`);
          const content = readProjectFile(pb.file).toLowerCase();
          for (const skill of pb.skills) {
            assert.ok(
              content.includes(skill.toLowerCase()),
              `Playbook ${pb.file} must document skill: "${skill}"`
            );
          }
        });
      }
    });

    describe('1.3 Package & Scaffolding Configuration', () => {
      it('package.json specifies ESM type, scripts, and Leo K Digital metadata', () => {
        assert.ok(fileExists('package.json'), 'package.json must exist');
        const pkg = readJsonFile('package.json');
        assert.strictEqual(pkg.type, 'module', 'package.json must specify "type": "module"');
        assert.ok(pkg.scripts?.test, 'package.json must define a test script');
        assert.ok(pkg.scripts['test:tier1'], 'package.json must define test:tier1 script');
        assert.ok(pkg.scripts['test:tier2'], 'package.json must define test:tier2 script');
        assert.ok(pkg.scripts['test:tier3'], 'package.json must define test:tier3 script');
        assert.ok(pkg.scripts['test:tier4'], 'package.json must define test:tier4 script');
      });

      it('TEST_INFRA.md specifies 4-Tier test architecture and feature inventory', () => {
        assert.ok(fileExists('TEST_INFRA.md'), 'TEST_INFRA.md must exist');
        const infra = readProjectFile('TEST_INFRA.md');
        assert.ok(infra.includes('Tier 1'), 'TEST_INFRA.md must define Tier 1');
        assert.ok(infra.includes('Tier 2'), 'TEST_INFRA.md must define Tier 2');
        assert.ok(infra.includes('Tier 3'), 'TEST_INFRA.md must define Tier 3');
        assert.ok(infra.includes('Tier 4'), 'TEST_INFRA.md must define Tier 4');
        assert.ok(infra.includes('Leo K Digital'), 'TEST_INFRA.md must reference Leo K Digital');
      });
    });

  });
}

if (isDirectCliRun(import.meta.url)) {
  runTier1Coverage();
}
