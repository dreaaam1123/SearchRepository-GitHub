import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Button } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES_QUERY, RepositoriesData } from '../graphql/repositories-query'

const Home: NextPage = () => {
  const [searchName, setState] = useState('')
  const { loading, error, data, refetch } = useQuery<RepositoriesData>(GET_REPOSITORIES_QUERY, {
    variables: {
      name_of_repos: ``,
      number_of_repos: 10,
    },
  })

  const search = () => {
    refetch({ name_of_repos: `${searchName} in:name` })
  }

  const showMore = () => {
    // TODO：showMore
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>
  if (!data || !data.search || !data.search.nodes || data.search.repositoryCount === 0)
    return (
      <div className={styles.container}>
        <input type='text' value={searchName} onChange={(e) => setState(e.currentTarget.value)} />
        <Button variant='contained' onClick={search}>
          Search
        </Button>
      </div>
    )

  return (
    <div className={styles.container}>
      <input type='text' value={searchName} onChange={(e) => setState(e.currentTarget.value)} />
      <Button variant='contained' onClick={search}>
        Search
      </Button>
      {data?.search?.nodes.map((item) => (
        <div key={item.id}>
          【{item.nameWithOwner}】
          <br />
          {item.description}
        </div>
      ))}
      <Button
        variant='contained'
        onClick={() => {
          showMore
        }}
      >
        Show more
      </Button>
    </div>
  )
}

export default Home
