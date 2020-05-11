import { client } from './client'
import { searchUsersQuery, SearchUsersQueryResponse } from './queries/search-users'
import { logRateLimit } from './utils/log-rate-limit'
import { User } from '../db/models/User'
import { config } from '../config'
import { createDebug } from '../utils/debug'

const debug = createDebug(__filename)

const searchUsers = async (
  query: string,
  after: string | undefined,
  fn: (results: SearchUsersQueryResponse) => Promise<void>
): Promise<void> => {
  debug(`Searching users:`, { query, after })

  const results = await client.request<SearchUsersQueryResponse>(searchUsersQuery, {
    query,
    after,
  })

  logRateLimit(results)
  await fn(results)

  if (results.search.pageInfo.hasNextPage) {
    await searchUsers(query, results.search.pageInfo.endCursor, fn)
  }
}

const createOrUpdateUsers = async (users: Partial<User>[]): Promise<void> => {
  await Promise.all(
    users.map(async (user) => {
      const whereQuery = { where: { originalId: user.originalId ?? null } }
      const existingUser = await User.findOne(whereQuery)

      if (existingUser) {
        await User.update(user, whereQuery)
        debug(`Updated user: ${user.login}`)
      } else {
        await User.create(user)
        debug(`Created user: ${user.login}`)
      }
    })
  )
}

const toUser = (node: SearchUsersQueryResponse['search']['nodes'][number]): Partial<User> => {
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
    followers: node.followers?.total ?? 0,
    following: node.following?.total ?? 0,
  }
}

export const scrapeUsers = async (): Promise<void> => {
  const now = new Date()

  // Scrape users by loations.
  for (const location of config.locations) {
    await searchUsers(`location:"${location}"`, undefined, async (results) => {
      const users = results.search.nodes.map<Partial<User>>((node) => ({
        ...toUser(node),
        scrapedAt: now,
      }))
      await createOrUpdateUsers(users)
    })
  }

  // Scrape users manually specified.
  const manualUsersQuery = config.users.includes.map((login) => `user:${login}`).join(' ')
  await searchUsers(manualUsersQuery, undefined, async (results) => {
    const users = results.search.nodes.map<Partial<User>>((node) => ({
      ...toUser(node),
      scrapedAt: now,
    }))
    await createOrUpdateUsers(users)
  })
}
