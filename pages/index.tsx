import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { TextField, Button, Box, List, ListItem, ListItemText } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES_QUERY, RepositoriesData, PageInfo } from '../graphql/repositories-query'

function repositoriesList(data: RepositoriesData, fetchMore: any): JSX.Element | null {
  const { search } = data
  if (!data || !data.search || !data.search.nodes || data.search.repositoryCount === 0) return null

  return (
    <Box
      sx={{
        width: '100%',
        height: 600,
        maxWidth: 800,
        bgcolor: 'background.paper',
        overflow: 'auto',
        border: '1px solid grey',
        marginTop: '10px',
      }}
    >
      <List>
        {search.nodes.map((item: any) => (
          <Link href={`/${item.nameWithOwner}`} key={item.id} passHref>
            <ListItem divider={true} dense button={true}>
              <ListItemText primary={item.nameWithOwner} secondary={item.description} />
            </ListItem>
          </Link>
        ))}
        {showMoreButton(search.pageInfo, fetchMore)}
      </List>
    </Box>
  )
}

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

  return (
    <div className={styles.container}>
      <TextField
        label='repository name'
        size='small'
        value={searchName}
        onChange={(e) => setState(e.currentTarget.value)}
      />
      <Button variant='contained' onClick={searchGitHub}>
        Search
      </Button>
      {!!data ? repositoriesList(data, fetchMore) : null}
    </div>
  )
}

export default Home
