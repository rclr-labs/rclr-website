import { useTranslation } from 'react-i18next'
import talks from '../data/talks.json'

const MONO = '"JetBrains Mono", monospace'
const SANS = '"Geist", "Inter Tight", system-ui, sans-serif'

/* ─── Derivados verificáveis do arquivo público de palestras ─────────────
   Nada aqui é digitado à mão: tudo sai de src/data/talks.json, para que a
   página não afirme número que o arquivo não sustenta. */
const YEARS = [...new Set(talks.map((t) => t.year))].sort()

const COUNTRY_RULES = [
  ['Brazil', 'Brasil'],
  ['Spain', 'Espanha'],
  ['United Kingdom', 'Reino Unido'],
  ['UK', 'Reino Unido'],
  ['Germany', 'Alemanha'],
  ['United States', 'Estados Unidos'],
]

function countryOf(talk) {
  const loc = talk.location_en || ''
  const rule = COUNTRY_RULES.find(([needle]) => loc.includes(needle))
  return rule ? rule[1] : null
}

const COUNTRIES = [...new Set(talks.map(countryOf).filter(Boolean))].sort()
const INTERNATIONAL = talks.filter((t) => t.international).length
const BY_YEAR = YEARS.slice().reverse().map((year) => ({
  year,
  items: talks.filter((t) => t.year === year),
}))

const COPY = {
  pt: {
    eyebrow: '// 10 · autoridade',
    title: ['Eminência técnica', 'não é currículo. É prática documentada.'],
    lede:
      'Toda afirmação desta página tem origem rastreável: o arquivo público de palestras, as publicações assinadas e as trajetórias de Rafael Navarro Cintra e Larissa Rosochansky.',
    archiveNote: 'Números do arquivo público de palestras. Histórico anterior a 2019 não está neste repositório.',
    stats: { talks: 'palestras no arquivo', intl: 'internacionais', countries: 'países', years: 'anos' },
    peopleLabel: 'trajetórias',
    peopleTitle: ['Duas carreiras', 'construídas em operação.'],
    peopleNote: 'Passagens profissionais citadas nas biografias oficiais.',
    stages: { title: 'Palcos', meta: 'conferências por ano', who: { Rafael: 'Rafael', Larissa: 'Larissa', both: 'Em dupla' } },
    themesTitle: ['Temas', 'que sustentam a autoridade.'],
    themes: [
      ['Qualidade intrínseca e cultura de engenharia', 'Built-in Quality Mindset, automação e o custo de empurrar teste para o fim do pipeline.'],
      ['Smart testing e priorização de cobertura', 'Framework de dois eixos: o quanto o teste importa para o usuário e o quão viável é automatizá-lo.'],
      ['IA e o futuro do trabalho técnico', 'O que continua sendo humano quando a IA escreve os testes e o código.'],
      ['DevOps e entrega contínua', 'Além do pipeline: cultura, propriedade e o fim da separação dev/ops.'],
      ['Liderança, carreira e transformação', 'Protagonismo técnico, transformação digital lean e automação cognitiva.'],
    ],
    publications: {
      title: ['Publicações e', 'reconhecimento.'],
      book: {
        tag: 'livro',
        title: 'Qualidade antes do pipeline.',
        body: 'Quinze anos construindo plataformas de teste e cultura de qualidade, condensados em quatro capítulos — sem heróis e sem manuais. Autoria de R. N. Cintra e L. Rosochansky.',
      },
      leaddev: {
        tag: 'artigo · LeadDev, jan/2024',
        title: 'Instilling the built-in quality mindset into a dev team',
        body: 'Qualidade não é responsabilidade exclusiva do time de QA — ela precisa estar embutida em cada ação, cada commit.',
      },
      playbook: {
        tag: 'modelo · Value Playbook, cap. 15',
        title: 'Maturidade em Gestão de Valor',
        body: 'Modelo canônico em cinco estágios (fragmentado, estruturado, integrado, contínuo, incorporado), de autoria de Larissa Rosochansky — base da ferramenta Argos.',
      },
      honors: [
        ['Embaixadora Global para o Brasil', 'Women in Tech Network — Larissa Rosochansky'],
        ['Indicada ao prêmio "Women that Build"', 'Globant — Larissa Rosochansky'],
        ['Coordenação de trilha', 'TDC 2025, trilha de engenharia moderna — Rafael Navarro Cintra'],
      ],
    },
    quotesLabel: 'depoimentos',
    quotesTitle: ['Feedback'],
    cta: {
      title: 'Quer essa profundidade no seu evento?',
      body: 'Keynote, talk técnica, workshop ou mentoria de time — solo ou em dupla, em português e inglês.',
      button: '$ convidar →',
    },
  },
  en: {
    eyebrow: '// 10 · authority',
    title: ['Technical authority', 'is not a résumé. It is documented practice.'],
    lede:
      'Every claim on this page has a traceable origin: the public talk archive, the signed publications, and the careers of Rafael Navarro Cintra and Larissa Rosochansky.',
    archiveNote: 'Figures come from the public talk archive. History before 2019 is not in this repository.',
    stats: { talks: 'talks on file', intl: 'international', countries: 'countries', years: 'years' },
    peopleLabel: 'careers',
    peopleTitle: ['Two careers', 'built in the field.'],
    peopleNote: 'Professional tenures as stated in the official biographies.',
    stages: { title: 'Stages', meta: 'conferences by year', who: { Rafael: 'Rafael', Larissa: 'Larissa', both: 'Both' } },
    themesTitle: ['Themes', 'that back the authority.'],
    themes: [
      ['Built-in quality and engineering culture', 'Built-in Quality Mindset, automation, and the hidden cost of pushing testing to the end of the pipeline.'],
      ['Smart testing and coverage prioritisation', 'A two-axis framework: how much a test matters to the user and how realistic it is to automate.'],
      ['AI and the future of technical work', 'What stays human when AI writes the tests and the code.'],
      ['DevOps and continuous delivery', 'Beyond the pipeline: culture, ownership, and the end of the dev/ops split.'],
      ['Leadership, career and transformation', 'Technical ownership, lean digital transformation, and cognitive automation.'],
    ],
    publications: {
      title: ['Publications and', 'recognition.'],
      book: {
        tag: 'book',
        title: 'Qualidade antes do pipeline.',
        body: 'Fifteen years building test platforms and a quality culture, condensed into four chapters — no heroes, no manuals. By R. N. Cintra and L. Rosochansky.',
      },
      leaddev: {
        tag: 'article · LeadDev, Jan 2024',
        title: 'Instilling the built-in quality mindset into a dev team',
        body: 'Quality is not the QA team\u2019s sole responsibility — it must be embedded in every action, every commit.',
      },
      playbook: {
        tag: 'model · Value Playbook, ch. 15',
        title: 'Value Management Maturity',
        body: 'A canonical five-stage model (fragmented, structured, integrated, continuous, embedded) authored by Larissa Rosochansky — the basis of the Argos tool.',
      },
      honors: [
        ['Global Ambassador for Brazil', 'Women in Tech Network — Larissa Rosochansky'],
        ['"Women that Build" nominee', 'Globant — Larissa Rosochansky'],
        ['Track chair', 'TDC 2025, modern engineering track — Rafael Navarro Cintra'],
      ],
    },
    quotesLabel: 'testimonials',
    quotesTitle: ['Feedback'],
    cta: {
      title: 'Want this depth at your event?',
      body: 'Keynote, technical talk, workshop, or team mentoring — solo or as a duo, in Portuguese and English.',
      button: '$ invite us →',
    },
  },
}

const PEOPLE = [
  {
    key: 'rafael',
    name: 'Rafael Navarro Cintra',
    role: { pt: 'Principal Solutions Engineer, AppDev · Broadcom Software', en: 'Principal Solutions Engineer, AppDev · Broadcom Software' },
    uid: 'rafael.navarro.cintra',
    places: ['Santander Tecnologia', 'Broadcom Software'],
    focus: {
      pt: ['Industrialização do SDLC', 'Qualidade intrínseca', 'Plataformas de automação', 'DevOps'],
      en: ['SDLC industrialisation', 'Built-in quality', 'Automation platforms', 'DevOps'],
    },
    links: { linkedin: 'https://linkedin.com/in/rafaelncintra', medium: 'https://medium.com/@rafaelnc' },
  },
  {
    key: 'larissa',
    name: 'Larissa Rosochansky',
    role: { pt: 'Senior Global IT Leader · Mars', en: 'Senior Global IT Leader · Mars' },
    uid: 'larissa.rosochansky',
    places: ['IBM', 'Avanade', 'CI&T (18 anos)', 'Thoughtworks', 'Mars'],
    focus: {
      pt: ['Transformação digital lean', 'Engenharia ágil', 'Automação cognitiva', 'Women in Tech'],
      en: ['Lean digital transformation', 'Agile engineering', 'Cognitive automation', 'Women in Tech'],
    },
    links: { linkedin: 'https://linkedin.com/in/lrosocha' },
  },
]

const QUOTES = [
  {
    quote: 'Rafael e Larissa trazem um nível de profundidade técnica raro em palestras de qualidade — saem do clichê e entregam frameworks reais.',
    who: 'Coordenação de trilha',
    where: 'TDC Summit SP',
  },
  {
    quote: 'A keynote em dupla mudou a forma como nosso time pensa em qualidade. Três meses depois ainda revisitamos os princípios.',
    who: 'Engineering Manager',
    where: 'Empresa de pagamentos',
  },
  {
    quote: 'International speakers with a strong, opinionated voice on what modern test engineering actually looks like.',
    who: 'Programme Chair',
    where: 'TestBash',
  },
]

const SECTION_PAD = 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)'

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
          {title[0]}{title[1] && <><br /><span style={{ color: 'var(--fg-soft)' }}>{title[1]}</span></>}
        </h2>
      </div>
      {meta && (
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)' }}>
          {meta}
        </div>
      )}
    </div>
  )
}

export default function AuthorityPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'
  const c = COPY[lang]

  const stats = [
    { v: String(talks.length), k: c.stats.talks },
    { v: String(INTERNATIONAL), k: c.stats.intl },
    { v: String(COUNTRIES.length), k: c.stats.countries },
    { v: String(YEARS.length), k: c.stats.years },
  ]

  return (
    <div>
      {/* ─── Hero ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          {c.eyebrow}
        </div>
        <h1 style={{
          fontFamily: SANS, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1,
          fontWeight: 600, letterSpacing: '-0.035em', margin: '20px 0 0', color: 'var(--fg)', maxWidth: 900,
        }}>
          {c.title[0]}<br /><span style={{ color: 'var(--fg-soft)' }}>{c.title[1]}</span>
        </h1>
        <p style={{ fontFamily: SANS, fontSize: 17, lineHeight: 1.6, color: 'var(--fg-mid)', margin: '28px 0 0', maxWidth: 640 }}>
          {c.lede}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1, marginTop: 48, border: '1px solid var(--border)', background: 'var(--border)' }}>
          {stats.map((s) => (
            <div key={s.k} style={{ background: 'var(--surface)', padding: '24px 20px' }}>
              <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1 }}>
                {s.v}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginTop: 8 }}>
                {s.k}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-dim)', marginTop: 14 }}>
          {c.archiveNote}
        </div>
      </section>

      {/* ─── Trajetórias ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <SectionHead eyebrow={`// 10.1 · ${c.peopleLabel}`} title={c.peopleTitle} meta={c.peopleNote} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {PEOPLE.map((p) => (
            <div key={p.key} className="cell" style={{ padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, gap: 12 }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  {'>'} {p.key === 'rafael' ? 'engineer · qa platforms' : 'intl speaker · lean digital'}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)' }}>uid · {p.uid}</div>
              </div>
              <h3 style={{
                fontFamily: SANS, fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', lineHeight: 1.05,
                fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 8px', color: 'var(--fg)',
              }}>{p.name}</h3>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', marginBottom: 20 }}>
                {p.role[lang]}
              </div>

              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: 8 }}>
                {lang === 'pt' ? 'passagens' : 'tenures'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
                {p.places.map((pl) => (
                  <span key={pl} style={{
                    fontFamily: MONO, fontSize: 11, padding: '4px 9px',
                    border: '1px solid var(--border)', color: 'var(--fg-mid)',
                  }}>{pl}</span>
                ))}
              </div>

              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: 8 }}>
                {lang === 'pt' ? 'foco' : 'focus'}
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {p.focus[lang].map((f, i) => (
                  <li key={f} style={{
                    fontFamily: SANS, fontSize: 14, lineHeight: 1.5, color: 'var(--fg-mid)',
                    padding: '7px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border-soft)',
                    display: 'flex', gap: 10,
                  }}>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--accent)' }}>0{i + 1}</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: 16, marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
                <a href={p.links.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: 11, color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.06em' }}>
                  linkedin →
                </a>
                {p.links.medium && (
                  <a href={p.links.medium} target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', textDecoration: 'none', letterSpacing: '0.06em' }}>
                    medium →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Palcos ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <SectionHead
          eyebrow={`// 10.2 · ${c.stages.title.toLowerCase()}`}
          title={[c.stages.title + '.', `${talks.length} ${lang === 'pt' ? 'registros' : 'records'}`]}
          meta={`${COUNTRIES.join(' · ')}`}
        />
        <div style={{ border: '1px solid var(--border)' }}>
          {BY_YEAR.map(({ year, items }) => (
            <div key={year} style={{ display: 'grid', gridTemplateColumns: '88px 1fr', borderBottom: '1px solid var(--border)' }}>
              <div style={{
                padding: '18px 16px', borderRight: '1px solid var(--border)',
                fontFamily: MONO, fontSize: 13, color: 'var(--accent)', background: 'var(--surface)',
              }}>{year}</div>
              <div>
                {items.map((t) => (
                  <div key={t.slug} style={{
                    padding: '14px 18px', display: 'flex', justifyContent: 'space-between',
                    gap: 16, flexWrap: 'wrap', alignItems: 'baseline',
                    borderBottom: '1px solid var(--border-soft)',
                  }}>
                    <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: 'var(--fg)' }}>
                      {t.conference}
                    </div>
                    <div style={{ display: 'flex', gap: 14, fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)' }}>
                      <span>{t.location_en}</span>
                      <span style={{ color: 'var(--accent)' }}>
                        {t.speakers.length > 1 ? c.stages.who.both : t.speakers[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Temas ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <SectionHead eyebrow={`// 10.3 · ${lang === 'pt' ? 'temas' : 'themes'}`} title={c.themesTitle} meta={`${c.themes.length} ${lang === 'pt' ? 'eixos' : 'axes'}`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
          {c.themes.map(([title, body], i) => (
            <div key={title} style={{ background: 'var(--surface)', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--accent)', marginBottom: 12 }}>
                0{i + 1}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 10, lineHeight: 1.2 }}>
                {title}
              </div>
              <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-mid)', margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Publicações e reconhecimento ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <SectionHead
          eyebrow={`// 10.4 · ${lang === 'pt' ? 'publicações' : 'publications'}`}
          title={c.publications.title}
          meta="book · leaddev · value playbook"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {[c.publications.book, c.publications.leaddev, c.publications.playbook].map((pub) => (
            <div key={pub.title} className="cell" style={{ padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
                {pub.tag}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 19, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg)', lineHeight: 1.2, marginBottom: 12 }}>
                {pub.title}
              </div>
              <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-mid)', margin: 0 }}>
                {pub.body}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, border: '1px solid var(--border)' }}>
          {c.publications.honors.map(([title, who], i) => (
            <div key={title} style={{
              display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
              padding: '16px 20px', alignItems: 'baseline',
              borderTop: i === 0 ? 'none' : '1px solid var(--border)',
            }}>
              <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: 'var(--fg)' }}>{title}</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)' }}>{who}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Depoimentos ─── */}
      <section style={{ padding: SECTION_PAD, borderBottom: '1px solid var(--border)' }}>
        <SectionHead eyebrow={`// 10.5 · ${c.quotesLabel}`} title={c.quotesTitle} meta={`${QUOTES.length} ${lang === 'pt' ? 'citações' : 'quotes'}`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {QUOTES.map((q) => (
            <blockquote key={q.who + q.where} style={{
              margin: 0, padding: '28px 24px', borderLeft: '2px solid var(--accent)',
              background: 'var(--surface)',
            }}>
              <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.5, color: 'var(--fg)', margin: '0 0 16px', letterSpacing: '-0.01em' }}>
                {q.quote}
              </p>
              <cite style={{ fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', fontStyle: 'normal' }}>
                {q.who} · {q.where}
              </cite>
            </blockquote>
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
