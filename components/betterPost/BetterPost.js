import {gql,useQuery} from '@apollo/client';
import BetterPostItem from './BetterPostItem';
import styles from './betterpost.module.scss';

export const GET_BETTER_POST = gql`

query getBetterPost {
  posts(where: {tagSlugIn: "بهترین پست ها"}, last: 4) {
    nodes {
        id
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      date
      categories {
        nodes {
          name
        }
      }
      title
    }
  }
}

`;

export default function BetterPost(){
    const {loading,data} = useQuery(GET_BETTER_POST);
    return(
        <section className={styles.better_post}>
            <div className={styles.better_post_container}>
               {data && data.posts.nodes.map((post,index) => 
                <BetterPostItem key={index} post={post} />
                )}
            </div>
        </section>
    )
}