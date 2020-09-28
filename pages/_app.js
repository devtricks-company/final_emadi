import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import '../styles/global.css';
import '../node_modules/libj-iransans/index.css';
import {AnimatePresence} from 'framer-motion';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <AnimatePresence exitBeforeEnter><Component {...pageProps} /></AnimatePresence>
    </ApolloProvider>
  )
}
