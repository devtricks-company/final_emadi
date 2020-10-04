import React from 'react'
import {useRouter} from 'next/router';
import Navbar from '../../../components/navbar/Navbar';
import { gql,useQuery } from '@apollo/client';
import PostHeader from '../../../components/post/postheader/PostHeader';
import PostContent from '../../../components/post/postcontent/PostContent';

export const GET_A_POST = gql`
query MyQuery($id:ID!) {
  post(id: $id) {
    title
    content
    featuredImage{
      node{
        mediaItemUrl
      }
    }
    date
    categories{
      nodes{
        name
      }
    }
    author {
      node {
        name
        posts {
          edges {
            node {
              title
              categories(first: 4) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}



`
const index = () => {
    const router = useRouter();
    const {id} = router.query;
    const {loading,data} = useQuery(GET_A_POST,{
      variables:{id}
    });
   
    return (
        <>
            <Navbar />
            <PostHeader post={data && data.post} />
            <PostContent post={data && data.post} />

        </>
    )
}

export default index
