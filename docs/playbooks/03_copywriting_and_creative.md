# Playbook 03: Copywriting de Alta Performance, Criativos e Voz de Marca

## Overview & Propósito Operacional

O **Playbook 03** governa todas as diretrizes de redação publicitária, estratégia criativa, governança da voz de marca e produção de conteúdo técnico no ecossistema da **Leo K Digital** (`https://leokdigital.com.br/`).

No pipeline operacional de 6 estágios, este playbook rege o **Stage 3 (Copywriting & Creative)**. Ele consome os direcionamentos de ICP, pilares de tópicos e dores operacionais compilados no Stage 2 (`artifacts/strategy_brief.json`) e produz os ativos reais de texto e áudio que alimentam o motor de busca e estruturação semântica (Stage 4 / Playbook 04) e a produção de vídeo motion em HyperFrames + GSAP (Stage 5 / Playbook 05).

```
┌────────────────────────────────────────────────────────────────────────┐
│                      PIPELINE LEO K DIGITAL                            │
│                                                                        │
│   [Stage 2: Estratégia & Audiência] (Playbook 02)                      │
│                 │  Consome: artifacts/strategy_brief.json              │
│                 ▼                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ STAGE 3: COPYWRITING & CRIATIVOS (Playbook 03)                   │  │
│  │ Skills: brand-voice | ad-creative                                │  │
│  │         copywriting | article-writing                            │  │
│  │ Produz: src/content/ads_google_rsa.json                          │  │
│  │         src/content/ads_meta.json                                │  │
│  │         src/content/technical_article.md                         │  │
│  │         src/content/voiceover_script.json                        │  │
│  │         artifacts/creative_package.json                          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                 │                                                      │
│                 ▼                                                      │
│   [Stage 4: SEO, GEO & AEO] (Playbook 04: public/schema.json, llms.txt)│
│                 │                                                      │
│                 ▼                                                      │
│   [Stage 5: Visual & Motion] (Playbook 05: src/motion/ 1080x1920 60fps)│
└────────────────────────────────────────────────────────────────────────┘
```

### Manifesto do Operador Técnico
A Leo K Digital adota uma postura inegociável de **comunicação de engenharia de software**. Falamos como engenheiros e operadores seniores que compreendem balanços de P&L, gargalos operacionais e transações concorrentes. Substituímos superlativos e adjetivos vazios por recibos empíricos, métricas do Core Web Vitals e código funcional.

- **Marca Oficial:** Leo K Digital
- **Fundador e Autor:** Leonardo Kinoshita
- **Website Canônico:** `https://leokdigital.com.br/`
- **Slogan Oficial:** "Sua presença no digital."
- **Paleta Dark Tech Premium:** `#0A0A0F`, `#FF3B30`, `#FFD60A`, `#4285F4`, `#30D158`.

---

## 1. Sistema Canônico de Voz de Marca — `brand-voice`

A voz da Leo K Digital reflete a autoridade sóbria e direta de **Leonardo Kinoshita**, engenheiro de software e fundador. Não utilizamos jargões de agências publicitárias tradicionais nem promessas milagrosas de marketing.

### 1.1 Schema Completo do `VOICE PROFILE`

```markdown
# VOICE PROFILE — Leonardo Kinoshita & Leo K Digital

1. AUTHOR & PERSONA:
   - Identidade: Leonardo Kinoshita, fundador e engenheiro de software sênior na Leo K Digital.
   - Postura: Operador pragmático, analítico e avesso a rodeios teóricos. Foco em arquitetura escalável e eliminação de desperdício em PMEs.
   - Localização: Curitiba, PR, Brasil.

2. OBJETIVO PRIMÁRIO DA COMUNICAÇÃO:
   - Demonstrar com precisão cirúrgica por que processos manuais em planilhas limitam o faturamento de PMEs e como sistemas web sob medida em Next.js e PostgreSQL resolvem o problema de forma definitiva.

3. NÍVEL DE CONFIANÇA & POSTURA:
   - Tom afirmativo, calmo e incontestável. Afirmações sustentadas por código, dados de banco e benchmarks empíricos. Zero hesitação ou necessidade de autopromoção ruidosa.

4. CONJUNTO DE FONTES & REFERÊNCIAS:
   - Padrões de engenharia de software (ACID, Server Components, TypeScript).
   - Métricas oficiais do Google Core Web Vitals (LCP, INP, CLS, TTFB).
   - Experiência de campo em diagnósticos de processos operacionais em PMEs brasileiras.

5. RITMO & CADÊNCIA:
   - Frases concisas e declarativas. Parágrafos curtos (2 a 4 linhas).
   - Alternância calculada entre afirmações operacionais diretas e blocos de evidência técnica.

6. COMPRESSÃO & DENSIDADE DE SINAL:
   - Densidade máxima de informação por caractere. Toda frase deve ensinar um mecanismo ou apresentar um dado verificável.

7. CAPITALIZAÇÃO & FORMATO:
   - Respeito estrito à ortografia do português brasileiro formal com termos técnicos consolidados em inglês (Server Components, Core Web Vitals, Row-Level Lock).

8. USO DE PARÊNTESES:
   - Uso cirúrgico para esclarecimentos conceituais rápidos (ex.: "...controle de concorrência (row-level lock)...").

9. USO DE PERGUNTAS:
   - Apenas perguntas diagnósticas que expõem um ponto cego real da operação do cliente. Proibidas perguntas retóricas decorativas.

10. ESTILO DE AFIRMAÇÃO:
    - Falsificável e auditável. Exemplo: "Reduzimos o tempo de resposta da consulta de 4 segundos para 120 milissegundos usando índices b-tree compostos no PostgreSQL."

11. MOVIMENTOS PREFERENCIAIS (PREFERRED MOVES):
    - Apresentar primeiro o artefato concreto (schema SQL, função TypeScript, tabela de latência) antes de explicar o contexto de negócio.
    - Comparar o custo oculto de horas gastas em conciliação manual contra o investimento em desenvolvimento sob medida.
    - Destacar que o código desenvolvido é 100% de propriedade da empresa do cliente, sem taxas mensais por usuário.

12. MOVIMENTOS BANIDOS (BANNED MOVES):
    - Proibição absoluta de estruturas de contraste artificial ("Não é X, é Y").
    - Proibição de listas de negação tripla ("Sem X, sem Y, sem Z").
    - Proibição de clichês publicitários ("Diga adeus a", "No cenário atual", "Desbloqueie o poder").

13. REGRAS DE CHAMADA PARA AÇÃO (CTA):
    - Convite sóbrio para diagnóstico técnico: "Acesse leokdigital.com.br e agende uma conversa técnica direto com Leonardo Kinoshita."
```

---

## 2. Motor de Criativos de Performance — `ad-creative`

A Leo K Digital opera campanhas de tráfego pago baseadas em alta intenção e rigor matemático de limites de plataforma.

### 2.1 Os 4 Modos Operacionais de Criação

1. **Modo 1 (Criação do Zero / Scratch):** Geração estruturada a partir de teses de posicionamento do ICP mapeadas no Playbook 02.
2. **Modo 2 (Iteração por Performance):** Ajuste de variáveis isoladas (apenas gancho de abertura ou CTA) baseado em métricas de entrega sem reescrever o anúncio inteiro.
3. **Modo 3 (Lotes Terrestres Escalados):** Matrizes de criativos geradas a partir de dores operacionais reais de clientes auditados.
4. **Modo 4 (Loop de Estratégia Criativa):** Análise periódica da fadiga de criativos e abertura de novos ângulos de ataque (ex.: transição de dor de estoque para conformidade fiscal).

### 2.2 Especificações de Plataforma & Limites Rígidos

#### Google Responsive Search Ads (RSA):
- **Títulos (Headlines):** Mínimo de 10 títulos (máximo 15). Cada título deve possuir **estritamente até 30 caracteres**.
- **Descrições (Descriptions):** Mínimo de 4 descrições. Cada descrição deve possuir **estritamente até 90 caracteres**.
- **Caminhos de Exibição (Display Paths):** Exatamente 2 caminhos com até 15 caracteres cada (ex.: `/sistemas/web`).
- **Independência de Permutação:** Como o algoritmo do Google Ads combina títulos e descrições aleatoriamente, **cada título e descrição deve ser independente e fazer sentido completo sozinho**. Títulos que dependem de ordem gramatical para fazer sentido são rejeitados.

#### Meta Feed Ads (Instagram & Facebook):
- **Gancho Visível Primário (Primary Hook):** Os primeiros **125 caracteres** aparecem antes do truncamento "... Ver mais" no feed mobile. O argumento central e a quebra de padrão devem ocorrer antes do caractere 125.
- **Título do Link (Headline):** Estritamente **até 40 caracteres**.
- **Descrição de Suporte (Link Description):** Estritamente **até 30 caracteres**.

### 2.3 As 8 Categorias Estratégicas de Ângulo

1. **Dor Operacional (Pain Point):** Foco na vulnerabilidade e travamento de planilhas manuais.
2. **Resultado Concreto (Outcome):** Ganho de 10 a 15 horas semanais por equipe e precisão absoluta de estoque.
3. **Prova Social & Autoridade (Social Proof):** Sistemas desenvolvidos e operando em produção no Paraná e São Paulo.
4. **Contraste de Mecanismo (Curiosity/Mechanism):** Transações atômicas no PostgreSQL contra células desprotegidas do Excel.
5. **Comparação Direta (Comparison):** Software Sob Medida vs. SaaS Genérico por Assinatura vs. Planilha.
6. **Urgência Operacional (Urgency):** O custo invisível de postergar a migração até o próximo erro grave de faturamento.
7. **Identidade B2B (Identity/B2B):** Posicionamento voltado a diretores de operações que prezam por precisão técnica.
8. **Operador Contraintuitivo (Contrarian):** Por que contratar mais estagiários para alimentar planilhas encarece o custo marginal da empresa.

### 2.4 Arquitetura do Gancho em 3 Componentes
Nos primeiros 3 segundos de qualquer anúncio em vídeo ou feed, três camadas não-redundantes operam em sincronia:

```
┌────────────────────────────────────────────────────────────────────────┐
│               ARQUITETURA DE GANCHO DE 3 COMPONENTES (0-3s)            │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. Camada Visual (Visual Action)│ Cursor fecha planilha Excel travada e │
│                                │ abre dashboard glassmorphic veloz     │
├────────────────────────────────┼───────────────────────────────────────┤
│ 2. Camada Falada (Spoken Line) │ "Sua operação travou na planilha de   │
│                                │ novo?"                                │
├────────────────────────────────┼───────────────────────────────────────┤
│ 3. Camada de Texto (Caption)   │ "Leo K Digital | Sistemas Web"        │
└────────────────────────────────┴───────────────────────────────────────┘
```
*Regra de Ouro da Não-Duplicação:* A camada visual, o áudio falado e o texto da legenda nunca repetem exatamente as mesmas palavras simultaneamente. Cada camada entrega um aspecto complementar da mensagem.

### 2.5 O Funil de Diagnóstico de Anúncios
Quando um criativo não atinge o benchmark, diagnosticamos a variável exata através do funil de 4 etapas:
1. **Thumbstop Rate ($< 30\%$ nos primeiros 3s):** Problema no gancho visual. Altere a quebra de padrão inicial.
2. **Hold Rate ($< 15\%$ entre 3s e 15s):** Problema na rampa de transição (on-ramp). Fortaleça a explicação do mecanismo.
3. **Click-Through Rate (CTR $< 1.2\%$):** Problema na oferta ou na relevância do argumento central.
4. **Conversion Rate (CVR $< 5\%$ na LP):** Desalinhamento entre a promessa do anúncio e a página de destino.

---

## 3. Arquitetura de Redação para Conversão — `copywriting`

A redação de conversão da Leo K Digital aplica testes eliminatórios para garantir clareza cartesiana e diferenciação real de mercado.

### 3.1 O Teste do Portão das 3 Perguntas (3-Question Gate)
Toda linha de texto produzida para páginas, anúncios ou artigos deve ser submetida a três perguntas de validação:

```
[Linha de Texto em Rascunho]
         │
         ▼
[Pergunta 1: O leitor consegue visualizar mentalmente a cena?]
├── NÃO  ──► REJEITAR / REESCREVER com substantivos concretos
└── SIM
         │
         ▼
[Pergunta 2: A afirmação pode ser provada como verdadeira ou falsa?]
├── NÃO  ──► REJEITAR / REESCREVER com métricas auditáveis
└── SIM
         │
         ▼
[Pergunta 3: O Swap Test - Um concorrente genérico poderia assinar isso?]
├── SIM  ──► REJEITAR / REESCREVER com mecanismos exclusivos Leo K Digital
└── NÃO
         │
         ▼
[APROVADO PARA PRODUÇÃO]
```

- **Aprovação Total (3 SIMs):** Manter o texto inalterado.
- **2 SIMs:** Lapidar para introduzir mecanismos mais precisos.
- **0 a 1 SIM:** Descarte obrigatório.

### 3.2 Protocolo Descompor e Travar (Decompose-and-Lock)
Para evitar retrabalho caótico em páginas completas, a copy é construída em blocos modulares isolados:
1. Título e Proposta de Valor Única (Travar)
2. Demonstração do Mecanismo Técnico (Travar)
3. Apresentação do Caso Concreto e Recibos de ROI (Travar)
4. Oferta e Transparência de Propriedade do Código (Travar)
5. Chamada para Ação com Fundador (Travar)

Uma vez travado um bloco, ele não é reescrito por capricho; apenas testes A/B com significância estatística autorizam modificações.

### 3.3 Regra de Ouro: Afirmações Devem Ser Auditáveis
É estritamente proibido inventar dados estatísticos ou promessas superlativas ("o melhor sistema", "lucros garantidos"). Se uma afirmação necessitar de evidência ainda não homologada no projeto, ela deve ser declinada e sinalizada com a tag explícita:

```
[NEED: benchmark comparativo de latência em milissegundos]
```

Essa disciplina garante que a reputação de engenharia de Leonardo Kinoshita permaneça inatacável.

---

## 4. Engenharia de Artigos Técnicos de Operador — `article-writing`

O modelo de artigos técnicos da Leo K Digital destina-se a tomadores de decisão qualificados que buscam profundidade técnica e solução para problemas complexos de infraestrutura.

### 4.1 Estrutura Concreta em Primeiro Lugar (Concrete-First)
Rejeitamos categoricamente introduções genéricas ("No mundo dinâmico da tecnologia moderna..."). O artigo da Leo K Digital abre imediatamente com o **artefato de engenharia**:
- Linha 1 a 30: O schema SQL relacional ou o trecho de código TypeScript que resolve o problema.
- Linha 31 em diante: A explicação técnica do porquê aquela modelagem supera as abordagens tradicionais e o impacto econômico direto na operação da empresa.

### 4.2 Requisitos Obrigatórios do Artigo Técnico
1. **Extensão Mínima:** Pelo menos **800 palavras** de conteúdo denso e estruturado.
2. **Autoria Obrigatória:** Assinado nominalmente por **Leonardo Kinoshita**, engenheiro de software e fundador.
3. **Blocos de Código:** Presença obrigatória de código real em SQL (`CREATE TABLE`, `INDEX`, `TRANSACTION`) e TypeScript (serviços com controle de concorrência e transações ACID).
4. **Métricas de Performance:** Apresentação de metas auditáveis de Core Web Vitals (LCP $< 1.0\text{s}$, INP $< 50\text{ms}$, CLS $= 0.00$).
5. **Invariantes Canônicas:** Menção exata a `"Leo K Digital"` e `"leokdigital.com.br"`.

---

## 5. Lista Negra Definitiva de Vícios de IA (Master AI Tell Blacklist)

A proliferação de textos gerados por modelos de linguagem sem supervisão gerou padrões estilísticos repetitivos que destroem a credibilidade de qualquer comunicação técnica. A Leo K Digital adota uma **tolerância zero** para os vícios abaixo:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   LISTA NEGRA DE VÍCIOS DE IA (BANNED TELLS)           │
├──────────────────────────────────────┬─────────────────────────────────┤
│ PADRÃO REJEITADO                     │ CORREÇÃO NA LEO K DIGITAL       │
├──────────────────────────────────────┼─────────────────────────────────┤
│ 1. Revelação de Contraste            │ Descrever diretamente a solução │
│    "Não é apenas um site, é um motor"│ "Desenvolvemos sistemas web em  │
│                                      │ Next.js integrados ao Postgres."│
├──────────────────────────────────────┼─────────────────────────────────┤
│ 2. Lista de Negação Tripla           │ Apresentar capacidade ativa     │
│    "Sem planilhas. Sem erros. Sem dor"│ "Transações atômicas com travas │
│                                      │ de linha que garantem estoque." │
├──────────────────────────────────────┼─────────────────────────────────┤
│ 3. Frases de Acúmulo com Gerúndio    │ Encerrar a frase no ponto final │
│    "...sincronizando dados, gerando  │ "...sincroniza dados em tempo   │
│    relatórios e acelerando lucros."  │ real. A equipe não redigita."   │
├──────────────────────────────────────┼─────────────────────────────────┤
│ 4. Revelação com Dois Pontos Vazios  │ Construção direta de sujeito    │
│    "O resultado: sucesso absoluto."  │ "A taxa de erro caiu a zero."   │
├──────────────────────────────────────┼─────────────────────────────────┤
│ 5. Clichês Promocionais Gastos       │ Fatos e especificações técnicas │
│    "Diga adeus a", "Desbloqueie o"   │ "Substitua planilhas manuais."  │
├──────────────────────────────────────┼─────────────────────────────────┤
│ 6. Aberturas Panorâmicas de Redação  │ Abrir diretamente no problema   │
│    "No cenário empresarial de hoje"  │ "Quando uma planilha atinge 40  │
│                                      │ abas, os dados se corrompem."   │
└──────────────────────────────────────┴─────────────────────────────────┘
```

### Protocolo de Auto-Verificação Pré-Entrega
Antes de homologar qualquer entrega textual, o autor ou agente executa um script automatizado que valida:
1. Varredura por expressões proibidas da lista negra.
2. Contagem de caracteres por frase: sentenças com mais de 25 palavras devem ser fracionadas.
3. Teste de leitura em voz alta: o texto deve soe como um engenheiro experiente conversando em uma sala de reuniões.

---

## 6. Contratos de Handoff Inter-Estágios

Os entregáveis refinados sob este Playbook 03 são salvos nos seus locais canônicos no repositório:

1. **Google Ads RSA:** `src/content/ads_google_rsa.json` (títulos $\le 30$c, descrições $\le 90$c).
2. **Meta Ads Package:** `src/content/ads_meta.json` (ganchos $\le 125$c, títulos $\le 40$c).
3. **Artigo Técnico do Operador:** `src/content/technical_article.md` ($\ge 800$ palavras, código SQL/TS, Leonardo Kinoshita).
4. **Roteiro de Narração para Motion:** `src/content/voiceover_script.json` (1800 frames = 30s @ 60fps, voz Adam pt-BR, pílulas com glow).
5. **Pacote Criativo Integrado:** `artifacts/creative_package.json` (dados de transição para Stage 4 SEO e Stage 5 Motion).

---

## 7. Conformidade Rígida com Regras de Marca e Invariantes

Todas as produções criativas regidas por este Playbook 03 devem respeitar integralmente os padrões de identidade canônica da marca:

1. **Nome Oficial:** `"Leo K Digital"` (grafia exata, com espaço simples e maiúsculas corretas; qualquer variação é rejeitada pela auditoria).
2. **Domínio Exclusivo:** `"leokdigital.com.br"` (URL segura: `https://leokdigital.com.br/`).
3. **Fundador e Liderança:** `"Leonardo Kinoshita"` (Software Engineer & Founder).
4. **Slogan Oficial da Marca:** `"Sua presença no digital."`.
5. **Padrão de Áudio:** Voz Adam da ElevenLabs em português do Brasil (`voiceId: pNInz6obpgDQGcFmaJgB`), tom assertivo e encorpado de autoridade técnica.
6. **Tokens Visuais Dark Tech:** `#0A0A0F`, `#FF3B30`, `#FFD60A`, `#4285F4`, `#30D158`, tipografias Plus Jakarta Sans e JetBrains Mono.
