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

    describe('2.1 Exact String Invariants & Canonical Brand Identity', () => {
      it('Brand Tokens contain canonical brand name', () => {
        assert.ok(fileExists('src/tokens/brand.json'), 'src/tokens/brand.json must exist');
        const tokens = readJsonFile('src/tokens/brand.json');
        const activeBrand = getActiveBrand();
        const brandName = tokens.brandName || tokens.brand?.name || tokens.name;
        assert.strictEqual(brandName, activeBrand.name, `brandName must be exact string "${activeBrand.name}"`);
      });

      it('Brand Tokens contain canonical domain', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const activeBrand = getActiveBrand();
        const domain = tokens.domain || tokens.brand?.domain;
        assert.strictEqual(domain, activeBrand.domain, `domain must be exact string "${activeBrand.domain}"`);
      });

      it('Brand Tokens contain official slogan', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const activeBrand = getActiveBrand();
        const slogan = tokens.slogan || tokens.brand?.slogan;
        assert.strictEqual(slogan, activeBrand.slogan, `slogan must be exact string "${activeBrand.slogan}"`);
      });

      it('Brand Tokens contain founder and headquarters', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const activeBrand = getActiveBrand();
        const founder = tokens.founder || tokens.brand?.founder;
        assert.strictEqual(founder, activeBrand.founder, `founder must be exact string "${activeBrand.founder}"`);
        const hq = tokens.headquarters || tokens.brand?.headquarters || tokens.city || '';
        assert.match(hq, new RegExp(activeBrand.city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `headquarters must reference ${activeBrand.city}`);
      });

      it('Canonical URL is properly declared', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const activeBrand = getActiveBrand();
        const url = tokens.websiteUrl || tokens.brand?.url || `https://${tokens.domain}/`;
        assert.strictEqual(url, activeBrand.url, `URL must be "${activeBrand.url}"`);
      });
    });

    describe('2.2 Negative Adversarial Rejection of Forbidden Brand & Domain Variants', () => {
      it('Adversarial scanner rejects forbidden brand variants on synthetic inputs', () => {
        const adversarialCases = [
          'Bem-vindo à LeoKDigital hoje.',
          'Entre em contato com Leo K. Digital para projetos.',
          'LEO K DIGITAL é uma software house.',
          'Visite a leok digital para mais informações.',
          'Consulte a Leo K para engenharia de software.',
          'A sigla LKD representa nossa equipe.',
          'Conheça a Leo Kinoshita Digital.',
          'Visite a leo k digital para mais detalhes.',
          'Consulte a Leo k digital para projetos.',
          'Nosso nome é LEOKDIGITAL sem espaços.',
          'Siga a leokdigital no Instagram.',
          'Visite Leo-K Digital no web.',
          'Leo.K.Digital pontuado.',
          'Leo_K_Digital snake case.',
          'Consulte a LeoK para suporte.',
          'Leo KDigital',
          'Leo.KDigital',
          'Leo-KDigital',
          'Leo_KDigital',
          'leo kdigital',
          'LEO KDIGITAL'
        ];

        for (const badText of adversarialCases) {
          assert.throws(
            () => assertNoForbiddenVariants(badText, 'adversarial-test', { name: 'Leo K Digital', domain: 'leokdigital.com.br' }),
            (err) => err.name === 'AssertionError',
            `Adversarial scanner failed to reject forbidden text: "${badText}"`
          );
        }
      });

      it('Adversarial scanner rejects forbidden domain variants on synthetic inputs', () => {
        const adversarialDomains = [
          'Acesse https://leokdigital.com agora.',
          'Visite www.leokdigital.com.br.',
          'Conecte via http://leokdigital.com.br.',
          'Acesse o site leok-digital.com.br.',
          'Visite leokdigital.io para mais.',
          'Acesse leokdigital.co aqui.',
          'Acesse leokdigital.ai aqui.',
          'Acesse leokdigital.app aqui.',
          'Acesse leokdigital.tech aqui.',
          'Visite https://leokdigital.com.br.evil.com aqui.',
          'LeoKDigital.com.br',
          'LEOKDIGITAL.COM.BR',
          'https://LeoKDigital.com.br/',
          'http://leok-digital.com.br'
        ];

        for (const badDomain of adversarialDomains) {
          assert.throws(
            () => assertNoForbiddenVariants(badDomain, 'adversarial-domain-test', { name: 'Leo K Digital', domain: 'leokdigital.com.br' }),
            (err) => err.name === 'AssertionError',
            `Adversarial scanner failed to reject forbidden domain variant: "${badDomain}"`
          );
        }
      });

      it('Adversarial scanner rejects compound documents where canonical "Leo K Digital" precedes mutations', () => {
        const compoundCases = [
          'Leo K Digital\nAcesse também Leo_K_Digital no repositório.',
          'Leo K Digital é fundada por Leonardo Kinoshita. Consulte a Leo K para engenharia.',
          'Leo K Digital (https://leokdigital.com.br). Acesse o espelho www.leokdigital.com.br.',
          'Leo K Digital oficial. Conecte via http://leokdigital.com.br inseguro.',
          'Leo K Digital https://leokdigital.com.br/ - cuidado com leokdigital.co phishing.',
          'Somos a Leo K Digital oficial no endereço https://leokdigital.com.br/. Aviso: não confunda com Leo KDigital.',
          'Aviso: não use Leo KDigital em legendas. O nome oficial é Leo K Digital (https://leokdigital.com.br/).',
          'Erro 1: Leo KDigital. Oficial: Leo K Digital (https://leokdigital.com.br/). Erro 2: Leo.KDigital.',
          'Leo K Digital oficial no site https://leokdigital.com.br/ mas espelho LeoKDigital.com.br',
          'Leo K Digital oficial no site https://leokdigital.com.br/ mas espelho LEOKDIGITAL.COM.BR'
        ];

        for (const compoundText of compoundCases) {
          assert.throws(
            () => assertNoForbiddenVariants(compoundText, 'compound-adversarial-test', { name: 'Leo K Digital', domain: 'leokdigital.com.br' }),
            (err) => err.name === 'AssertionError',
            `Adversarial scanner failed to reject compound document with mutation: "${compoundText}"`
          );
        }
      });

      it('Adversarial scanner rejects missing K-Digital delimiter and non-canonical domain casing mutations', () => {
        const kDigitalVariants = [
          'Leo KDigital',
          'Leo.KDigital',
          'Leo-KDigital',
          'Leo_KDigital',
          'leo kdigital',
          'LEO KDIGITAL'
        ];

        for (const variant of kDigitalVariants) {
          assert.throws(
            () => assertNoForbiddenVariants(variant, 'kdigital-mutation-test', { name: 'Leo K Digital', domain: 'leokdigital.com.br' }),
            (err) => err.name === 'AssertionError',
            `Adversarial scanner failed to reject KDigital variant: "${variant}"`
          );
        }

        const domainCasingVariants = [
          'LeoKDigital.com.br',
          'LEOKDIGITAL.COM.BR',
          'https://LeoKDigital.com.br/'
        ];

        for (const domain of domainCasingVariants) {
          assert.throws(
            () => assertNoForbiddenVariants(domain, 'domain-casing-mutation-test', { name: 'Leo K Digital', domain: 'leokdigital.com.br' }),
            (err) => err.name === 'AssertionError',
            `Adversarial scanner failed to reject non-canonical domain casing: "${domain}"`
          );
        }

        const compoundStrings = [
          'Somos a Leo K Digital oficial no endereço https://leokdigital.com.br/. Aviso: não confunda com Leo KDigital.',
          'Aviso: não use Leo KDigital em legendas. O nome oficial é Leo K Digital (https://leokdigital.com.br/).',
          'Erro 1: Leo KDigital. Oficial: Leo K Digital (https://leokdigital.com.br/). Erro 2: Leo.KDigital.',
          'Leo K Digital oficial no site https://leokdigital.com.br/ mas espelho LeoKDigital.com.br',
          'Leo K Digital oficial no site https://leokdigital.com.br/ mas espelho LEOKDIGITAL.COM.BR'
        ];

        for (const compound of compoundStrings) {
          assert.throws(
            () => assertNoForbiddenVariants(compound, 'kdigital-compound-test', { name: 'Leo K Digital', domain: 'leokdigital.com.br' }),
            (err) => err.name === 'AssertionError',
            `Adversarial scanner failed to reject compound string with canonical prefix: "${compound}"`
          );
        }
      });

      it('Adversarial scanner passes cleanly on canonical brand and domain mentions (zero false positives)', () => {
        const canonicalCases = [
          'Bem-vindo à Leo K Digital.',
          'Acesse https://leokdigital.com.br/ para saber mais.',
          'Visite leokdigital.com.br hoje mesmo.',
          'Engenharia de software na Leo K Digital (https://leokdigital.com.br/).'
        ];

        for (const cleanText of canonicalCases) {
          assert.doesNotThrow(
            () => assertNoForbiddenVariants(cleanText, 'canonical-clean-test', { name: 'Leo K Digital', domain: 'leokdigital.com.br' }),
            `Adversarial scanner raised false positive on clean canonical text: "${cleanText}"`
          );
        }
      });

      it('Adversarial scanner passes cleanly on actual workspace files', () => {
        const candidateFiles = [
          'src/tokens/brand.json',
          'src/styles/theme.css',
          'README.md',
          'public/llms.txt',
          'public/schema.json',
          'src/content/voiceover_script.json'
        ];

        for (const file of candidateFiles) {
          if (fileExists(file)) {
            const content = readProjectFile(file);
            assertNoForbiddenVariants(content, file);
          }
        }
      });
    });

    describe('2.3 Dark Tech Premium Color Palette Tokens', () => {
      it('Brand tokens define exact hex color codes', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        
        const bg = tokens.primaryBg || tokens.colors?.primaryBg || tokens.colors?.background || tokens.colors?.base;
        assert.ok(bg && /^#[0-9A-Fa-f]{6}$/.test(bg), 'primaryBg must be a valid 6-digit hex code');

        const red = tokens.accentRed || tokens.colors?.danger || tokens.colors?.accents?.red;
        assert.ok(red && /^#[0-9A-Fa-f]{6}$/.test(red), 'accentRed must be a valid 6-digit hex code');

        const yellow = tokens.accentYellow || tokens.colors?.warning || tokens.colors?.accents?.yellow;
        assert.ok(yellow && /^#[0-9A-Fa-f]{6}$/.test(yellow), 'accentYellow must be a valid 6-digit hex code');

        const blue = tokens.accentBlue || tokens.colors?.primary || tokens.colors?.accents?.blue;
        assert.ok(blue && /^#[0-9A-Fa-f]{6}$/.test(blue), 'accentBlue must be a valid 6-digit hex code');

        const green = tokens.accentGreen || tokens.colors?.accent || tokens.colors?.accents?.green;
        assert.ok(green && /^#[0-9A-Fa-f]{6}$/.test(green), 'accentGreen must be a valid 6-digit hex code');
      });

      it('theme.css exposes all 5 Dark Tech CSS variables', () => {
        assert.ok(fileExists('src/styles/theme.css'), 'src/styles/theme.css must exist');
        const css = readProjectFile('src/styles/theme.css');

        assert.match(css, /--bg-primary:\s*#[0-9A-Fa-f]{6}/i, 'theme.css must define --bg-primary');
        assert.match(css, /--(accent-red|color-danger):\s*#[0-9A-Fa-f]{6}/i, 'theme.css must define red accent');
        assert.match(css, /--(accent-yellow|color-warning):\s*#[0-9A-Fa-f]{6}/i, 'theme.css must define yellow accent');
        assert.match(css, /--(accent-blue|color-primary):\s*#[0-9A-Fa-f]{6}/i, 'theme.css must define blue accent');
        assert.match(css, /--(accent-green|color-accent):\s*#[0-9A-Fa-f]{6}/i, 'theme.css must define green accent');
      });
    });

    describe('2.4 Typography & Glassmorphism Specifications', () => {
      it('Typography specifies Plus Jakarta Sans and JetBrains Mono', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const headingFont = tokens.fontHeading || tokens.typography?.heading || tokens.typography?.families?.heading;
        assert.ok(headingFont, 'fontHeading must be defined');

        const codeFont = tokens.fontCode || tokens.typography?.mono || tokens.typography?.families?.mono;
        assert.ok(codeFont, 'fontCode must be defined');

        const css = readProjectFile('src/styles/theme.css');
        assert.match(css, /--font-heading/i, 'theme.css must define --font-heading');
        assert.match(css, /--font-mono/i, 'theme.css must define --font-mono');
      });

      it('Glassmorphism tokens specify blur(16px) and dark translucent background', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const glass = tokens.glassmorphism || tokens.colors?.surfaces?.glass || tokens.theme?.surface || tokens.colors?.surface;
        assert.ok(glass || tokens, 'glassmorphism tokens must be defined');

        const css = readProjectFile('src/styles/theme.css');
        const implementsBlur16 = /blur\(16px\)/i.test(css) || (/--glass-blur:\s*16px/i.test(css) && /blur\(var\(--glass-blur\)\)/i.test(css));
        assert.ok(implementsBlur16, 'theme.css must implement blur(16px) or --glass-blur: 16px');
        assert.match(css, /rgba\(\s*\d+,\s*\d+,\s*\d+,\s*[\d.]+\s*\)/, 'theme.css must implement translucent rgba background');
      });
    });

    describe('2.5 Motion & Audio Engine Parameters', () => {
      it('Motion config specifies 1080x1920 portrait resolution at 60fps', () => {
        if (fileExists('src/motion/hyperframes.config.json')) {
          const motionConfig = readJsonFile('src/motion/hyperframes.config.json');
          const width = motionConfig.width || motionConfig.resolution?.width;
          const height = motionConfig.height || motionConfig.resolution?.height;
          const fps = motionConfig.fps;

          assert.strictEqual(width, 1080, 'motion width must be 1080');
          assert.strictEqual(height, 1920, 'motion height must be 1920');
          assert.strictEqual(fps, 60, 'motion fps must be 60');
        } else {
          const tokens = readJsonFile('src/tokens/brand.json');
          assert.strictEqual(tokens.motion?.width || tokens.motion?.resolution?.width, 1080, 'tokens motion width must be 1080');
          assert.strictEqual(tokens.motion?.height || tokens.motion?.resolution?.height, 1920, 'tokens motion height must be 1920');
          assert.strictEqual(tokens.motion?.fps, 60, 'tokens motion fps must be 60');
        }
      });

      it('Audio config specifies ElevenLabs Adam voice in pt-BR with assertive tone', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const audio = tokens.audio || tokens.motion;
        assert.ok(audio, 'audio tokens must be defined');
        assert.ok(audio.voice && typeof audio.voice === 'string' && audio.voice.length >= 3, 'voice must be a valid voice name');
        assert.strictEqual(audio.language || audio.voiceLanguage, 'pt-BR', 'language must be pt-BR');
        const tone = audio.tone || audio.voiceTone;
        assert.ok(tone && typeof tone === 'string' && tone.length > 3, 'tone must be a defined descriptive string');

        if (fileExists('src/content/voiceover_script.json')) {
          const script = readJsonFile('src/content/voiceover_script.json');
          assert.strictEqual(script.voice || script.voice_config?.voice, audio.voice, 'voiceover script must specify configured voice');
          assert.strictEqual(script.language || script.voice_config?.language, 'pt-BR', 'script language must be pt-BR');
        }
      });
    });

  });
}

if (isDirectCliRun(import.meta.url)) {
  runTier2Invariants();
}
