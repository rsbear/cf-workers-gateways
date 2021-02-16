import fetch from 'node-fetch'

import setCors from './utils/setCors'
import playground from './handlers/playground'
import apollo from './handlers/apollo'

const graphQLOptions = {
  // Set the path for the GraphQL server
  baseEndpoint: '/',
  playgroundEndpoint: '/playground',
  // When a request's path isn't matched, forward it to the origin
  forwardUnmatchedRequestsToOrigin: false,
  // Enable debug mode to return script errors directly in browser
  debug: false,
  // Enable CORS headers on GraphQL requests
  // Set to `true` for defaults (see `utils/setCors`),
  // or pass an object to configure each header
  cors: false,
  // cors: {
  //   allowCredentials: 'true',
  //   allowHeaders: 'Content-type',
  //   allowOrigin: '*',
  //   allowMethods: 'GET, POST, PUT',
  // },

  // Enable KV caching for external REST data source requests
  // Note that you'll need to add a KV namespace called
  // WORKERS_GRAPHQL_CACHE in your wrangler.toml file for this to
  // work! See the project README for more information.
  kvCache: false,
}

const handleRequest: any = async (request) => {
  const url = new URL(request.url)
  try {
    if (url.pathname === graphQLOptions.baseEndpoint) {
      const response =
        request.method === 'OPTIONS'
          ? new Response('', { status: 204 })
          : await apollo(request, graphQLOptions)
      if (graphQLOptions.cors) {
        setCors(response, graphQLOptions.cors)
      }
      return response
    } else if (
      graphQLOptions.playgroundEndpoint &&
      url.pathname === graphQLOptions.playgroundEndpoint
    ) {
      return playground(request, graphQLOptions)
    } else if (graphQLOptions.forwardUnmatchedRequestsToOrigin) {
      return fetch(request)
    } else {
      return new Response('Not found', { status: 404 })
    }
  } catch (err) {
    return new Response(graphQLOptions.debug ? err : 'Something went wrong', {
      status: 500,
    })
  }
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})