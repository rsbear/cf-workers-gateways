import { playgroundHtml } from './../lib/playgroundHtml'

const headers = { 'Content-Type': 'text/html' }
const playground = (request, { baseEndpoint }) =>
  new Response(playgroundHtml(baseEndpoint), { headers })

export default playground
