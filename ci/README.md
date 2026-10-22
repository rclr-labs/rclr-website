# ci — o pipeline do rclr-website no Orbe

Um job, `build`, que roda `npm ci && npm run build` — o mesmo que o workflow do
GitHub Actions faz, e nada além. O job de lint que eu havia acrescentado na
migração saiu em #3: migração traduz, não acrescenta requisito. Os 15 erros de
eslint ficaram registrados na issue #4.

## O escopo do `build`, e por que ele é maior do que parece

`paths` é o que entra no workspace esparso do Orbe. O job só vê o que está
declarado — e o build do Vite lê **mais do que `src/`**.

O escopo nasceu com `src/**, scripts/**, content/**, package.json,
package-lock.json, vite.config.js`. Faltavam cinco arquivos, e cada ausência
tinha um sintoma diferente:

| falta | sintoma |
|---|---|
| `index.html` | `[UNRESOLVED_ENTRY] Cannot resolve entry module index.html` — falha óbvia |
| `postcss.config.js` + `tailwind.config.js` | **build VERDE**, CSS de 2.105 bytes em vez de 9.256 — site sem estilo |
| `public/**` | `admin.html`, `favicon.svg`, `icons.svg`, `.assetsignore` não vão para o `dist` |
| `wrangler.jsonc` | **build VERDE**, e o `wrangler.json` gerado perde `nodejs_compat` e `not_found_handling: single-page-application` — o roteamento client-side da SPA para de funcionar |

As três últimas são o problema de verdade: **o job passa e o artefato está
errado**. Uma falha avisa; um artefato errado viaja.

## Como o escopo foi verificado

Não por leitura. Buildando a árvore inteira, buildando o escopo declarado, e
comparando o `dist` dos dois por md5, arquivo por arquivo:

```sh
diff <(cd cheio/dist  && find . -type f | sort | xargs md5 -r | sort) \
     <(cd esparso/dist && find . -type f | sort | xargs md5 -r | sort)
```

Com o escopo corrigido: **idêntico**, menos os campos `configPath` e
`userConfigPath` do `wrangler.json`, que carregam caminho absoluto e portanto
dependem de onde o build rodou.

Foi essa comparação que encontrou o `wrangler.jsonc` — o build passava, o `dist`
tinha todos os arquivos com os nomes certos, e **um deles tinha conteúdo
diferente**. Nenhuma leitura de `paths` pegaria isso.

Vale como método para qualquer job de build no Orbe: o teste não é "o job
passa", é "o artefato bate".
