import {defaultDataIdFromObject, gql,useQuery} from '@apollo/client';
import styles from './homeheader.module.scss';

export const HOME_HEADER = gql`
query MyQuery {
  homeHeader(id: "cG9zdDoxNA==") {
    excerpt
    id
    title
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    more_link {
      more {
        title
        url
      }
      singiture {
        mediaItemUrl
      }
    }
  }
}

`;
export default function HomeHeader(){
    const {loading,data} = useQuery(HOME_HEADER);

    return(
        <header className={styles.header}>
        
            <div className={styles.home_container}>
                <div className={styles.empty_col}></div>
                <div className={styles.content_col}>
                    <img src={data && data.homeHeader.featuredImage.node.mediaItemUrl} alt=""/>
                     <div className={styles.image_overlay}>
                            <h2>{data && data.homeHeader.title}</h2>
                        <div  dangerouslySetInnerHTML={{__html:data && data.homeHeader.excerpt}}/>
                        <div className={styles.sing}>
                             <img src={data && data.homeHeader.more_link.singiture.mediaItemUrl} alt=""/>
                            <a href="/">{data && data.homeHeader.more_link.more.title}</a>
                        </div>
                    </div> 
                </div>
            </div>
        </header>
    )
}