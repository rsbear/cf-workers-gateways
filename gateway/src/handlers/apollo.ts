import { loadSchema } from '@graphql-tools/load'
import { UrlLoader } from '@graphql-tools/url-loader'

import { ApolloServer } from 'apollo-server-cloudflare'
import { graphqlCloudflare } from 'apollo-server-cloudflare/dist/cloudflareApollo'

const FAUNA_TOKEN = 'faunatokenhere'

const load = async () => {
  const schema = await loadSchema('https://graphql.fauna.com/graphql', {
    loaders: [new UrlLoader()],
    headers: {
      Authorization: `Bearer ${FAUNA_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    fetch,
  })
  return schema
}

const apollo = async (request, graphQLOptions) => {
  const schema = await load()

  const server = new ApolloServer({
    schema,
    ...(graphQLOptions.kvCache ? {} : {}),
  })
  return graphqlCloudflare(() => server.createGraphQLServerOptions(request))(
    request,
  )
}

export default apollo
