import { gql } from '@apollo/client'

export const GET_REPOSITORIES_QUERY = gql`
  query ($number_of_repos: Int!, $name_of_repos: String!) {
    search(type: REPOSITORY, query: $name_of_repos, last: $number_of_repos) {
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
