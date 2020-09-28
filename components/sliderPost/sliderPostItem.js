import styles from './sliderpost.module.scss';
import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SliderPostItem({post , show}){
  
   
    return(
       <>
     
        {show ? 
        <>
           
            <motion.div key="child" exit={{opacity:0}} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:3}} className={styles.slider_image_container}>
            <img src={post && post.featuredImage.node.mediaItemUrl} alt="" />
            
            </motion.div>
             
        <div className={styles.slider_content_container}>
               <h3>{post && post.title}</h3>
               <div dangerouslySetInnerHTML={{__html:post && post.excerpt}} />
        </div>
       
            </>
        
        : null}
                </>   
    )
}