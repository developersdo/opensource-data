import { GraphQLClient } from 'graphql-request'
import 'cross-fetch/polyfill' // https://github.com/prisma-labs/graphql-request/issues/206#issuecomment-693304073

export const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `bearer ${process.env.OSD_GH_TOKEN}`,
  },
  method: 'POST',
})
