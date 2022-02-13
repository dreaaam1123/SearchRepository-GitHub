import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from '@material-ui/core'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      TODO: レポジトリ検索
      <Button variant='contained' onClick={() => getApi()}>
        API叩く
      </Button>
    </div>
  )
}

const getApi = async () => {
  const token = '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'
  // const res = await fetch('https://api.github.com/graphql')
  const res = await fetch(
    'https://api.github.com/graphql?"query": "query {repository(name: "Hello-World")}"',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      // query: '"query": "query {repository(name: "Hello-World")}"',

      // body: JSON.stringify({
      //   ...data,
      // }),
    },
  )
  // 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
  const json = await res.json()
  // const topArticles = topJson?.articles;

  return {
    props: {
      json,
    },
  }
}

export default Home
