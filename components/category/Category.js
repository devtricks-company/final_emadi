import {gql,useQuery} from '@apollo/client';
import styles from './category.module.scss';
import {digitsEnToFa} from 'persian-tools2';
import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
export const GET_CATEGORY = gql`

query MyQuery {
  categories {
    nodes {
      id
      name
      categoryImage {
        categoryImage {
          mediaItemUrl
        }
      }
      posts {
        nodes {
          title
        }
      }
    }
  }
}

`;

export default function Category({title,theme}){
    const {loading,data} = useQuery(GET_CATEGORY);
    return(
      
        <section className={styles.category}>
            <div className={styles.category_container}>
              {title ? <h2>دسته بندی</h2> : null} 
              <div className={styles.category_wrapper_item}>
                {data && data.categories.nodes.map(category =>
                    <>
                    {category.name !== "Uncategorized" ? <Link as={`/categories/${category.id}`} href="/categories/[id]"><a><div className={styles.category_item}>
                        <img src={category.categoryImage.categoryImage.mediaItemUrl} alt=""/>
                        <h4 style={theme === "dark" ? {color:"white"} : {color:"black"}}>{category.name} <span>{digitsEnToFa(category.posts.nodes.length)}</span> </h4>

                    </div></a></Link>  : null}
                            
                    </>
                    
                    
                    )}
                    </div>
            </div>
          
        </section>
           
    )
}