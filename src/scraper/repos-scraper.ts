import { chunk } from 'lodash'

import { client } from './client'
import { logRateLimit } from './utils/log-rate-limit'
import { Repo } from '../db/models/Repo'
import { searchReposQuery, SearchReposQueryResponse } from './queries/search-repos'
import { User } from '../db/models/User'
import { createDebug } from '../utils/debug'

const debug = createDebug(__filename)

const createOrUpdateRepos = async (repos: Partial<Repo>[]): Promise<void> => {
  await Promise.all(
    repos.map(async (repo) => {
      const whereQuery = { where: { originalId: repo.originalId ?? null } }
      const existingRepo = await Repo.findOne(whereQuery)

      if (existingRepo) {
        await Repo.update(repo, whereQuery)
        debug(`Updated repo: ${repo.name}`)
      } else {
        await Repo.create(repo)
        debug(`Created repo: ${repo.name}`)
      }
    })
  )
}

const searchReposFromUsers = async (
  users: string[],
  after: string | undefined,
  fn: (results: SearchReposQueryResponse) => Promise<void>
): Promise<void> => {
  debug('Scrape repos for users:', users)

  const query = users.map((user) => `user:${user}`).join(' ')
  const results = await client.request<SearchReposQueryResponse>(searchReposQuery, {
    query,
    after,
  })

  await fn(results)
  logRateLimit(results)

  if (results.search.pageInfo.hasNextPage) {
    await searchReposFromUsers(users, results.search.pageInfo.endCursor, fn)
  }
}

export const scrapeRepos = async (): Promise<void> => {
  const now = new Date()
  const logins = (await User.findAll()).map((user) => user.login)
  const loginsChunks = chunk(logins.filter(Boolean), 50)

  for (const loginsChunk of loginsChunks) {
    await searchReposFromUsers(loginsChunk, undefined, async (results) => {
      const repos = results.search.nodes.map<Partial<Repo>>((node) => {
        return {
          originalId: node.id,
          name: node.name,
          description: node.description,
          homepageUrl: node.homepageUrl,
          url: node.url,
          languages: node.languages?.nodes
            ?.filter(Boolean)
            .map((node) => node.name.toLowerCase())
            .join(' '),
          stargazers: node.stargazers?.total ?? 0,
          watchers: node.watchers?.total ?? 0,
          forks: node.forks?.total ?? 0,
          createdAt: new Date(node.createdAt),
          scrapedAt: now,
        }
      })
      await createOrUpdateRepos(repos)
    })
  }
}
