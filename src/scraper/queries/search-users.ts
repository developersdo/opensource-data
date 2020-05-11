import { RateLimit } from '../utils/log-rate-limit'

export const searchUsersQuery = `
query searchUsers($query: String!, $after: String) {
  search(type: USER, query: $query, first: 100, after: $after) {
    total: userCount
    nodes {
      __typename
      ... on User {
        id
        login
        name
        websiteUrl
        avatarUrl
        company
        location
        createdAt
        followers {
          total: totalCount
        }
        following {
          total: totalCount
        }
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

export type SearchUsersQueryResponse = {
  search: {
    total: number
    nodes: [
      {
        __typename: 'User' | 'Organization'
        id: string
        login: string
        name: string
        websiteUrl: string
        avatarUrl: string
        company: string
        location: string
        createdAt: string
        followers?: {
          total: number
        }
        following?: {
          total: number
        }
      }
    ]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
  }
  rateLimit: RateLimit
}
