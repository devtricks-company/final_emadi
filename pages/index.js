import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from '../components/PostList'
import { initializeApollo } from '../lib/apolloClient'
import Navbar , {GET_SITE_TITLE} from '../components/navbar/Navbar'
import HomeHeader , {HOME_HEADER} from '../components/HomeHeader/HomeHeader'
import {motion} from 'framer-motion'
import BetterPost ,{GET_BETTER_POST} from '../components/betterPost/BetterPost'
import SliderPost ,{GET_SLIDER_POST} from '../components/sliderPost/SliderPost'
import OfferPost from '../components/offerpost/OfferPost'
const IndexPage = () => (
  <motion.div exit={{opacity:0}} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
  <App>
    <Navbar />
    <HomeHeader />
    <BetterPost />
    <SliderPost />
    <OfferPost />
   
  </App>
  </motion.div>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_SITE_TITLE,
   
  })

  await apolloClient.query({
    query: HOME_HEADER,
   
  })
  await apolloClient.query({
    query: GET_BETTER_POST,
   
  })
  await apolloClient.query({
    query: GET_SLIDER_POST,
   
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default IndexPage
