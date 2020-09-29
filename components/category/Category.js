import {gql,useQuery} from '@apollo/client';
import styles from './category.module.scss';
import {digitsEnToFa} from 'persian-tools2';
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

export default function Category(){
    const {loading,data} = useQuery(GET_CATEGORY);
    return(
        <section className={styles.category}>
            <div className={styles.category_container}>
              <h2>دسته بندی</h2>
              <div className={styles.category_wrapper_item}>
                {data && data.categories.nodes.map(category =>
                    <>
                    {category.name !== "Uncategorized" ? <div className={styles.category_item}>
                        <img src={category.categoryImage.categoryImage.mediaItemUrl} alt=""/>
                        <h4>{category.name} <span>{digitsEnToFa(category.posts.nodes.length)}</span> </h4>

                    </div> : null}
                            
                    </>
                    
                    
                    )}
                    </div>
            </div>
        </section>
    )
}