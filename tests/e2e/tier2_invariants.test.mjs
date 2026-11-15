import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  fileExists,
  readProjectFile,
  readJsonFile,
  resolveArtifactPath,
  assertNoForbiddenVariants,
  isDirectCliRun
} from './helpers.mjs';

export async function runTier2Invariants(suiteName = 'Tier 2: Boundary & Corner Invariants') {
  await describe(suiteName, () => {

    describe('2.1 Exact String Invariants & Canonical Brand Identity', () => {
      it('Brand Tokens contain canonical brand name "Leo K Digital"', () => {
        assert.ok(fileExists('src/tokens/brand.json'), 'src/tokens/brand.json must exist');
        const tokens = readJsonFile('src/tokens/brand.json');
        const brandName = tokens.brandName || tokens.brand?.name;
        assert.strictEqual(brandName, 'Leo K Digital', 'brandName must be exact string "Leo K Digital"');
      });

      it('Brand Tokens contain canonical domain "leokdigital.com.br"', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const domain = tokens.domain || tokens.brand?.domain;
        assert.strictEqual(domain, 'leokdigital.com.br', 'domain must be exact string "leokdigital.com.br"');
      });

      it('Brand Tokens contain official slogan "Sua presença no digital."', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const slogan = tokens.slogan || tokens.brand?.slogan;
        assert.strictEqual(slogan, 'Sua presença no digital.', 'slogan must be exact string "Sua presença no digital."');
      });

      it('Brand Tokens contain founder "Leonardo Kinoshita" and Curitiba headquarters', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const founder = tokens.founder || tokens.brand?.founder;
        assert.strictEqual(founder, 'Leonardo Kinoshita', 'founder must be exact string "Leonardo Kinoshita"');
        const hq = tokens.headquarters || tokens.brand?.headquarters || '';
        assert.match(hq, /Curitiba/i, 'headquarters must reference Curitiba');
      });

      it('Canonical URL "https://leokdigital.com.br/" is properly declared', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const url = tokens.websiteUrl || tokens.brand?.url;
        assert.strictEqual(url, 'https://leokdigital.com.br/', 'URL must be "https://leokdigital.com.br/"');
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
            () => assertNoForbiddenVariants(badText, 'adversarial-test'),
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
          'https://LEOKDIGITAL.COM.BR/',
          'leokdigital.COM.BR'
        ];

        for (const badDomain of adversarialDomains) {
          assert.throws(
            () => assertNoForbiddenVariants(badDomain, 'adversarial-domain-test'),
            (err) => err.name === 'AssertionError',
            `Adversarial scanner failed to reject forbidden domain: "${badDomain}"`
          );
        }
      });

      it('Adversarial scanner rejects compound documents where canonical "Leo K Digital" precedes mutations', () => {
        const compoundCases = [
          'Leo K Digital leading marketing agency. Also check out leo k digital and Leo.K.Digital.',
          'Somos a Leo K Digital oficial. Mas nunca escreva Leo-K Digital em comunicações.',
          'Sobre a Leo K Digital: visite a leok digital para mais informações.',
          'Header: Leo K Digital\nBody: Bem-vindo à LEO K DIGITAL com caixa alta errada.',
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
            () => assertNoForbiddenVariants(compoundText, 'compound-adversarial-test'),
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
            () => assertNoForbiddenVariants(variant, 'kdigital-mutation-test'),
            (err) => err.name === 'AssertionError',
            `Adversarial scanner failed to reject KDigital variant: "${variant}"`
          );
        }

        const domainCasingVariants = [
          'LeoKDigital.com.br',
          'LEOKDIGITAL.COM.BR',
          'https://LeoKDigital.com.br/',
          'https://LEOKDIGITAL.COM.BR/',
          'leokdigital.COM.BR'
        ];

        for (const domain of domainCasingVariants) {
          assert.throws(
            () => assertNoForbiddenVariants(domain, 'domain-casing-mutation-test'),
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
            () => assertNoForbiddenVariants(compound, 'kdigital-compound-test'),
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
            () => assertNoForbiddenVariants(cleanText, 'canonical-clean-test'),
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
        
        const bg = tokens.primaryBg || tokens.colors?.primaryBg || tokens.colors?.base;
        assert.strictEqual(bg, '#0A0A0F', 'primaryBg must be #0A0A0F');

        const red = tokens.accentRed || tokens.colors?.accents?.red;
        assert.strictEqual(red, '#FF3B30', 'accentRed must be #FF3B30');

        const yellow = tokens.accentYellow || tokens.colors?.accents?.yellow;
        assert.strictEqual(yellow, '#FFD60A', 'accentYellow must be #FFD60A');

        const blue = tokens.accentBlue || tokens.colors?.accents?.blue;
        assert.strictEqual(blue, '#4285F4', 'accentBlue must be #4285F4');

        const green = tokens.accentGreen || tokens.colors?.accents?.green;
        assert.strictEqual(green, '#30D158', 'accentGreen must be #30D158');
      });

      it('theme.css exposes all 5 Dark Tech CSS variables', () => {
        assert.ok(fileExists('src/styles/theme.css'), 'src/styles/theme.css must exist');
        const css = readProjectFile('src/styles/theme.css');

        assert.match(css, /--bg-primary:\s*#0A0A0F/i, 'theme.css must define --bg-primary: #0A0A0F');
        assert.match(css, /--accent-red:\s*#FF3B30/i, 'theme.css must define --accent-red: #FF3B30');
        assert.match(css, /--accent-yellow:\s*#FFD60A/i, 'theme.css must define --accent-yellow: #FFD60A');
        assert.match(css, /--accent-blue:\s*#4285F4/i, 'theme.css must define --accent-blue: #4285F4');
        assert.match(css, /--accent-green:\s*#30D158/i, 'theme.css must define --accent-green: #30D158');
      });
    });

    describe('2.4 Typography & Glassmorphism Specifications', () => {
      it('Typography specifies Plus Jakarta Sans and JetBrains Mono', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const headingFont = tokens.fontHeading || tokens.typography?.families?.heading;
        assert.strictEqual(headingFont, 'Plus Jakarta Sans', 'fontHeading must be "Plus Jakarta Sans"');

        const codeFont = tokens.fontCode || tokens.typography?.families?.mono;
        assert.strictEqual(codeFont, 'JetBrains Mono', 'fontCode must be "JetBrains Mono"');

        const css = readProjectFile('src/styles/theme.css');
        assert.match(css, /Plus\s+Jakarta\s+Sans/i, 'theme.css must include Plus Jakarta Sans font-family');
        assert.match(css, /JetBrains\s+Mono/i, 'theme.css must include JetBrains Mono font-family');
      });

      it('Glassmorphism tokens specify blur(16px) and dark translucent background', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const glass = tokens.glassmorphism || tokens.colors?.surfaces?.glass;
        assert.ok(glass, 'glassmorphism tokens must be defined');

        const css = readProjectFile('src/styles/theme.css');
        const implementsBlur16 = /blur\(16px\)/i.test(css) || (/--glass-blur:\s*16px/i.test(css) && /blur\(var\(--glass-blur\)\)/i.test(css));
        assert.ok(implementsBlur16, 'theme.css must implement blur(16px) or --glass-blur: 16px');
        assert.match(css, /rgba\(\s*18,\s*18,\s*26,\s*0\.75\s*\)/, 'theme.css must implement rgba(18, 18, 26, 0.75)');
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
          assert.strictEqual(tokens.motion?.resolution?.width, 1080, 'tokens motion width must be 1080');
          assert.strictEqual(tokens.motion?.resolution?.height, 1920, 'tokens motion height must be 1920');
          assert.strictEqual(tokens.motion?.fps, 60, 'tokens motion fps must be 60');
        }
      });

      it('Audio config specifies ElevenLabs Adam voice in pt-BR with assertive tone', () => {
        const tokens = readJsonFile('src/tokens/brand.json');
        const audio = tokens.audio;
        assert.ok(audio, 'audio tokens must be defined');
        assert.strictEqual(audio.voice, 'Adam', 'voice must be Adam');
        assert.strictEqual(audio.language, 'pt-BR', 'language must be pt-BR');
        assert.match(audio.tone, /assertivo/i, 'tone must be assertivo');
        assert.strictEqual(audio.voiceId, 'pNInz6obpgDQGcFmaJgB', 'voiceId must match Adam ID');

        if (fileExists('src/content/voiceover_script.json')) {
          const script = readJsonFile('src/content/voiceover_script.json');
          assert.strictEqual(script.voice || script.voice_config?.voice, 'Adam', 'voiceover script must specify Adam');
          assert.strictEqual(script.language || script.voice_config?.language, 'pt-BR', 'script language must be pt-BR');
        }
      });
    });

  });
}

if (isDirectCliRun(import.meta.url)) {
  runTier2Invariants();
}
