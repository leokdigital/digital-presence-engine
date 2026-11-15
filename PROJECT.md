# Project: Agency Digital Presence Template & AI Team Engine

## Architecture
O ecossistema **Agency Digital Presence Template & AI Team Engine** é uma infraestrutura operacional e técnica completa para agências, consultores e engenheiros de software entregarem presença digital de alta performance para clientes B2B e PMEs em tempo recorde.

Ele combina geradores dinâmicos orientados a configuração (`client.config.json` e presets), playbooks operacionais de skills e uma suíte de testes E2E com zero dependências externas.

### Data Flow & Pipeline Stages
```
[Stage 1: Discovery & Skill Governance] (find-skills, skill-creator)
      │
      ▼
[Stage 2: Strategy & Intelligence] (marketing-plan, marketing-ideas, content-strategy, ig-audience-insights)
      │  Produces: artifacts/strategy_brief.json
      ▼
[Stage 3: Copywriting & Creative] (brand-voice, copywriting, ad-creative, article-writing)
      │  Produces: artifacts/creative_package.json + copy assets + voiceover script
      ▼
[Stage 4: SEO, GEO & AEO] (seo-geo-aeo, ai-seo, schema, last30days)
      │  Produces: public/schema.json + public/llms.txt + public/pricing.md + robots.txt
      ▼
[Stage 5: Visual & Motion Production] (hyperframes, hyperframes-cli, canva-cli, GSAP)
      │  Produces: src/motion/ (1080x1920 60fps, typing simulation, ranking pills, glassmorphism)
      ▼
[Stage 6: E2E Validation & Quality Gates] (e2e-testing, verification-loop, test-driven-development)
      │  Executes: tests/e2e/runner.test.mjs (Tiers 1, 2, 3, 4)
      ▼
[Verified Production Deliverables & Assets]
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Greenfield Workspace Scaffolding | package.json, configs, directório modular e scripts npm | M1 | Survey Infra |
| F2 | Native Node.js Test Harness | Execução ultra-rápida de testes E2E via `node:test` e `node:assert/strict` | M5 | Survey Infra |
| F3 | HyperFrames Tooling Integration | Configuração de 1080x1920 60fps com GSAP e fontes pré-cacheadas | M4 | Survey Infra |
| F4 | Canva & Figma MCP Integration | Integração de ativos de design e referências visuais oficiais | M4 | Survey Infra |
| F5 | Video Encoding Pipeline Verification | Suporte a FFmpeg e render de vídeo headless | M4 | Survey Infra |
| F6 | Canonical Brand Profile & Roots | Suporte a geração multicliente whitelabel com fundador e cidade configuráveis | M1 | Survey Brand |
| F7 | Exact String Invariant Enforcement | Validação 100% estrita de nome da marca e domínio do cliente | M1 | Survey Brand |
| F8 | Dark Tech Premium Visual Tokens | Paleta #0A0A0F, #FF3B30, #FFD60A, #4285F4, #30D158, Plus Jakarta Sans, JetBrains Mono | M1 | Survey Brand |
| F9 | Glassmorphism & Glow Pill Design | rgba(18,18,26,0.75), blur(16px), borda 1px, cápsulas com glow | M1 | Survey Brand |
| F10 | ElevenLabs Adam Audio Config | Voz Adam pt-BR, tom assertivo, autoridade técnica sóbria | M1 | Survey Brand |
| F11 | Discovery & Skill Management Playbook | Playbook para find-skills e skill-creator com benchmarking e evals | M1 | Survey Brand |
| F12 | Strategy & Audience Growth Playbook | Playbook com marketing-plan (AARRR), marketing-ideas (139 táticas), content-strategy e ig-audience-insights | M2 | Survey Brand |
| F13 | Copywriting & Creative Playbook | Playbook com ad-creative, copywriting (3-Question Gate), article-writing e brand-voice | M2 | Survey Brand |
| F14 | Real Asset: High-Converting Ad Copy | Anúncios Google RSA (<=30/90 chars) e Meta (hook <=125 chars) | M2 | Survey Brand |
| F15 | Real Asset: Technical Article | Artigo aprofundado de operador sobre migração de planilhas para sistemas web | M2 | Survey Brand |
| F16 | Real Asset: Voiceover Script | Roteiro de narração Adam ElevenLabs com marcação temporal e entonação técnica | M2 | Survey Brand |
| F17 | Inter-Stage Handoff Contracts | Schemas JSON para strategy_brief.json e creative_package.json | M2 | Survey Brand |
| F18 | Passage-Based AEO/GEO Answer Blocks | Blocos diretos de resposta de 40-60 palavras para citação em ChatGPT/Perplexity/AIO | M3 | Survey SEO |
| F19 | Machine-Readable Agent Context | Arquivos /llms.txt, /pricing.md e robots.txt otimizados para crawlers de IA | M3 | Survey SEO |
| F20 | Unified Schema.org JSON-LD @graph | Grafo com Organization, WebSite, ProfessionalService, 3 Services e FAQPage | M3 | Survey SEO |
| F21 | HTML Script Injection Sanitization | Serialização segura de JSON-LD escapando `<` para `\u003c` | M3 | Survey SEO |
| F22 | Trending Intelligence Protocol | Protocolo de pesquisa de tendências com `last30days` query planner | M3 | Survey SEO |
| F23 | Tier 1: Feature & Contract Coverage | Teste automatizado de presença de playbooks, skills e handoffs | M5 | Survey Testing |
| F24 | Tier 2: Boundary & Corner Invariants | Teste rigoroso de regex para strings exatas, hex colors, 1080x1920@60fps, voz | M5 | Survey Testing |
| F25 | Tier 3: Cross-Feature Pipeline Test | Teste de coerência de dados entre Estratégia -> Copy -> Motion -> SEO | M5 | Survey Testing |
| F26 | Tier 4: Real-World Operational Test | Execução completa e validação de todos os artefatos com exit code 0 | M5 | Survey Testing |
