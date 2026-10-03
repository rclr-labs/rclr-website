/**
 * rclr-apex-redirect
 *
 * O apex `rclr.com.br` é alias do site em `www.rclr.com.br`. Em vez de servir
 * o mesmo conteúdo nos dois hostnames (duplicação), este Worker responde todo
 * request no apex com um 301 para o canônico, preservando path, query e — pelo
 * próprio comportamento do browser ao seguir o 301 — o fragmento.
 *
 * Fica separado do Worker do site de propósito: assim o site continua sendo um
 * deployment só de assets estáticos, sem lógica de runtime no caminho crítico.
 *
 * Deploy: `cd apex-redirect && wrangler deploy`
 * Domínio: custom domain `rclr.com.br` (Workers & Pages → rclr-apex-redirect)
 */

const CANONICAL_HOST = 'www.rclr.com.br'

export default {
  fetch(request) {
    const url = new URL(request.url)
    url.protocol = 'https:'
    url.hostname = CANONICAL_HOST
    url.port = ''
    return Response.redirect(url.toString(), 301)
  },
}
