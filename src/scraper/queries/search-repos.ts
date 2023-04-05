import { RateLimit } from '../utils/log-rate-limit'

export const searchReposQuery = `
query searchRepos($query: String!, $after: String) {
  search(type: REPOSITORY, query: $query, first: 100, after: $after) {
    total: repositoryCount
    nodes {
      ... on Repository {
        __typename
        id
        name: nameWithOwner
        description
        homepageUrl
        url
        languages(first: 100) {
          totalCount
          nodes {
            name
          }
        }
        stargazers {
          total: totalCount
        }
        watchers {
          total: totalCount
        }
        forks {
          total: totalCount
        }
        createdAt
        isPrivate
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  rateLimit {
    limit
    remaining
    cost
    resetAt
  }
}`

export type SearchReposQueryResponse = {
  search: {
    total: number
    nodes: {
      __typename: 'Repository'
      id: string
      name: string
      description: string
      homepageUrl: string
      url: string
      languages?: {
        total: number
        nodes?: {
          name: string
        }[]
      }
      stargazers?: {
        total: number
      }
      watchers?: {
        total: number
      }
      forks?: {
        total: number
      }
      createdAt: string
      isPrivate: boolean
    }[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
  }
  rateLimit: RateLimit
}
