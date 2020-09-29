import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import styles from './footer.module.scss';
export const GET_FOOTER = gql`
  query MyQuery {
    footers {
      nodes {
        title
        excerpt
      }
    }
  }
`;

export const GET_CATEGORY = gql`
query GetCategory {
  categories {
    nodes {
      name
      id
    }
  }
}


`;
export default function Footer() {
    const {loading,data} = useQuery(GET_FOOTER);
    const {loading:loadingCategory , data:dataCategory} = useQuery(GET_CATEGORY);


  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_discription}>
          <h2>{data && data.footers.nodes[0].title}</h2>
          <div dangerouslySetInnerHTML={{__html:data && data.footers.nodes[0].excerpt}} />
          <div className={styles.social_media}>
              
           
          </div>
        </div>
        <div className={styles.footer_category}>
            <h2>دسته بندی</h2>
            {dataCategory && dataCategory.categories.nodes.map(category => 
            <>
            {category.name != "Uncategorized"?
            <p>
            <Link href="/"><a>{category.name}</a></Link>
        </p> : null}
            
              </>  
                )}
        </div>
        <div className={styles.footer_pages}>
            <h2>صحفه های بیشتر</h2>
            <p><Link href="/">خانه</Link></p>
            <p><Link href="/">درباره ما</Link></p>
            <p><Link href="/">تماس با ما</Link></p>
        </div>
      </div>
    </footer>
  );
}
