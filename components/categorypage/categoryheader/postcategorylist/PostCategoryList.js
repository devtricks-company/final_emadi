import React, { useEffect } from 'react';
import {gql,useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import PostCategoryItem from './CategoryPostItem'
import CategoryPostItem from './CategoryPostItem';
import styles from './postcategorylist.module.scss';
import Aos from 'aos';
import CategoryFullWidth from './CategoryFullWidth';

export const GET_PAGINATION_CATEGORY_POST = gql`
query getpostInCategory($id:ID!,$after:String) {
  category(id: $id) {
    posts(first: 17 , after:$after) {
      edges {
        node {
          id
          title
          excerpt
          categories{
            nodes{
              name
            }
          }
          featuredImage{
            node{
              mediaItemUrl
            }
          }
          date

        }
      }
      pageInfo {
        endCursor
      }
    }
  }
}



`;

const PostCategoryList = () => {
    const router = useRouter();
    const {id} = router.query;
    const {loading,data ,fetchMore} = useQuery(GET_PAGINATION_CATEGORY_POST,{
        variables:{id , after:null}
    });
  

    return (
        <div data-aos="fade-up" className={styles.post_list}>
          <div className={styles.post_list_container}>
            {data && data.category.posts.edges.map((post,index) => 
                  <>
                  {index  !=    8 ? 
                  <>
                  
                  <CategoryPostItem  key={post.node.id} post={post} time={++index} /> </> : 
                
                    <CategoryFullWidth key={post.id} post={post} /> 
                
                  }
                  
                  </>
                
                )}

                
              </div>
              <div className={styles.loadMore}>
              <a  onClick={() => {
                    const endCursor = data && data.category.posts.pageInfo.endCursor;
                   
                    fetchMore({
                        variables:{id,after:endCursor},
                        updateQuery: (prevResult,{fetchMoreResult}) => {
                           
                             fetchMoreResult.category.posts.edges = data && [
                                  ...data.category.posts.edges,
                                 ...fetchMoreResult.category.posts.edges
                             ]

                             return fetchMoreResult;
                        }
                    })
                }}>بارگذاری بیشتر</a>
              </div>
        </div>
    )
}

export default PostCategoryList
