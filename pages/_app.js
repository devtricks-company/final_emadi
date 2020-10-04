import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import '../styles/global.css';
import '../node_modules/libj-iransans/index.css';
import '../node_modules/aos/dist/aos.css';
import {AnimatePresence, motion} from 'framer-motion';

export default function App({ Component, pageProps,router }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      
     <motion.div key={router.route}  initial="pageInitial" animate="pageAnimate" variants={{
       pageInitial:{
         opacity:0
       },
       pageAnimate:{
         opacity: 1,
         transition:{
           duration:1
         }
       },
       
     }}> <Component {...pageProps} /> </motion.div>
   
    </ApolloProvider>
  )
}
