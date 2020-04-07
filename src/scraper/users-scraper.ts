import { client } from './client'
import { searchUsersQuery, SearchUsersQueryResponse } from './queries/search-users'
import { logRateLimit } from './utils/log-rate-limit'
import { User } from '../db/models/User'

const userLocations = ['location:"Dominican"']

const searchUsers = async (
  query: string,
  after: string | undefined,
  fn: (results: SearchUsersQueryResponse) => Promise<void>
): Promise<void> => {
  console.debug(`Searching users:`, { query, after })
  const results = await client.request<SearchUsersQueryResponse>(searchUsersQuery, {
    query,
    after,
  })

  await fn(results)
  logRateLimit(results)

  if (results.search.pageInfo.hasNextPage) {
    await searchUsers(query, results.search.pageInfo.endCursor, fn)
  }
}

export const createOrUpdateUsers = async (users: Partial<User>[]): Promise<void> => {
  await Promise.all(
    users.map(async (user) => {
      const whereQuery = { where: { originalId: user.originalId ?? null } }
      const existingUser = await User.findOne(whereQuery)

      if (existingUser) {
        await User.update(user, whereQuery)
        console.debug(`Updated user: ${user.login}`)
      } else {
        await User.create(user)
        console.debug(`Created user: ${user.login}`)
      }
    })
  )
}

export const scrapeUsers = async (): Promise<void> => {
  const now = new Date()
  for (const userLocation of userLocations) {
    await searchUsers(userLocation, undefined, async (results) => {
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
      await createOrUpdateUsers(users)
    })
  }
}
