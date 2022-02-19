import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES_QUERY, RepositoriesData } from '../graphql/repositories-query'

const Home: NextPage = () => {
  const { loading, error, data } = useQuery<RepositoriesData>(GET_REPOSITORIES_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>
  if (!data || !data.search || !data.search.nodes) return null

  return (
    <div className={styles.container}>
      TODO: レポジトリ検索
      {data?.search?.nodes.map((item) => (
        <div key={item.id}>
          【{item.nameWithOwner}】
          <br />
          {item.description}
        </div>
      ))}
      <Button variant='contained' onClick={() => {}}>
        Show more
      </Button>
    </div>
  )
}

export default Home
