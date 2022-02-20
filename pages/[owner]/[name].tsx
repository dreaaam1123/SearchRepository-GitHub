import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Button, Box, List, ListItem, ListItemText } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { GET_ISSUES_QUERY, IssuesData } from '../../graphql/issues-query'

function issuesList(data: IssuesData): JSX.Element | null {
  const { repository } = data
  const { issues } = repository
  if (!data || !data.repository || !data.repository.issues || !data.repository.issues.nodes)
    return null

  if (data.repository.issues.totalCount === 0) return <span>none</span>

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: 800,
        bgcolor: 'background.paper',
        overflow: 'auto',
        border: '1px solid grey',
        marginTop: '10px',
      }}
    >
      <List>
        {issues.nodes.map((item: any) => (
          <ListItem key={item.id} divider={true} dense>
            <ListItemText primary={item.title} secondary={item.state} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

const IssuesListPage: NextPage = () => {
  const router = useRouter()
  const owner = router.query.owner
  const name = router.query.name

  const { loading, error, data } = useQuery<IssuesData>(GET_ISSUES_QUERY, {
    variables: {
      name_of_repos: name,
      owner_of_repos: owner,
      number_of_repos: 10,
    },
  })

  return (
    <div className={styles.container}>
      <Link href='/' passHref>
        <Button variant='contained'>レポジトリ検索へ戻る</Button>
      </Link>
      <h3>
        Latest Issues - {owner}/{name}
      </h3>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: {JSON.stringify(error)}</p> : null}
      {data ? issuesList(data) : null}
    </div>
  )
}

export default IssuesListPage
