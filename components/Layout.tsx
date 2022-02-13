import { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>GitHub Issues Viewer</title>
      </Head>
      <header>ヘッダ</header>
      <main>{children}</main>
    </>
  )
}
