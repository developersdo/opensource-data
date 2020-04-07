import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `bearer ${process.env.GH_TOKEN}`,
  },
  method: 'POST',
})
