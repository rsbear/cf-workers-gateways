import { GraphQLClient } from 'graphql-request'
import { vars } from './vars'

const client = new GraphQLClient(vars.ENDPOINT)

const FAUNA_TOKEN = 'enterfaunatokenhere'

client.setHeaders({
  Authorization: `Bearer ${FAUNA_TOKEN}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
})

export default client
