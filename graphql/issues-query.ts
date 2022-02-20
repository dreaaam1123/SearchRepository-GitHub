import { gql } from '@apollo/client'

export const GET_ISSUES_QUERY = gql`
  query ($number_of_repos: Int!, $name_of_repos: String!, $owner_of_repos: String!) {
    repository(name: $name_of_repos, owner: $owner_of_repos) {
      id
      issues(last: $number_of_repos) {
        nodes {
          id
          title
          state
          url
          createdAt
          updatedAt
        }
        totalCount
      }
    }
  }
`

export interface IssuesData {
  repository: { id: string; issues: { nodes: Issue[]; totalCount: number } }
}

interface Issue {
  id: string
  title: string
  state: string
  url: string
  createdAt: string
  updatedAt: string
}
