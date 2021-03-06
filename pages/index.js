import { InferGetServerSidePropsType } from 'next'
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
import {AnimatePresence, motion} from 'framer-motion'
import BetterPost ,{GET_BETTER_POST} from '../components/betterPost/BetterPost'
import SliderPost ,{GET_SLIDER_POST} from '../components/sliderPost/SliderPost'
import OfferPost , {GET_OFFER_POST} from '../components/offerpost/OfferPost'
import Category ,{GET_CATEGORY} from '../components/category/Category'
import NewsLetter from '../components/newsletter/NewsLetter'
import Footer from '../components/footer/Footer'
const IndexPage = () => (

  <>
 
    <Navbar />
    <HomeHeader />
    <BetterPost />
    <SliderPost />
    <OfferPost />
    <Category title={true}/>
    <NewsLetter />
    <Footer />

 </>
)

export async function getServerSideProps() {
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
  await apolloClient.query({
    query: GET_OFFER_POST,
   
  })
  await apolloClient.query({
    query: GET_CATEGORY,
   
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    }
  }
}

export default IndexPage
