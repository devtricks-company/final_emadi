import styles from './betterpost.module.scss';
import moment from 'moment-jalaali';
import {digitsEnToFa} from 'persian-tools2';

export default function BetterPostItem({post}) {
  return (
    <div className={styles.post_item}>
      <div className={styles.image_container}>
        <img src={post.featuredImage.node.mediaItemUrl} alt={post.title} />
      </div>
      <div className={styles.category_date_container}>
        <span className={styles.category_container}>
            <span>{post.categories.nodes[0].name}</span>
        </span>
        <span className={styles.post_date}>{digitsEnToFa(moment(post.date, 'YYYY-M-D HH:mm:ss').endOf('jMonth').format('jYYYY/jM/jD'))}</span>
      </div>
      <h3 className={styles.better_post_title}>{post.title}</h3>
    </div>
  );
}
