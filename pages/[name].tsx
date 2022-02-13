import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Button } from '@material-ui/core'

const IssuesList: NextPage = () => {
  const router = useRouter()
  const name = router.query.name

  return (
    <div className={styles.container}>
      <h3>repository name:{name}</h3>
      <Button variant='contained'>レポジトリ検索へ戻る</Button>
      <div>TODO:issueの一覧</div>
    </div>
  )
}

export default IssuesList
