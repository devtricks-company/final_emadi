import styles from "./sliderpost.module.scss";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SliderPostItem({ post }) {
  return (
    
      
        <>
          <motion.div
            key="child"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            exit={{ opacity: 0 }}
            className={styles.slider_image_container}
          >
            <img src={post && post.featuredImage.node.mediaItemUrl} alt="" />
          </motion.div>

          <div
        
            className={styles.slider_content_container}
          >
            <motion.h3  key="child"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}>{post && post.title}</motion.h3>
            <motion.div  key="child"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }} dangerouslySetInnerHTML={{ __html: post && post.excerpt }} />
          </div>
        </>
    
  );
}
