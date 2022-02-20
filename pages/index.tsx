import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Button } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES_QUERY, RepositoriesData, PageInfo } from '../graphql/repositories-query'

function showMoreButton(pageInfo: PageInfo, fetchMore: any): JSX.Element | null {
  if (!pageInfo.hasNextPage) {
    // これ以上読み込みがない場合はボタン非表示
    return null
  }

  const showMore = () => {
    fetchMore({
      variables: { cursor: pageInfo.endCursor },
    })
  }

  return (
    <Button variant='contained' onClick={showMore}>
      Show more
    </Button>
  )
}

const Home: NextPage = () => {
  const [searchName, setState] = useState('')
  const { loading, error, data, refetch, fetchMore } = useQuery<RepositoriesData>(
    GET_REPOSITORIES_QUERY,
    {
      variables: {
        name_of_repos: '',
        number_of_repos: 10,
      },
    },
  )

  const searchGitHub = () => {
    refetch({ name_of_repos: `${searchName} in:name` })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>
  if (!data || !data.search || !data.search.nodes || data.search.repositoryCount === 0)
    return (
      <div className={styles.container}>
        <input type='text' value={searchName} onChange={(e) => setState(e.currentTarget.value)} />
        <Button variant='contained' onClick={searchGitHub}>
          Search
        </Button>
      </div>
    )
  const { search } = data
  const { pageInfo } = search

  return (
    <div className={styles.container}>
      <input type='text' value={searchName} onChange={(e) => setState(e.currentTarget.value)} />
      <Button variant='contained' onClick={searchGitHub}>
        Search
      </Button>
      {search.nodes.map((item) => (
        <div key={item.id}>
          【{item.nameWithOwner}】
          <br />
          {item.description}
        </div>
      ))}
      {showMoreButton(pageInfo, fetchMore)}
    </div>
  )
}

export default Home
