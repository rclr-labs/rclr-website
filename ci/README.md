# Pipeline no Orbe

O CI deste repositório roda no [Orbe](https://github.com/rclr-labs/orbe), não no
GitHub Actions.

## Por que `memoria_max_mb: -1`

É o único limite de recurso desativado aqui, e vale explicar antes que alguém
o "conserte":

O padrão do Orbe é `RLIMIT_AS` de 4 GB. O cage de endereços do V8 reserva
**~1 TB de espaço virtual** — com qualquer `ulimit -v`, instanciar WASM falha
com `Out of memory`. Medido na VM e registrado em `deploy/README.md` do orbe:
`ulimit -v 8388608` + `new WebAssembly.Memory` falha; sem o limite, passa.

Ou seja: o limite de 4 GB não é uma proteção que funciona — é uma **reprovação
garantida**. Não é um limite trocado por velocidade; é um limite que a runtime
torna inaplicável.

**Os outros limites continuam valendo**, e isso é deliberado — é a convenção do
próprio Orbe em `deploy/pipelines/ludus.json`:

| limite | valor | por quê |
|---|---|---|
| `memoria_max_mb` | `-1` | incompatível com o cage do V8 (acima) |
| `processos_max` | 1024 | fork bomb continua contida |
| `descritores_max` | 4096 | vazamento de descritor continua contido |
| `timeout_seg` | finito em todo job | é o que de fato protege a VM |

O que protege a máquina não é o limite de memória: é o **timeout**, a **quota
por tenant** (jobs serializados) e o fato de as jobs **não rodarem como root**.

## Por que `rede: liberada`

`npm ci` baixa. O Orbe nega rede por padrão no backend de namespaces, e um job
que precisa dela e não declara falha de um jeito que **parece erro de build** —
o erro apareceria no lugar errado.

## Por que cada `paths`

No Orbe, `paths` não é filtro de gatilho: é **o que entra no workspace
esparso**. Um arquivo lido pelo job e não declarado não existe lá dentro; um
arquivo declarado que não existe na árvore é um job que **nunca dispara** — e
isso não falha nem avisa.
