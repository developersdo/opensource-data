import { ClientError, GraphQLClient } from 'graphql-request'
import 'cross-fetch/polyfill' // https://github.com/prisma-labs/graphql-request/issues/206#issuecomment-693304073
import { sleep } from './utils/sleep'

const graphqlClient = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `bearer ${process.env.OSD_GH_TOKEN}`,
  },
  method: 'POST',
})

// Delays for retrying after a secondary rate limit hit: 1min, 2min, 5min.
const SECONDARY_RATE_LIMIT_RETRY_DELAYS_MS = [60_000, 120_000, 300_000]

// Space requests 1 second apart to stay within GitHub's secondary rate limits.
const REQUEST_INTERVAL_MS = 1_000

export const client = {
  async request<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    for (let attempt = 0; attempt <= SECONDARY_RATE_LIMIT_RETRY_DELAYS_MS.length; attempt++) {
      try {
        const result = await graphqlClient.request<T>(query, variables)
        await sleep(REQUEST_INTERVAL_MS)
        return result
      } catch (error) {
        const isSecondaryRateLimit =
          error instanceof ClientError &&
          error.response.status === 403 &&
          JSON.stringify(error.response).toLowerCase().includes('secondary rate limit')

        if (isSecondaryRateLimit && attempt < SECONDARY_RATE_LIMIT_RETRY_DELAYS_MS.length) {
          const delay = SECONDARY_RATE_LIMIT_RETRY_DELAYS_MS[attempt]
          console.log(
            `Secondary rate limit hit. Retrying in ${delay / 1000}s (attempt ${attempt + 1}/${SECONDARY_RATE_LIMIT_RETRY_DELAYS_MS.length})...`
          )
          await sleep(delay)
          continue
        }

        throw error
      }
    }

    throw new Error('Exceeded maximum retries after secondary rate limit.')
  },
}
