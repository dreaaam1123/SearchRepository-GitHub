import { gql } from '@apollo/client'

export const GET_REPOSITORIES_QUERY = gql`
  query ($number_of_repos: Int!, $name_of_repos: String!, $cursor: String) {
    search(type: REPOSITORY, query: $name_of_repos, first: $number_of_repos, after: $cursor) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          url
          name
          nameWithOwner
          description
          createdAt
          updatedAt
          stargazerCount
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export interface RepositoriesData {
  search: { nodes: Repository[]; repositoryCount: number; pageInfo: PageInfo }
}

interface Repository {
  id: string
  url: string
  name: string
  nameWithOwner: string
  description: string
  createdAt: string
  updatedAt: string
  stargazerCount: number
}

export interface PageInfo {
  hasNextPage: boolean
  endCursor: string
}
