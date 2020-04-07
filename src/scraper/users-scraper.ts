import { client } from './client'
import { searchUsersQuery, SearchUsersQueryResponse } from './queries/search-users'
import { logRateLimit } from './utils/log-rate-limit'
import { User } from '../db/models/User'

const userLocations = ['location:"Dominican"']

export const usersScraper = {
  async scrapeAll(): Promise<void> {
    const now = new Date()
    for (const userLocation of userLocations) {
      await usersScraper.scrape(userLocation, undefined, async (results) => {
        const users = results.search.nodes.map<Partial<User>>((node) => {
          return {
            originalId: node.id,
            login: node.login,
            name: node.name,
            type: node.__typename,
            url: node.websiteUrl,
            avatarUrl: node.avatarUrl,
            company: node.company,
            location: node.location,
            createdAt: new Date(node.createdAt),
            scrapedAt: now,
            followers: node.followers?.total ?? 0,
            following: node.following?.total ?? 0,
          }
        })
        console.log({ users })
        await User.bulkCreate(users)
      })
    }
  },
  async scrape(
    query: string,
    after: string | undefined,
    fn: (results: SearchUsersQueryResponse) => Promise<void>
  ): Promise<void> {
    console.debug(`Scraping users:`, { query, after })
    const results = await client.request<SearchUsersQueryResponse>(searchUsersQuery, {
      query,
      after,
    })

    await fn(results)
    logRateLimit(results)

    if (results.search.pageInfo.hasNextPage) {
      await usersScraper.scrape(query, results.search.pageInfo.endCursor, fn)
    }
  },
}
