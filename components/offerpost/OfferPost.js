import { gql, useQuery } from "@apollo/client";
import styles from "./offer.module.scss";
import moment from 'moment-jalaali';
import {digitsEnToFa} from 'persian-tools2';

export const GET_OFFER_POST = gql`
  query MyQuery {
    posts(where: { tagSlugIn: "مطالب پیشنهادی" }) {
      nodes {
        date
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        title
        id
      }
    }
  }
`;

export default function OfferPost() {
  const { loading, data } = useQuery(GET_OFFER_POST);

  return (
    <section className={styles.offer_post}>
      
      <div className={styles.offer_post_container}>
        <h2>مطالب پیشنهادی</h2>
        <div className={styles.post_wrapper}>
            <div className={styles.first_post}>
          {data &&
            data.posts.nodes.map((post, index) => (
              <>
                {index === 0 ? (
                  <>
                    <div className="image_post_container">
                      <img
                        src={post && post.featuredImage.node.mediaItemUrl}
                        alt=""
                      />
                    </div>
                    <div className={styles.category_date}>
                      <span>
                        <span>{post.categories.nodes[0].name}</span>
                      </span>
                      <span>{digitsEnToFa(moment(post.date, 'YYYY-M-D HH:mm:ss').endOf('jMonth').format('jYYYY/jM/jD'))}</span>
                    </div>
                    <h3 className={styles.post_title}>{digitsEnToFa(post.title)}</h3>
                  </>
                ) : (
                  null
                )}
                
              </>
            ))}
        </div>
        <div className="second_post">
            {data && data.posts.nodes.map((post,index) => 
                <>
                </>
            )}
        </div>
        </div>
      </div>
    </section>
  );
}
