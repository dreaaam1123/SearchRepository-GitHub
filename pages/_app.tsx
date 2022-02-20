import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { useEffect } from 'react'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../pages/theme'
import Layout from '../components/Layout'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        search: {
          keyArgs: false,
          merge(existing, incoming) {
            if (!incoming || !incoming.nodes) return existing
            if (!existing || !existing.nodes) return incoming

            return { ...incoming, nodes: [...existing.nodes, ...incoming.nodes] }
          },
        },
      },
    },
  },
})
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GITHUB_GRAPHQL_URL,
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
  cache,
})

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </Layout>
  )
}

export default MyApp
