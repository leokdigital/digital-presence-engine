import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  fileExists,
  readProjectFile,
  readJsonFile,
  resolveArtifactPath,
  assertNoForbiddenVariants,
  getActiveBrand,
  isDirectCliRun
} from './helpers.mjs';

export async function runTier2Invariants(suiteName = 'Tier 2: Boundary & Corner Invariants') {
  await describe(suiteName, () => {
    const brand = getActiveBrand();

    describe('2.1 Exact String Invariants & Canonical Brand Identity', () => {
      it(`Brand Tokens contain canonical brand name "${brand.name}"`, () => {
        assert.ok(fileExists('src/tokens/brand.json'), 'src/tokens/brand.json must exist');
        const tokens = readJsonFile('src/tokens/brand.json');
        const brandName = tokens.name || tokens.brandName || tokens.brand?.name;
        assert.strictEqual(brandName, brand.name, `brandName must be exact string "${brand.name}"`);
      });

      it(`Brand Tokens contain canonical domain "${brand.domain}"`, () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const domain = tokens.domain || tokens.brand?.domain;
        assert.strictEqual(domain, brand.domain, `domain must be exact string "${brand.domain}"`);
      });

      it('Brand Tokens contain official slogan', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const slogan = tokens.slogan || tokens.brand?.slogan;
        assert.strictEqual(slogan, brand.slogan, `slogan must be exact string "${brand.slogan}"`);
      });

      it(`Brand Tokens contain founder "${brand.founder}" and city headquarters`, () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const founder = tokens.founder || tokens.brand?.founder;
        assert.strictEqual(founder, brand.founder, `founder must be exact string "${brand.founder}"`);
        const city = tokens.city || tokens.headquarters || '';
        assert.ok(city.length > 0, 'city headquarters must be declared');
      });

      it(`Canonical URL "https://${brand.domain}" is properly declared`, () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const url = tokens.websiteUrl || tokens.url || `https://${tokens.domain}`;
        assert.ok(url.includes(brand.domain), `URL must reference "${brand.domain}"`);
      });
    });

    describe('2.2 Negative Adversarial Rejection of Forbidden Brand & Domain Variants', () => {
      it('Adversarial scanner rejects forbidden brand variants on synthetic inputs', () => {
        const adversarialCases = [
          `Bem-vindo à ${brand.name.replace(/\s+/g, '')} hoje.`,
          `Consulte a ${brand.name.replace(/\s+/g, '')} para projetos.`
        ];

        for (const input of adversarialCases) {
          assert.throws(
            () => assertNoForbiddenVariants(input, 'Adversarial Synthetic Test'),
            /Adversarial scanner found/i,
            `Scanner should have rejected: "${input}"`
          );
        }
      });

      it('Adversarial scanner rejects forbidden domain variants on synthetic inputs', () => {
        const adversarialDomainCases = [
          `Acesse http://${brand.domain} agora.`,
          `Visite www.${brand.domain} hoje.`,
          `Espelho em ${brand.domain}.phishing.com/login`,
          `Acesse ${brand.domain.toUpperCase()}/home`
        ];

        for (const input of adversarialDomainCases) {
          assert.throws(
            () => assertNoForbiddenVariants(input, 'Adversarial Domain Synthetic Test'),
            /Adversarial scanner found/i,
            `Scanner should have rejected domain: "${input}"`
          );
        }
      });

      it('Adversarial scanner passes cleanly on actual workspace files', () => {
        const targetFiles = [
          'src/tokens/brand.json',
          'src/styles/theme.css',
          'public/schema.json',
          'public/llms.txt',
          'public/pricing.md',
          'public/robots.txt',
          'src/content/ads_google_rsa.json',
          'src/content/ads_meta.json',
          'src/content/voiceover_script.json',
          'src/content/technical_article.md',
          'src/motion/index.html'
        ];

        for (const relPath of targetFiles) {
          if (fileExists(relPath)) {
            const content = readProjectFile(relPath);
            assertNoForbiddenVariants(content, relPath);
          }
        }
      });
    });

    describe('2.3 Color Palette Tokens & Visual Identity', () => {
      it('Brand tokens define valid hex colors for background and primary', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const colors = tokens.colors || tokens.theme;
        assert.ok(colors, 'Colors must be defined');
        assert.match(colors.background, /^#[0-9A-Fa-f]{6}$/, 'background must be a valid 6-digit hex code');
        assert.match(colors.primary, /^#[0-9A-Fa-f]{6}$/, 'primary must be a valid 6-digit hex code');
      });

      it('theme.css exposes core CSS variables matching tokens', () => {
        assert.ok(fileExists('src/styles/theme.css'), 'src/styles/theme.css must exist');
        const css = readProjectFile('src/styles/theme.css');
        assert.ok(css.includes('--bg-primary:'), 'theme.css must define --bg-primary');
        assert.ok(css.includes('--color-primary:'), 'theme.css must define --color-primary');
        assert.ok(css.includes('--color-accent:'), 'theme.css must define --color-accent');
      });
    });

    describe('2.4 Typography & Visual Effects Specifications', () => {
      it('Typography specifies heading and body font families', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const typo = tokens.typography;
        assert.ok(typo, 'Typography tokens must be defined');
        assert.ok(typo.heading, 'Heading font must be specified');
        assert.ok(typo.body, 'Body font must be specified');
      });

      it('Glassmorphism tokens or theme styles specify translucent effects', () => {
        const css = readProjectFile('src/styles/theme.css');
        assert.ok(css.includes('rgba('), 'theme.css must define rgba translucent values');
        assert.ok(css.includes('--glass-'), 'theme.css must declare --glass- variables');
      });
    });

    describe('2.5 Motion & Audio Engine Parameters', () => {
      it('Motion config specifies 1080x1920 portrait resolution at 60fps', () => {
        assert.ok(fileExists('src/motion/hyperframes.config.json'), 'hyperframes.config.json must exist');
        const cfg = readJsonFile('src/motion/hyperframes.config.json');
        assert.strictEqual(cfg.width, 1080, 'Resolution width must be 1080');
        assert.strictEqual(cfg.height, 1920, 'Resolution height must be 1920');
        assert.strictEqual(cfg.fps, 60, 'Frame rate must be 60fps');
      });

      it('Audio config specifies voice settings and pt-BR language', () => {
        const script = readJsonFile('src/content/voiceover_script.json');
        assert.ok(script.voice, 'voice must be specified');
        assert.strictEqual(script.language, 'pt-BR', 'language must be pt-BR');
      });
    });

  });
}

if (isDirectCliRun(import.meta.url)) {
  runTier2Invariants();
}
