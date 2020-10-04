import React from 'react';
import styles from './categoryfullwidth.module.scss';

const CategoryFullWidth = ({post}) => {
    return (
        <div  className={styles.full_width_wrapper}>
            <div className={styles.first_col}>

            </div>
            <div className={styles.second_col}>
                <img src={post.node.featuredImage.node.mediaItemUrl} alt=""/>
                <div className={styles.overlay}>
                    <h3>{post.node.title}</h3>
                    <p dangerouslySetInnerHTML={{__html:post.node.excerpt}} />
                    <a href="#">بیشتر بخوانید</a>
                </div>
            </div>
        </div>
    )
}

export default CategoryFullWidth
