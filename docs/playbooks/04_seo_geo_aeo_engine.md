# Playbook 04: Motor de SEO Técnico, Local SEO, GEO & AEO

## Overview & Propósito Operacional

O **Playbook 04** governa a arquitetura técnica de indexação orgânica, visibilidade local e autoridade em motores de resposta de inteligência artificial da **Leo K Digital** (`https://leokdigital.com.br/`).

No pipeline operacional de 6 estágios, este playbook rege o **Stage 4: SEO, GEO & AEO**. Ele consome as diretrizes de posicionamento de mercado e clusters temáticos do Stage 2 (`artifacts/strategy_brief.json`), além dos blocos de passagem e vocabulário técnico do Stage 3 (`artifacts/creative_package.json`), estruturando a camada de dados que torna a empresa 100% legível, citável e priorizada tanto por algoritmos de busca tradicionais (Googlebot, Bingbot) quanto por motores generativos neurais (ChatGPT Search, Perplexity, Google AI Overviews, Claude e Gemini).

```
┌────────────────────────────────────────────────────────────────────────┐
│                      PIPELINE Leo K Digital                            │
│                                                                        │
│   [Stage 2: Estratégia & Audiência] (Playbook 02)                      │
│                 │  Consome: artifacts/strategy_brief.json              │
│                 ▼                                                      │
│   [Stage 3: Copywriting & Criativos] (Playbook 03)                     │
│                 │  Consome: artifacts/creative_package.json            │
│                 ▼                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ STAGE 4: SEO, GEO & AEO ENGINE (Playbook 04)                     │  │
│  │ Skills: seo-geo-aeo | ai-seo | schema | last30days               │  │
│  │ Produz: public/schema.json (JSON-LD @graph multi-entidade)       │  │
│  │         public/llms.txt (Contexto de máquina para LLMs)          │  │
│  │         public/pricing.md (Escopos para Buying Agents)           │  │
│  │         public/robots.txt (Diretivas de crawlers e sitemap)      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                 │                                                      │
│                 ▼                                                      │
│   [Stage 5: Visual & Motion] (Playbook 05: src/motion/ 1080x1920 60fps)│
│                 │                                                      │
│                 ▼                                                      │
│   [Stage 6: Testes E2E & Qualidade] (Playbook 06: Tiers 1 a 4)         │
└────────────────────────────────────────────────────────────────────────┘
```

### Manifesto da Engenharia de Busca
A Leo K Digital rejeita táticas obsoletas de manipulação algorítmica, como keyword stuffing, páginas satélites ultrafinas e fazendas de links sintéticos. Tratamos SEO e otimização para IAs como **engenharia de performance web e integridade semântica**:
- **Velocidade Bruta:** Páginas construídas em Next.js com Server-Side Rendering (SSR), estática pura (SSG) e 0% bloatware atingem notas máximas nos índices oficiais de experiência do Google.
- **Factualidade Autocontida:** Passagens calibradas para responder prontamente a dúvidas técnicas e de negócio sem divagações.
- **Contratos Semânticos Rígidos:** Grafo Schema.org interligado e documentação direta em Markdown para agentes autônomos de compra.

- **Marca Oficial:** Leo K Digital
- **Fundador e Autor Responsável:** Leonardo Kinoshita
- **Website Canônico:** `https://leokdigital.com.br/`
- **Slogan Oficial:** "Sua presença no digital."
- **Sede Operacional:** Curitiba, PR, Brasil

---

## 1. Stage 4.1: SEO Técnico de Alta Performance & Local SEO — `seo-geo-aeo`

O núcleo `seo-geo-aeo` unifica a infraestrutura de carregamento ultrarrápido aos requisitos de indexação geográfica e autoridade operacional.

### 1.1 Arquitetura de Core Web Vitals (Padrão 2026)
A velocidade de carregamento é o primeiro critério de desempate no ranqueamento orgânico do Google e no rastreamento por robôs de IA baseados em navegadores headless (como o crawler do ChatGPT Search). Se uma página demora a carregar ou congela a thread principal com scripts de terceiros, o robô encerra a execução por timeout e a página é ignorada.

A Leo K Digital estabelece thresholds técnicos agressivos, muito além do padrão mínimo do Google:

| Métrica | Limiar Google "Bom" | Padrão Leo K Digital | Mecanismo Técnico de Engenharia |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | $\le 2.5\text{s}$ | **$\le 0.8\text{s}$ (Desktop) / $\le 1.2\text{s}$ (Mobile)** | Next.js React Server Components (RSC), geração estática na borda (Edge SSG), imagens WebP otimizadas nativamente com tags `fetchpriority="high"`, zero bloqueio por bibliotecas pesadas. |
| **INP** (Interaction to Next Paint) | $\le 200\text{ms}$ | **$\le 50\text{ms}$** | Thread principal 100% desobstruída. O INP substituiu oficialmente o FID em março de 2024. Animações e transições executadas estritamente no compositor via GSAP (`transform`, `opacity`), divisão de tarefas longas em Web Workers. |
| **CLS** (Cumulative Layout Shift) | $\le 0.10$ | **$0.00$ (Zero absoluto)** | Reserva explícita de caixas de aspecto (`aspect-ratio: 9/16`, `aspect-ratio: 16/9`), pré-carregamento das fontes Plus Jakarta Sans e JetBrains Mono com `font-display: swap` e overrides de métricas de fallback (`size-adjust`, `ascent-override`). |
| **TTFB** (Time to First Byte) | $\le 800\text{ms}$ | **$\le 150\text{ms}$** | Distribuição global via rede Edge Vercel/Cloudflare, compressão Brotli e HTTP/3. |

### 1.2 Estratégia de Local SEO & Consistência NAP
A presença geográfica da Leo K Digital opera em um modelo de dois níveis:

1. **Nível Regional (Curitiba e Região Metropolitana):**
   - Foco na captura de buscas transacionais e de alta intenção ("desenvolvimento de sistemas curitiba", "software sob medida curitiba", "desenvolvedor nextjs curitiba").
   - Otimização do Google Business Profile e posicionamento no Local 3-Pack do Google Maps.
   - Presença da entidade física mapeada no Schema.org sob `@type: "ProfessionalService"` com coordenadas geográficas exatas (`latitude: -25.4284`, `longitude: -49.2733`).

2. **Nível Corporativo Nacional (Brasil):**
   - Atendimento a PMEs industriais, comerciais e B2B em São Paulo, Santa Catarina e principais polos econômicos brasileiros.
   - Declarado explicitamente no grafo semântico via `areaServed: { "@type": "Country", "name": "Brasil" }`.

#### Regra Inegociável de Consistência NAP (Name, Address, Phone):
A uniformidade cadastral entre o website, dados estruturados e diretórios externos deve ser absoluta:
- **Name:** Exatamente `Leo K Digital` (qualquer mutação de grafia, espaçamento, pontuação ou abreviação fragmenta a autoridade local).
- **Address:** `Curitiba, PR, Brasil` (estruturado como `addressLocality: "Curitiba"`, `addressRegion: "PR"`, `addressCountry: "BR"`).
- **Website:** `https://leokdigital.com.br/` (sempre HTTPS canônico, sem `www`).

---

## 2. Stage 4.2: Otimização para Motores Generativos (GEO) & Answer Engines (AEO) — `ai-seo`

Com o avanço do Google AI Overviews, Perplexity, ChatGPT Search e assistentes corporativos, o tráfego orgânico migrou de "clique em links azuis" para "citação como fonte autoritativa em respostas sintetizadas". O processo de Generative Engine Optimization (GEO) e Answer Engine Optimization (AEO) rege a formatação do conteúdo para máxima extração por LLMs.

### 2.1 O Estudo Princeton GEO (KDD 2024, Aggarwal et al.)
A pesquisa científica pioneira da Universidade de Princeton avaliou empiricamente o comportamento de motores de resposta generativa (especialmente Perplexity.ai) ao ranquear e citar fontes web. O estudo identificou uma hierarquia quantitativa clara de fatores que impactam a visibilidade em IAs:

```
┌────────────────────────────────────────────────────────────────────────┐
│           HIERARQUIA DE VISIBILIDADE GEO (PRINCETON KDD 2024)          │
│                                                                        │
│  [+40%] Citação de Fontes Autorizadas (links externos e referências)    │
│  [+37%] Estatísticas e Dados Numéricos Concretos                       │
│  [+30%] Citações Diretas e Aspas de Especialistas (Named Authors)      │
│  [+25%] Tom Autoritativo e Postura de Operador Sênior                  │
│  [+20%] Clareza e Simplificação de Conceitos Complexos                 │
│  [+18%] Terminologia Técnica Apropriada de Domínio                     │
│  [+15%] Vocabulário Único e Densidade Lexical                          │
│  [+15% a +30%] Otimização de Fluência e Legibilidade                   │
│                                                                        │
│  [-10%] PENALIDADE: Keyword Stuffing (degrada ativamente a citação)    │
└────────────────────────────────────────────────────────────────────────┘
```

#### A Sinergia Máxima: Fluência + Estatísticas
O estudo comprovou que a combinação de **Otimização de Fluência** com **Estatísticas Concretas** gera um efeito multiplicador, elevando a probabilidade de citação em **até +115%** para websites novos ou com menor autoridade tradicional de domínio.
- **Aplicação na Leo K Digital:** Todos os artigos e blocos de conteúdo apresentam dados auditáveis: horas de retrabalho economizadas (8 a 15 horas semanais), métricas de latência (120ms no PostgreSQL vs 4s em planilhas) e limites de Core Web Vitals (LCP < 1.2s, INP < 50ms).

### 2.2 Padrão de Blocos de Resposta Direta de 40 a 60 Palavras
Modelos de linguagem realizam extração de respostas em nível de **passagem** (passage-level indexing), e não de página inteira. Um bloco ideal para citação deve conter entre **40 e 60 palavras**, ser completamente autocontido (faz sentido isoladamente) e responder à pergunta do cabeçalho logo na primeira frase.

A Leo K Digital adota o banco canônico de 5 blocos de resposta direta validados:

#### Bloco 1: Identidade e Escopo Central (49 palavras)
> "A Leo K Digital é uma empresa de engenharia de software fundada por Leonardo Kinoshita em Curitiba. Desenvolve sistemas web sob medida em Next.js e PostgreSQL para substituir planilhas manuais em PMEs, além de criar sites com nota máxima no Core Web Vitals e otimização para motores de IA."

#### Bloco 2: Substituição de Planilhas Manuais (42 palavras)
> "Planilhas manuais carecem de controle de concorrência, permissões de usuário e integridade referencial, gerando retrabalho e risco de perda de dados. Sistemas web sob medida centralizam dados em PostgreSQL com regras de negócio em TypeScript, garantindo segurança, agilidade e relatórios em tempo real."

#### Bloco 3: GEO e AEO na Prática (53 palavras)
> "Generative Engine Optimization (GEO) e Answer Engine Optimization (AEO) são técnicas de estruturação semântica e factual para que marcas sejam citadas como fontes autoritativas em IAs como ChatGPT, Perplexity e Google AI Overviews. A Leo K Digital implementa blocos de resposta direta de 40 a 60 palavras e dados estruturados em leokdigital.com.br."

#### Bloco 4: Atendimento Local Curitiba e Nacional (47 palavras)
> "Sediada em Curitiba, a Leo K Digital atende empresas locais e PMEs nacionais desenvolvendo software sob medida e sites ultrarrápidos. A empresa realiza diagnóstico operacional presencial e remoto, unificando cadastros e migrando planilhas frágeis para bancos relacionais seguros com código 100% próprio em leokdigital.com.br."

#### Bloco 5: Métricas de Core Web Vitals Garantidas (48 palavras)
> "A Leo K Digital projeta aplicações web que atingem nota máxima no Google PageSpeed, com LCP inferior a 1,2 segundos, INP abaixo de 50 milissegundos e CLS igual a zero. Essa performance elimina travamentos, retém visitantes e assegura prioridade no ranqueamento orgânico do Google e motores de IA."

### 2.3 Gestão de Query Fan-Out
Motores de busca modernos de IA não processam apenas a consulta exata digitada pelo usuário. Eles executam um processo de **Query Fan-Out**, desmembrando o prompt original em 5 a 10 sub-queries simultâneas de segundo nível.

Por exemplo, um usuário perguntando *"Como substituir planilhas na minha empresa?"* dispara sub-queries como:
- *Riscos de perda de dados no Excel compartilhado*
- *Quanto custa desenvolver um sistema web sob medida*
- *Comparativo PostgreSQL vs planilhas para controle de estoque*
- *Tempo de implementação de software Next.js corporativo*

**Estratégia de Cobertura por Topic Clusters:**  
Páginas isoladas de palavras-chave perdem relevância no fan-out. A Leo K Digital estrutura sua presença nos 3 Pilares Temáticos de autoridade definidos no Stage 2 (`artifacts/strategy_brief.json`), com uma página hub aprofundada interligada aos spokes técnicos específicos.

---

## 3. Stage 4.3: Arquitetura Semântica Schema.org JSON-LD — `schema`

Dados estruturados em JSON-LD estabelecem a ponte definitiva entre o código da aplicação e o grafo de conhecimento das inteligências artificiais.

### 3.1 Grafo Semântico Unificado `@graph`
Em vez de fragmentar blocos isolados de dados no HTML, a Leo K Digital utiliza um grafo unificado (`@graph`) servido em `public/schema.json` e injetado nas páginas. Todas as entidades conectam-se por `@id` canônicos:

```
[WebSite] ──publisher──► [Organization] ◄──parentOrganization── [ProfessionalService]
                               │                                       │ (LocalBusiness)
                               ├─founder─► [Person]                    ├─address: Curitiba
                               │                                       ├─geo: -25.4284, -49.2733
                               ├─provider─► [Service 1: Sistemas Web]  └─areaServed: Brasil
                               ├─provider─► [Service 2: Sites Next.js]
                               ├─provider─► [Service 3: SEO/GEO/AEO]
                               │
                          [FAQPage] (Passage Q&A Blocks)
```

#### Entidades Obrigatórias Integradas:
1. **`Organization` (`https://leokdigital.com.br/#organization`):**
   - Define a identidade corporativa global, URL canônica, logotipo, slogan ("Sua presença no digital."), descrição, fundador Leonardo Kinoshita (`Person`), canais de contato e campos de conhecimento (`knowsAbout`).
2. **`WebSite` (`https://leokdigital.com.br/#website`):**
   - Associa o website oficial ao publicador corporativo em idioma `pt-BR`.
3. **`ProfessionalService` (`https://leokdigital.com.br/#professionalservice`):**
   - Subtipo de `LocalBusiness` que ancora o SEO Local em Curitiba com coordenadas geográficas, horários de funcionamento e faixa de preço (`R$ 5.000 - R$ 35.000`).
4. **3 Entidades de `Service`:**
   - *Sistemas Web Sob Medida e Substituição de Planilhas*
   - *Desenvolvimento de Sites Ultrarrápidos e Presença Digital*
   - *SEO Local e Otimização para Inteligências Artificiais (GEO & AEO)*
   - Cada serviço referencia os termos e tabela de preços em `https://leokdigital.com.br/pricing.md`.
5. **`FAQPage` (`https://leokdigital.com.br/#faq`):**
   - Mapeia os 5 blocos canônicos de perguntas e respostas para extração direta por robôs de busca generativa.

### 3.2 Clarificação Técnica: Atualização SERP de Maio de 2026 do Google para FAQ
Em 7 de maio de 2026, o Google descontinuou definitivamente a exibição visual de rich snippets expansíveis de FAQ nas páginas de resultados gerais (SERPs) e removeu a documentação da galeria de recursos visuais em junho de 2026.

#### Por que o Schema `FAQPage` Continua Essencial?
1. **Mudança de Papel (De "Enfeite de SERP" para "Contrato Semântico de RAG"):**
   Enquanto o Google removeu o acordeão visual para limpar o layout mobile, os robôs de busca generativa (ChatGPT Search, Perplexity, Claude, Gemini e Google AI Overviews) dependem de marcação estruturada para extrair pares exatos de pergunta e resposta sem ambiguidades sintáticas.
2. **Zero Entropia de Parsing:**
   O schema `FAQPage` entrega as passagens prontas em JSON puro, eliminando erros de chunking ou truncamento de texto no DOM.
3. **Validação:**
   O validador oficial Schema.org (`validator.schema.org`) atesta 100% de conformidade técnica com o vocabulário semântico universal, independentemente da política de apresentação visual do Google Search.

### 3.3 Sanitização contra Injeção de Scripts HTML (`<` para `\u003c`)
Ao serializar JSON-LD em aplicações renderizadas no servidor (como Next.js ou templates SSR), o conteúdo é renderizado dentro de tags `<script type="application/ld+json">`.

#### O Risco de Segurança (HTML Parser vs JSON Parser):
O analisador de HTML do navegador sempre prioriza tags de fechamento `</script>`. Se uma string dinâmica contiver acidentalmente ou maliciosamente caracteres como `</script><script>alert(1)</script>`, o analisador HTML fechará prematuramente o bloco de script e executará a tag HTML maliciosa, criando uma vulnerabilidade de Cross-Site Scripting (XSS).

#### O Padrão de Sanitização da Leo K Digital:
O caractere `<` deve ser obrigatoriamente convertido na sequência de escape Unicode `\u003c`:

```javascript
/**
 * Serializa dados estruturados em JSON-LD de forma imune a injeção HTML
 * @param {object} schemaData - Grafo Schema.org
 * @returns {string} String JSON segura para injeção inline no HTML
 */
export function safeJsonLdStringify(schemaData) {
  return JSON.stringify(schemaData, null, 2).replace(/</g, '\\u003c');
}
```

No padrão JSON (RFC 8259), `\u003c` é interpretado de forma idêntica a `<` por qualquer analisador JSON ou crawler de IA (Googlebot, OpenAI, Perplexity), enquanto o analisador HTML do navegador jamais detecta a abertura ou fechamento de tags, neutralizando completamente o vetor de injeção.

---

## 4. Stage 4.4: Protocolo de Inteligência de Tendências & Recorrência — `last30days`

A Leo K Digital opera com a skill `last30days` (v3.39.0) como motor contínuo de inteligência de mercado e frescor editorial. Nos motores de busca de IA, o frescor factual (recency) é um critério eliminatório: dados com mais de 6 meses sofrem perda acentuada de prioridade.

### 4.1 O Papel da Recência na Otimização para IAs
- **Time-Decay dos Motores Generativos:** O Perplexity e o ChatGPT Search aplicam penalidades severas a conteúdos sem sinal recente de atualização.
- **Mineração de Dores Operacionais:** A skill monitora menções nos últimos 30 dias em Reddit, X, YouTube, TikTok, Instagram e Hacker News sobre gargalos em planilhas, custos ocultos de SaaS e queixas corporativas, gerando insumos para novos artigos e perguntas do FAQ.

### 4.2 Lei do Planejamento de Consultas (LAW 7)
Conforme a **LAW 7** da skill `last30days`, sob execução de agentes autônomos, o script encerra a execução com código de erro 2 se não receber um plano estruturado via stdin (`--plan -`). O modelo atua como o **planejador oficial**, construindo o plano JSON.

#### Schema Canônico do `QUERY_PLAN_JSON`:
```json
{
  "intent": "product",
  "freshness_mode": "balanced_recent",
  "cluster_mode": "workflow",
  "subqueries": [
    {
      "label": "primary",
      "search_query": "migracao planilhas sistema web pme",
      "ranking_query": "Quais são os principais problemas enfrentados por PMEs ao migrar de planilhas para sistemas web nos últimos 30 dias?",
      "sources": ["reddit", "x", "hackernews", "youtube", "tiktok", "instagram"],
      "weight": 1.0
    },
    {
      "label": "spreadsheets_frustration",
      "search_query": "problemas planilhas excel empresa gargalo",
      "ranking_query": "Quais gargalos e perdas financeiras empresas relataram recentemente por erros em planilhas?",
      "sources": ["reddit", "x", "youtube"],
      "weight": 0.8
    }
  ]
}
```

#### Regras de Ouro da LAW 7:
1. **Subquery Primária Completa:** Deve conter todas as fontes ativas disponíveis no sistema.
2. **Sem Termos Temporais na Query de Busca:** Nunca utilizar palavras como "últimos 30 dias", "recente", "2026" ou nomes de meses dentro de `search_query`. O motor aplica filtros temporais diretamente na API; termos temporais degradam a busca interna das plataformas.
3. **Pergunta no Ranking:** O campo `ranking_query` deve ser formulado como pergunta direta para orientar o algoritmo de reranqueamento semântico.
4. **Execução Direta em Shell:** O bloco heredoc deve ser executado diretamente na ferramenta de shell sem encapsulamento em `bash -lc '...'` ou `zsh -lc '...'` para evitar que aspas simples externas quebrem o JSON.

```bash
# Execução direta com plano JSON via stdin heredoc
"${LAST30DAYS_PYTHON}" "${SKILL_DIR}/scripts/last30days.py" "substituir planilhas por sistemas web" \
  --emit=compact \
  --save-dir="${LAST30DAYS_MEMORY_DIR}" \
  --save-suffix=v3 \
  --plan - <<'PLAN_EOF'
{
  "intent": "product",
  "freshness_mode": "balanced_recent",
  "cluster_mode": "workflow",
  "subqueries": [
    {
      "label": "primary",
      "search_query": "substituir planilhas sistema web pme",
      "ranking_query": "Como empresas estão substituindo planilhas manuais por sistemas web sob medida nos últimos 30 dias?",
      "sources": ["reddit", "x", "hackernews", "youtube", "tiktok", "instagram"],
      "weight": 1.0
    }
  ]
}
PLAN_EOF
```

### 4.3 Protocolo de Descoberta Tri-Comando (LAW 11)
Para varreduras amplas de mercado sem entidade pré-fixada, a **LAW 11** impõe o fluxo em 3 etapas sequenciais:

```
[Leg 1: Nominate (Varredura)] ──> discover-nominations.json
               │
               ▼
   [Julgamento pelo Agente (YOU)] ──> judgments.json (name, junk, worthiness)
               │
               ▼
[Leg 2: Deep Research Pass]   ──> discover-pending.json (angle inputs)
               │
               ▼
   [Redação de Ângulos (YOU)]   ──> angles.json (podcast hook, x_article hook)
               │
               ▼
[Leg 3: Finalize Brief]       ──> Relatório Consolidado de Tendências
```

1. **Leg 1 (Nominate):** Varre as plataformas e gera indicações candidatas em `discover-nominations.json`.
2. **Julgamento:** O agente classifica cada indicação atribuindo `name` (2 a 6 palavras), `junk` (booleano) e `worthiness` (0 a 100).
3. **Leg 2 (Deep Research Pass):** O script aprofunda a pesquisa sobre os tópicos aprovados via arquivo temporário `$JUDGMENTS_FILE`.
4. **Redação de Ângulos:** O agente redige ganchos de conteúdo (máximo de 200 caracteres cada) nas categorias `podcast` (debate técnico) e `x_article` (artigo afirmativo).
5. **Leg 3 (Finalize):** Consolidação do relatório analítico final com persistência no mesmo diretório `--save-dir`.

---

## 5. Contexto de Máquina e Ativos para Agentes Autônomos de Compra

Os agentes de inteligência artificial já atuam como **Autonomous Buying Agents** — sistemas autônomos que analisam fornecedores, comparam tecnologias e realizam orçamentos preliminares em nome de decisores corporativos.

A Leo K Digital fornece 4 ativos de texto plano diretamente na raiz pública (`public/`) para eliminar qualquer atrito de extração:

### 5.1 O Grafo de Dados Estruturados (`public/schema.json`)
Grafo JSON-LD multi-entidade interconectando `Organization`, `WebSite`, `ProfessionalService` em Curitiba, 3 entidades de `Service` e `FAQPage` com os blocos de resposta direta de 40 a 60 palavras.

### 5.2 O Arquivo de Contexto de IA (`public/llms.txt`)
Documento formatado segundo o padrão `llmstxt.org` que sintetiza a identidade da Leo K Digital para LLMs:
- **Título Oficial:** `# Leo K Digital`
- **Fundador e Liderança:** Leonardo Kinoshita
- **Website Oficial:** `https://leokdigital.com.br/`
- **Slogan:** "Sua presença no digital."
- **Pilares:** Sistemas web em Next.js e PostgreSQL, sites com Core Web Vitals 100/100, SEO Local Curitiba e otimização para IAs (GEO/AEO).
- **Garantia de Propriedade:** 100% código próprio do cliente, zero vendor lock-in.

### 5.3 O Documento de Preços Transparentes (`public/pricing.md`)
Agentes de IA descartam fornecedores que ocultam preços atrás de botões "Fale com Vendas" ou páginas renderizadas dinamicamente em JavaScript. O `public/pricing.md` detalha pacotes em texto puro:
- **Pacote 1 — Presença Digital & Performance Web:** A partir de R$ 7.500 (2 a 4 semanas). Sites institucionais ultrarrápidos em Next.js com estética Dark Tech Premium.
- **Pacote 2 — Migração de Planilhas para Sistema Web:** A partir de R$ 15.000 a R$ 35.000 (4 a 8 semanas). Modelagem relacional PostgreSQL, autenticação corporativa, permissões por usuário (RBAC) e eliminação de retrabalho.
- **Pacote 3 — Engine Completo de SEO, GEO/AEO & Autoridade Contínua:** Setup de R$ 5.000 + Retainer de R$ 3.500/mês. Schema.org `@graph`, calibragem de passage blocks e inteligência recency com `last30days`.
- **Pacote 4 / Enterprise:** Engenharia sob medida com squad dedicada e SLA prioritário.

### 5.4 Política de Crawlers em `public/robots.txt`
A Leo K Digital adota uma taxonomia explícita e diferenciada de rastreadores:
1. **Motores de Descoberta e Resposta Permitidos (`Allow: /`):**
   - `Googlebot`, `Bingbot` (busca tradicional).
   - `OAI-SearchBot` (ChatGPT Search).
   - `PerplexityBot` (Perplexity.ai).
   - `Claude-SearchBot` (Anthropic Search).
   - `meta-webindexer` (Meta AI).
2. **Permissão Geral Wildcard (`User-agent: *`):**
   - Acesso irrestrito aos arquivos de máquina (`/llms.txt`, `/pricing.md`, `/schema.json`, `/sitemap.xml`).
3. **Controle de Treinamento e Raspagem em Massa (`Disallow: /`):**
   - `GPTBot` (raspagem para treino de modelos OpenAI).
   - `ClaudeBot` (raspagem para treino de modelos Anthropic).
   - `meta-externalagent` (raspagem externa da Meta).
   - `Google-Extended` (controle de treino do Google Gemini).
4. **Declaração Canônica do Mapa do Site:**
   - `Sitemap: https://leokdigital.com.br/sitemap.xml`

---

## 6. Matriz de Conformidade com Invariantes de Marca e Domínio

Todos os documentos e artefatos de código produzidos no ecossistema da Leo K Digital são auditados por scanners adversários automatizados (`tests/e2e/helpers.mjs`). A conformidade com as regras abaixo é estrita e inegociável:

1. **Nome Oficial da Marca:** `"Leo K Digital"` (ocorrência 100% exata; qualquer variação de grafia, espaçamento, caixa alta/baixa indevida, pontuação ou abreviação não autorizada é terminantemente proibida e rejeitada pela suíte automatizada de testes).
2. **Domínio Exclusivo Canônico:** `"leokdigital.com.br"` (URL segura canônica: `https://leokdigital.com.br/`; proibido o uso de protocolo inseguro, prefixos não canônicos ou TLDs alternativos).
3. **Liderança Técnica e Fundador:** `"Leonardo Kinoshita"` (Software Engineer & Founder).
4. **Slogan Oficial:** `"Sua presença no digital."` (com pontuação final idêntica).
5. **Sede Operacional:** `"Curitiba, PR, Brasil"` (consistência cadastral NAP obrigatória para SEO Local).
6. **Sitemap Canônico:** `https://leokdigital.com.br/sitemap.xml`.

---

## 7. Procedimentos de Verificação E2E Automatizada

A validação de todos os entregáveis do Stage 4 é executada através da suíte nativa de testes do Node.js:

```bash
cd /Users/leo/teamwork_projects/leo_k_digital_team

# 1. Validação de Cobertura de Arquivos e Extensão Mínima (Tier 1)
node --test tests/e2e/tier1_coverage.test.mjs

# 2. Verificação de Invariantes de Marca e Domínio contra Scanners Adversários (Tier 2)
node --test tests/e2e/tier2_invariants.test.mjs

# 3. Alinhamento de Pipeline, Tokens de Marca e Sanitização contra Injeção de Scripts (Tier 3)
node --test tests/e2e/tier3_pipeline.test.mjs

# 4. Validação Estrutural de Grafo JSON-LD e Diretivas de Robôs (Tier 4)
node --test tests/e2e/tier4_operational.test.mjs

# 5. Execução Completa da Suíte Unificada
npm test
```

### Critérios de Aceite para Aprovação:
1. **Tier 1:** Existência de `public/schema.json`, `public/llms.txt`, `public/pricing.md`, `public/robots.txt` e `docs/playbooks/04_seo_geo_aeo_engine.md`, com extensão acima do mínimo e sem stubs ou textos de preenchimento provisórios.
2. **Tier 2:** Zero ocorrências de variantes proibidas da marca ou do domínio em qualquer arquivo.
3. **Tier 3:** Concordância total entre os dados de `public/schema.json` e `src/tokens/brand.json` (Nome, Fundador, URL Canônica), além da ausência completa de tags `<script` não sanitizadas no JSON.
4. **Tier 4:** Grafo Schema.org válido contendo `Organization`, `WebSite`, `ProfessionalService`, pelo menos 3 `Service` e `FAQPage`. `public/robots.txt` contendo `User-agent: *` e o sitemap canônico. `public/llms.txt` contendo `# Leo K Digital`, `Leonardo Kinoshita` e `leokdigital.com.br`.
