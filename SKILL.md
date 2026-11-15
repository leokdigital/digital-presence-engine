---
name: digital-presence-engine
description: Automated agency-grade digital presence engine by Leo K Digital. Generates dynamic brand tokens, vertical motion reels (GSAP/HyperFrames), SEO/GEO/AEO schemas, copy, and runs a 73-point E2E quality gate for any client or niche. Use when setting up, generating, or auditing a complete digital presence for a company.
---

# Digital Presence Engine

Created and maintained by **[Leo K Digital](https://leokdigital.com.br)**.

An automated, open-source engine for digital agencies, developers, and AI agents to scaffold, configure, and validate full multi-channel digital presence for any business in under 2 minutes.

---

## ⚡ When to Use This Skill

Activate this skill when you need to:
- Generate brand tokens (`brand.json`, `theme.css`) from any company profile, hex colors, and typography.
- Generate vertical high-converting motion reels (1080x1920 60fps) powered by GSAP and HyperFrames.
- Generate Google Ads RSA, Meta Ads hooks, and voiceover scripts tailored to a business niche.
- Generate deep technical SEO and GEO/AEO machine context (`public/schema.json`, `llms.txt`, `robots.txt`).
- Validate complete brand compliance and asset integrity with a 73-point native Node.js E2E test suite.

---

## 🚀 How to Run

### 1. Using Built-in Niche Presets
You can instantly apply one of the battle-tested niche presets:

```bash
# Healthcare & Dental Clinics
npm run setup -- --preset=clinica-odontologica

# Law Firms & Legal Advisory
npm run setup -- --preset=advocacia

# Restaurants & Local Gastronomy
npm run setup -- --preset=restaurante
```

### 2. Custom Client Configuration
Edit `client.config.json` with the target business details:

```json
{
  "name": "Nome da Empresa",
  "legalName": "Razão Social Completa LTDA",
  "domain": "empresa.com.br",
  "niche": "Tecnologia / Saúde / Advocacia",
  "city": "São Paulo",
  "phone": "+55 11 99999-9999",
  "theme": {
    "primary": "#0A2540",
    "secondary": "#635BFF",
    "accent": "#00D4B6",
    "background": "#FFFFFF",
    "text": "#1A1F36"
  },
  "voice": {
    "name": "Adam",
    "tone": "confident, consultative and authoritative"
  },
  "services": [
    "Serviço 1",
    "Serviço 2",
    "Serviço 3"
  ]
}
```

Then compile the assets:
```bash
node scripts/setup-client.mjs
```

### 3. Run Quality Verification (73 E2E Tests)
Always run the test suite to verify 100% compliance:

```bash
npm test
```

---

## 📦 Output Artifacts Generated

1. **Design Tokens**: `src/tokens/brand.json` & `src/styles/theme.css`
2. **Motion Video**: `src/motion/index.html` & `src/motion/main.js` (GSAP 60fps)
3. **Advertising Copy**: `src/content/ads_google_rsa.json` & `src/content/ads_meta.json`
4. **Voiceover Script**: `src/content/voiceover_script.json`
5. **SEO & AEO Schemas**: `public/schema.json`, `public/llms.txt`, `public/robots.txt`
6. **Strategy Handoffs**: `artifacts/strategy_brief.json` & `artifacts/creative_package.json`
