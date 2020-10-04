import React from 'react';
import {useRouter} from 'next/router';
import Navbar from '../../../components/navbar/Navbar';
import {gql,useQuery} from '@apollo/client';
import { InferGetServerSidePropsType } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import CategoryHeader ,{GET_CATEGORY_NAME} from '../../../components/categorypage/categoryheader/CategoryHeader';
import PostCategoryList from '../../../components/categorypage/categoryheader/postcategorylist/PostCategoryList';
import NewsLetter from '../../../components/newsletter/NewsLetter';
import Footer from '../../../components/footer/Footer';
import {motion} from 'framer-motion';


const CategoryPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const {loading,data} = useQuery(GET_CATEGORY_NAME,{
        variables: {id}
      })
    return (
        <>
       <Navbar />
        <CategoryHeader />
        <PostCategoryList />
        <NewsLetter />
        <Footer />
      </>
      
    )
}

export async function getServerSideProps({query}){
    const apolloClient = initializeApollo()

    await apolloClient.query({
      query: GET_CATEGORY_NAME,
      variables:{id:query.id}
     
    })

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      }
    }
}

export default CategoryPage
