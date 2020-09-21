import { GraphQLClient } from 'graphql-request'
import 'cross-fetch/polyfill'

export const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `bearer ${process.env.OSD_GH_TOKEN}`,
  },
  method: 'POST',
})
