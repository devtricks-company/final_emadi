import React from "react";
import styles from "./postheader.module.scss";

const PostHeader = ({ post }) => {
  console.log(post);
  return (
    <header className={styles.header}>
      {post && (
        <div className={styles.header_container}>
            <img className={styles.header_bg_image} src={post.featuredImage.node.mediaItemUrl} alt={post.title}/>
            <div className={styles.overlay}>
                <img src={post.featuredImage.node.mediaItemUrl} alt={post.title} />
            </div>
        </div>
      )}
    </header>
  );
};

export default PostHeader;
