/**
 * Estatísticas de palestra — FONTE ÚNICA.
 *
 * Tudo aqui é derivado de `talks.json` (gerado por `scripts/build-content.js` a
 * partir de `content/talks/*.md`). Nenhum número é digitado à mão.
 *
 * Isso existe porque o site já afirmou "70+ palestras / 12 países" no hero e
 * "30+ palcos / 8 países" no About enquanto o arquivo tinha 17 palestras e 5
 * países. Qualquer número novo de palestra deve sair daqui, não do texto.
 */
import talks from './talks.json'

/**
 * `location_en` é texto livre ("São Paulo, Brazil", "UK / Online"). A contagem
 * de países só considera o que é país de verdade — "Global" e "Online / Global"
 * não entram.
 */
const COUNTRY_RULES = [
  ['Brazil', 'Brasil'],
  ['Spain', 'Espanha'],
  ['United Kingdom', 'Reino Unido'],
  ['UK', 'Reino Unido'],
  ['Germany', 'Alemanha'],
  ['United States', 'Estados Unidos'],
]

const countryOf = (talk) => {
  const loc = talk.location_en || ''
  const rule = COUNTRY_RULES.find(([needle]) => loc.includes(needle))
  return rule ? rule[1] : null
}

const uniq = (list) => [...new Set(list)]

export const TOTAL = talks.length
export const INTERNATIONAL = talks.filter((t) => t.international).length
export const COUNTRIES = uniq(talks.map(countryOf).filter(Boolean)).sort()
export const YEARS = uniq(talks.map((t) => t.year)).sort()
export const FIRST_YEAR = YEARS[0]
export const LAST_YEAR = YEARS[YEARS.length - 1]
export const IN_DUO = talks.filter((t) => t.speakers.length > 1).length

/** Estatísticas de uma pessoa, a partir do campo `speakers` do arquivo. */
export function bySpeaker(name) {
  const mine = talks.filter((t) => t.speakers.includes(name))
  const years = uniq(mine.map((t) => t.year)).sort()
  return {
    talks: mine.length,
    international: mine.filter((t) => t.international).length,
    countries: uniq(mine.map(countryOf).filter(Boolean)).sort(),
    conferences: uniq(mine.map((t) => t.conference)).length,
    firstYear: years[0],
    lastYear: years[years.length - 1],
  }
}

export default {
  TOTAL,
  INTERNATIONAL,
  COUNTRIES,
  YEARS,
  FIRST_YEAR,
  LAST_YEAR,
  IN_DUO,
  bySpeaker,
}
