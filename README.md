# 🚀 Agency Digital Presence Template & AI Team Engine
> **High-Performance AI Agent Operating System for Agencies**  
> Dynamic Brand Tokens • Automated Motion Reels (HyperFrames + GSAP) • SEO, GEO & AEO for AI Search • 100% E2E Quality Gate

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.0.0-green.svg)](https://nodejs.org/)
[![Tests: E2E](https://img.shields.io/badge/Tests-73%20Passing-brightgreen.svg)](#suíte-de-testes-e2e)
[![Built by: Leo K Digital](https://img.shields.io/badge/Built%20By-Leo%20K%20Digital-black.svg)](https://leokdigital.com.br)

---

## 🎯 Sobre o Template

Este repositório é um **Sistema Operacional de Presença Digital para Agências e Consultores**. Ele permite criar a presença digital completa de um novo cliente (vídeos em motion code, anúncios de alta conversão, infraestrutura SEO para Google e robôs de IA, e suíte de testes de marca) em **menos de 2 minutos** apenas alterando um arquivo de configuração.

---

## ⚡ Quickstart (Como Usar)

### 1. Clonar o Template ou usar "Use this template"
```bash
git clone https://github.com/leokdigital/agency-digital-presence-template.git meu-novo-cliente
cd meu-novo-cliente
```

### 2. Escolha um Preset ou Edite `client.config.json`
Você pode rodar com um dos presets incluídos:
```bash
# Para Clínica Odontológica / Saúde:
npm run setup -- --preset=clinica-odontologica

# Para Escritório de Advocacia / Jurídico:
npm run setup -- --preset=advocacia

# Para Restaurante / Gastronomia Local:
npm run setup -- --preset=restaurante
```

Ou edite diretamente o arquivo **`client.config.json`** com o nome da empresa, cores e nicho do seu cliente e rode:
```bash
node scripts/setup-client.mjs
```

### 3. Rodar a Suíte de Qualidade (E2E)
```bash
npm test
```
*Executa 73 testes automatizados garantindo conformidade visual, ortografia do nome e domínio do cliente, sanitização de HTML e regras de caracteres para anúncios.*

---

## 📦 O que é gerado automaticamente para cada cliente

| Módulo | Arquivos Gerados | Benefício para o Cliente |
|---|---|---|
| 🎨 **Design Tokens** | `src/tokens/brand.json`<br>`src/styles/theme.css` | Cores, fontes e variáveis CSS mapeadas para o nicho |
| 🎬 **Motion Reels** | `src/motion/index.html`<br>`src/motion/main.js` | Vídeo vertical 1080x1920 60fps animado via GSAP |
| 🌐 **SEO & GEO Engine** | `public/schema.json`<br>`public/llms.txt`<br>`public/robots.txt` | Otimização para Google e citações diretas no ChatGPT e Perplexity |
| 📝 **Copywriting de Alta Conversão** | `src/content/ads_google_rsa.json`<br>`src/content/ads_meta.json`<br>`src/content/voiceover_script.json` | Anúncios validados em limites de caracteres e roteiro de locução |
| 🧪 **Garantia de Qualidade E2E** | `tests/e2e/runner.test.mjs` | 73 testes em 4 Tiers com zero dependências externas |

---

## 🏢 Arquitetura do Time (5 Departamentos)

Os playbooks operacionais detalhados em `docs/playbooks/` cobrem toda a esteira de atendimento da agência:

1. **Construir e Testar** (`01_skill_discovery_and_mgmt.md` & `06_e2e_testing_and_qa.md`)
   - Governança de skills, TDD e esteiras de verificação pré-entrega.
2. **Design e Animação** (`05_visual_motion_production.md`)
   - Renderização programática com HyperFrames e sincronia de frames a 60fps.
3. **Pesquisar e Vender** (`02_strategy_and_audience.md`)
   - Mapeamento de dores com `last30days`, pesquisa de ICP e matriz AARRR.
4. **Criar os Posts** (`03_copywriting_and_creative.md`)
   - Copywriting sem clichês de IA, hooks diretos e roteiros de locução.
5. **Rodar o Escritório & SEO** (`04_seo_geo_aeo_engine.md`)
   - JSON-LD `@graph` de autoridade local, arquivos de contexto para LLMs (`llms.txt`).

---

## 🧪 Suíte de Testes E2E (Zero Dependências)

Construída sobre o test runner nativo do Node.js (`node:test` e `node:assert/strict`):

```bash
npm test              # Roda a suíte completa (73 testes)
npm run test:tier1    # Tier 1: Cobertura de arquivos e tamanho
npm run test:tier2    # Tier 2: Invariantes e rejeição de mutações de marca
npm run test:tier3    # Tier 3: Coerência de pipeline e sanitização HTML
npm run test:tier4    # Tier 4: Execução operacional e limites de anúncio
```

---

## 📄 Licença
Distribuído sob a licença **MIT**. Veja `LICENSE` para mais detalhes.

Desenvolvido com padrão de engenharia por **[Leo K Digital](https://leokdigital.com.br)** — *Sua presença no digital.*
