import React, { useEffect } from 'react'
import styles from './categorypostitem.module.scss';
import moment from 'moment-jalaali';
import {digitsEnToFa} from 'persian-tools2';
import Aos from 'aos';
import Link from 'next/link'

const CategoryPostItem = ({post,time}) => {
  useEffect(() => {
    
        Aos.init({duration:2000});
  },[]);
    return (
        <div data-aos="fade-up"   className={styles.post_item} >
           <Link as={`/post/${post.node.id}`} href="/post/id"><a>
           <div className={styles.post_item_image_container}>
                <img src={post.node.featuredImage.node.mediaItemUrl} alt=""/>
            </div>
            <div className={styles.category_date}>
                <span className={styles.category_line}>
                    <span>
                        {post.node.categories.nodes[0].name}
                    </span>
                </span>
                <span className={styles.post_date} >{digitsEnToFa(moment(post.node.date, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD'))}</span>

            </div>
            <h4 className={styles.category_title}>{post.node.title}</h4>
               </a></Link> 
        </div>
    )
}

export default CategoryPostItem
