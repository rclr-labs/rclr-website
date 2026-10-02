import { useTranslation } from 'react-i18next'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

/* ─── Catálogo ─────────────────────────────────────────────────────────────
   Só entra aqui o que os próprios documentos de produto chamam de SaaS ou
   multi-tenant vendável, com o estágio declarado na fonte. Ficam de fora:
   ferramentas internas, uso pessoal, entrega de cliente único e os produtos
   cujo nome ainda é codinome interno (não publicamos codinome como marca).

   Referências: Oculus/PROJECT.md · Severinus/PROJECT.md ·
   white-label-data360/PROJECT.md · Domus/PROJECT.md */

const PRODUCTS = [
  {
    key: 'oculus',
    name: 'Oculus',
    status: { pt: 'em produção', en: 'in production' },
    tone: 'ok',
    pitch: {
      pt: 'Gestão de workspace multi-tenant: boards, projetos, produtos e uma hierarquia que cada empresa nomeia do jeito dela.',
      en: 'Multi-tenant workspace management: boards, projects, products, and a hierarchy each company names its own way.',
    },
    bullets: {
      pt: [
        'Hierarquia configurável de 1 a 3 níveis por workspace — de Organizações a Áreas de Prática → Casos.',
        'Módulos que conversam entre si: trilhas de aprendizagem, agentes de IA no SDLC e gestão de dados de teste.',
        'Self-service: a empresa assina e usa direto, sem consultor no meio.',
        'Governança de crédito de IA por workspace, para o gasto não virar surpresa no fim do mês.',
      ],
      en: [
        'Configurable one-to-three-level hierarchy per workspace — from Organisations to Practice Areas → Cases.',
        'Modules that talk to each other: learning tracks, AI agents in the SDLC, and test data management.',
        'Self-service: the company subscribes and uses it directly, with no consultant in the middle.',
        'Per-workspace AI credit governance, so spend never becomes an end-of-month surprise.',
      ],
    },
    audience: { pt: 'Empresas de qualquer porte que gerenciam portfólio, produtos e times', en: 'Companies of any size managing portfolio, products, and teams' },
    diff: { pt: 'A hierarquia se adapta ao vocabulário da empresa — não o contrário.', en: 'The hierarchy adapts to the company\u2019s vocabulary — not the other way around.' },
  },
  {
    key: 'severinus',
    name: 'Severinus',
    status: { pt: 'backend completo', en: 'backend complete' },
    tone: 'accent',
    pitch: {
      pt: 'Gestão condominial com transparência financeira em tempo real e autoatendimento do morador.',
      en: 'Condominium management with real-time financial transparency and resident self-service.',
    },
    bullets: {
      pt: [
        'Atende condomínios verticais e horizontais no mesmo produto, com campos customizados por condomínio.',
        'Cobrança por unidade, régua de inadimplência, fluxo de caixa e balancete em tempo real, prestação de contas com rateio e fundo de reserva.',
        'Autoatendimento do morador: reserva de áreas comuns, portaria, dependentes e veículos.',
        'Backend em Python/FastAPI sobre Cloud Run, Firestore e Firebase Auth; frontend Next.js; notificações por push.',
      ],
      en: [
        'Serves vertical and horizontal condominiums in the same product, with per-condominium custom fields.',
        'Per-unit billing, delinquency workflow, real-time cash flow and balance sheet, statements with apportionment and a reserve fund.',
        'Resident self-service: common-area booking, front desk, dependants, and vehicles.',
        'Python/FastAPI backend on Cloud Run, Firestore, and Firebase Auth; Next.js frontend; push notifications.',
      ],
    },
    audience: { pt: 'Condomínios, síndicos, conselhos e administradoras', en: 'Condominiums, building managers, boards, and management companies' },
    diff: { pt: 'Transparência financeira em tempo real como princípio de produto, não como relatório do mês seguinte.', en: 'Real-time financial transparency as a product principle, not next month\u2019s report.' },
  },
  {
    key: 'domus',
    name: 'Domus',
    status: { pt: 'em produção · por convite', en: 'in production · invite only' },
    tone: 'accent',
    pitch: {
      pt: 'App familiar unificado: a vida financeira da casa hoje, com calendário, atividades e saúde no mesmo backend.',
      en: 'A unified family app: the household\u2019s finances today, with calendar, activities, and health on the same backend.',
    },
    bullets: {
      pt: [
        'Um backend por household, com autenticação e dados compartilhados entre os membros da família.',
        'Import de CSV de banco brasileiro e OFX, deduplicação, categorização por regras e transferências internas sugeridas.',
        'Detecção de lançamentos recorrentes e previsão de saldo com nível de confiança exposto na interface.',
        'Operação de verdade: fila de jobs com retry, backup com verificação de restore e deploy por release imutável com rollback.',
      ],
      en: [
        'One backend per household, with authentication and data shared across family members.',
        'Brazilian bank CSV and OFX import, deduplication, rule-based categorisation, and suggested internal transfers.',
        'Recurring-entry detection and balance forecasting with the confidence level shown in the interface.',
        'Real operations: job queue with retry, backups with verified restores, and immutable-release deploys with rollback.',
      ],
    },
    audience: { pt: 'Famílias que querem a vida financeira da casa em um só lugar', en: 'Families who want the household\u2019s finances in one place' },
    diff: { pt: 'Módulos isolados por domínio no mesmo backend — o app não recomeça a cada assunto novo.', en: 'Domain-isolated modules on one backend — the app does not restart from scratch for every new subject.' },
  },
  {
    key: 'data360',
    name: 'White Label Data360',
    status: { pt: 'design do MVP', en: 'MVP design' },
    tone: 'soft',
    pitch: {
      pt: 'Plataforma de dashboards e analytics white-label: a empresa conecta os próprios dados e entrega análise com a própria marca.',
      en: 'White-label dashboard and analytics platform: a company connects its own data and ships analytics under its own brand.',
    },
    bullets: {
      pt: [
        'Isolamento por linha, não por dashboard: cada viewer vê apenas a fatia do dado que lhe pertence.',
        'Multi-tenant desde o primeiro dia — toda entidade carrega o identificador da organização, mesmo com um único cliente.',
        'A organização conecta as próprias fontes relacionais e monta os dashboards.',
        'Auth, secrets e deploy atrás de interfaces trocáveis, para adicionar SSO ou on-prem sem reescrever.',
      ],
      en: [
        'Row-level isolation, not dashboard-level: each viewer only sees the slice of data that belongs to them.',
        'Multi-tenant from day one — every entity carries the organisation identifier, even with a single client.',
        'The organisation connects its own relational sources and builds the dashboards.',
        'Auth, secrets, and deploy behind swappable interfaces, so SSO or on-prem can be added without a rewrite.',
      ],
    },
    audience: { pt: 'Empresas que querem oferecer analytics aos próprios clientes', en: 'Companies that want to offer analytics to their own clients' },
    diff: { pt: 'O dado é isolado na linha — o mesmo dashboard serve clientes diferentes sem vazar nada.', en: 'Data is isolated at the row — the same dashboard serves different clients without leaking anything.' },
  },
]

const BEYOND = [
  {
    tag: { pt: 'open-core · não é SaaS', en: 'open-core · not SaaS' },
    title: { pt: 'Dados de teste e virtualização de APIs', en: 'Test data and API virtualisation' },
    body: {
      pt: 'Motor que mantém o dado mascarado e o serviço simulado referencialmente coerentes — o mesmo contrato e a mesma semente servem os dois. Roda onde o cliente decidir, com camada enterprise paga: por decisão de arquitetura, não é SaaS multi-tenant.',
      en: 'An engine that keeps masked data and virtualised services referentially coherent — the same contract and the same seed serve both. It runs wherever the client decides, with a paid enterprise layer: by architectural decision, it is not multi-tenant SaaS.',
    },
  },
  {
    tag: { pt: 'módulo · oculus', en: 'module · oculus' },
    title: { pt: 'Certificação e trilhas de aprendizagem', en: 'Certification and learning tracks' },
    body: {
      pt: 'Emissão de certificados individual e em lote, revogação, download assinado e verificação pública sem login, com acompanhamento de conclusão por aluno e por instrutor.',
      en: 'Individual and batch certificate issuing, revocation, signed downloads, and public verification without login, with per-student and per-instructor completion tracking.',
    },
  },
  {
    tag: { pt: 'plugins abertos', en: 'open plugins' },
    title: { pt: 'Squads de agentes para o SDLC', en: 'Agent squads for the SDLC' },
    body: {
      pt: 'Squad de personas que conduz uma feature por plan, design, build, test, deploy e maintain, com secret-scan bloqueando commits e revisão de segurança antes de produção. É o método com que estes produtos são construídos — e é aberto para clientes e parceiros.',
      en: 'A squad of personas that drives a feature through plan, design, build, test, deploy, and maintain, with a secret-scan hook blocking commits and a security review before production. It is the method these products are built with — and it is open to clients and partners.',
    },
  },
]

const COPY = {
  pt: {
    eyebrow: '// 11 · produtos',
    title: ['Software que a RCLR', 'vende como SaaS.'],
    lede:
      'Produtos multi-tenant com o estágio declarado sem maquiagem: o que já roda em produção, o que tem backend completo e o que ainda é design de MVP.',
    metaSaas: 'saas',
    metaBeyond: 'além do saas',
    whatLabel: 'o que faz',
    forLabel: 'para quem',
    diffLabel: 'por que é diferente',
    modelLabel: 'modelo',
    modelTitle: ['Como', 'entregamos.'],
    model: [
      ['Multi-tenant de verdade', 'Um único ambiente serve todos os clientes, com isolamento por workspace ou por linha. Nada de instância dedicada por cliente.'],
      ['Self-service', 'A empresa assina e começa a usar sozinha. Onde há configuração, quem faz é o próprio cliente.'],
      ['Módulos que conversam', 'Aprendizagem, agentes de IA e dados de teste compartilham o mesmo modelo de workspace — o valor cresce na combinação, não no número de telas.'],
    ],
    beyondLabel: 'além do saas',
    beyondTitle: ['Nem tudo que', 'construímos é SaaS.'],
    beyondNote: 'Duas decisões conscientes: o motor de dados roda onde o cliente mandar, e o método de construção é aberto.',
    cta: {
      title: 'Quer ver um destes de perto?',
      body: 'Fazemos demonstração do que está em produção e conversamos sobre piloto, integração ou white-label.',
      button: '$ pedir demo →',
    },
    honest: 'Estágios declarados a partir dos documentos internos de cada produto, em 02/10/2026.',
  },
  en: {
    eyebrow: '// 11 · products',
    title: ['Software RCLR', 'sells as SaaS.'],
    lede:
      'Multi-tenant products with their stage stated plainly: what already runs in production, what has a complete backend, and what is still an MVP design.',
    metaSaas: 'saas',
    metaBeyond: 'beyond saas',
    whatLabel: 'what it does',
    forLabel: 'who it is for',
    diffLabel: 'why it is different',
    modelLabel: 'model',
    modelTitle: ['How we', 'deliver.'],
    model: [
      ['Truly multi-tenant', 'A single environment serves every customer, with isolation by workspace or by row. No dedicated instance per client.'],
      ['Self-service', 'A company subscribes and starts using it on its own. Where configuration is needed, the customer does it.'],
      ['Modules that talk', 'Learning, AI agents, and test data share the same workspace model — value grows with the combination, not with the number of screens.'],
    ],
    beyondLabel: 'beyond saas',
    beyondTitle: ['Not everything', 'we build is SaaS.'],
    beyondNote: 'Two deliberate decisions: the data engine runs wherever the client wants, and the building method is open.',
    cta: {
      title: 'Want a closer look?',
      body: 'We demo what is in production and talk about pilots, integrations, or white-labelling.',
      button: '$ request a demo →',
    },
    honest: 'Stages stated from each product\u2019s internal documents, as of 02/10/2026.',
  },
}

const SECTION_PAD = 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)'

const TONES = {
  ok: 'var(--accent)',
  accent: 'var(--accent)',
  soft: 'var(--fg-soft)',
}

function SectionHead({ eyebrow, title, meta }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
      <div>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          {eyebrow}
        </div>
        <h2 style={{
          fontFamily: SANS, fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.02,
          fontWeight: 600, letterSpacing: '-0.03em', margin: '16px 0 0', color: 'var(--fg)',
        }}>
          {title[0]}<br /><span style={{ color: 'var(--fg-soft)' }}>{title[1]}</span>
        </h2>
      </div>
      {meta && (
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', maxWidth: 320 }}>
          {meta}
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'
  const c = COPY[lang]

  return (
    <div>
      {/* ─── Hero ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {c.eyebrow}
          </div>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
            {PRODUCTS.length} {c.metaSaas} · {BEYOND.length} {c.metaBeyond}
          </div>
        </div>

        <h1 style={{
          fontFamily: SANS, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1,
          fontWeight: 600, letterSpacing: '-0.035em', margin: '20px 0 0', color: 'var(--fg)', maxWidth: 900,
        }}>
          {c.title[0]}<br /><span style={{ color: 'var(--fg-soft)' }}>{c.title[1]}</span>
        </h1>

        <p style={{ fontFamily: SANS, fontSize: 17, lineHeight: 1.6, color: 'var(--fg-mid)', margin: '28px 0 0', maxWidth: 660 }}>
          {c.lede}
        </p>
        <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)', marginTop: 18 }}>
          {c.honest}
        </div>
      </section>

      {/* ─── Produtos ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gap: 24 }}>
          {PRODUCTS.map((p, idx) => (
            <article key={p.key} className="product-row" style={{
              border: '1px solid var(--border)', background: 'var(--surface)',
              display: 'grid', gridTemplateColumns: 'minmax(260px, 0.9fr) minmax(320px, 1.6fr)',
            }}>
              {/* Identidade + estágio */}
              <div style={{ padding: 32, borderRight: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--accent)' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: TONES[p.tone], border: '1px solid var(--border)', padding: '3px 8px',
                  }}>
                    {p.status[lang]}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: SANS, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.02,
                  fontWeight: 600, letterSpacing: '-0.03em', margin: '0 0 14px', color: 'var(--fg)',
                }}>{p.name}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: 'var(--fg-mid)', margin: '0 0 22px' }}>
                  {p.pitch[lang]}
                </p>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: 6 }}>
                  {c.forLabel}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.5, color: 'var(--fg-soft)' }}>
                  {p.audience[lang]}
                </div>
              </div>

              {/* Capacidades + diferencial */}
              <div style={{ padding: 32 }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: 14 }}>
                  {c.whatLabel}
                </div>
                <ul style={{ margin: '0 0 24px', padding: 0, listStyle: 'none' }}>
                  {p.bullets[lang].map((b) => (
                    <li key={b} style={{
                      fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: 'var(--fg-mid)',
                      padding: '9px 0 9px 22px', position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontFamily: MONO, fontSize: 12 }}>—</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div style={{
                  borderTop: '1px solid var(--border)', paddingTop: 18,
                  display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap',
                }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>
                    {c.diffLabel}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: 'var(--fg)', letterSpacing: '-0.01em' }}>
                    {p.diff[lang]}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Modelo ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <SectionHead eyebrow={`// 11.1 · ${c.modelLabel}`} title={c.modelTitle} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
          {c.model.map(([title, body], i) => (
            <div key={title} style={{ background: 'var(--surface)', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--accent)', marginBottom: 12 }}>0{i + 1}</div>
              <div style={{ fontFamily: SANS, fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 10, lineHeight: 1.2 }}>
                {title}
              </div>
              <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-mid)', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Além do SaaS ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <SectionHead
          eyebrow={`// 11.2 · ${c.beyondLabel}`}
          title={c.beyondTitle}
          meta={c.beyondNote}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {BEYOND.map((b) => (
            <div key={b.title[lang]} className="cell" style={{ padding: 28, borderStyle: 'dashed' }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
                {b.tag[lang]}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 10, lineHeight: 1.2 }}>
                {b.title[lang]}
              </div>
              <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-mid)', margin: 0 }}>{b.body[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: SECTION_PAD }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <h2 style={{
              fontFamily: SANS, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.05,
              fontWeight: 600, letterSpacing: '-0.03em', margin: 0, color: 'var(--fg)',
            }}>{c.cta.title}</h2>
            <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: 'var(--fg-mid)', margin: '16px 0 0' }}>
              {c.cta.body}
            </p>
          </div>
          <a href="#contato" style={{
            fontFamily: MONO, fontSize: 13, padding: '14px 22px',
            background: 'var(--accent)', color: 'var(--accent-ink)', textDecoration: 'none',
          }}>{c.cta.button}</a>
        </div>
      </section>
    </div>
  )
}
