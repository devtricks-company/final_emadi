import React from 'react'
import styles from './postcontent.module.scss';

const PostContent = ({post}) => {
    return (
      <> {post && <div className={styles.post}>
      <div className={styles.post_container}>
          <div className={styles.data_container}>
    <p><span>نویسنده :</span> <span>{post.author.node.name}</span></p>
    <p><span>دسته بندی :</span> <span>{post.categories.nodes[0].name}</span></p>
    <p><span>تاریخ انتشار :</span> <span>{post.date}</span></p>
          </div>
          <div className={styles.post_content}>
                  <h1>{post.title}</h1>
                  <div dangerouslySetInnerHTML={{__html:post.content}}></div>

              </div>    
      </div>            
  </div> } 
        </>
    )
}

export default PostContent
