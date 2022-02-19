import { gql } from '@apollo/client'

export const GET_REPOSITORIES_QUERY = gql`
  {
    search(type: REPOSITORY, query: "jquery in:name", last: 10) {
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
    }
  }
`

export interface RepositoriesData {
  search: { nodes: any[]; repositoryCount: number }
}
