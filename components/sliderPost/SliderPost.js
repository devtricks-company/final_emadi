import { gql, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import SliderPostItem from "./sliderPostItem";
import styles from "./sliderpost.module.scss";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {motion,AnimatePresence} from 'framer-motion';

export const GET_SLIDER_POST = gql`
  query MyQuery {
    posts(where: { tagSlugIn: "اسلایدر" }) {
      nodes {
        title
        id
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        excerpt
      }
    }
  }
`;

export default function SliderPost() {
  const [itemIndex, setItemIndex] = useState(0);
  const [item, setItem] = useState(null);
  const [isVisible, setVisible] = useState(true);

  const { loading, data } = useQuery(GET_SLIDER_POST);
  useMemo(() => {
    if (data) {
      setItem(data.posts.nodes[itemIndex]);
    }
  }, [itemIndex, data]);
  const clickNextSlide = () => {
      const increseItem = itemIndex + 1
      if(data && data.posts.nodes.length > increseItem ){
         setVisible(false);
         setItemIndex(increseItem);
         
      }else{
        setVisible(false);
         setItemIndex(0);
      }
      setTimeout(() => { setVisible(true) },500)
    
  }

  const clickPrevSlide = () => {
    const decrease = itemIndex - 1;
    if(data && data.posts.nodes.length >= 0){
      setVisible(false);
      setItemIndex(decrease);
    }else{
      setVisible(false);
         setItemIndex(data.posts.nodes.length - 1);
    }
    setTimeout(() => { setVisible(true) },500)
  }
  return (
    <section className={styles.slider}>
      <div className={styles.slider_container}>
        <AnimatePresence>
          {isVisible &&  <SliderPostItem  post={item && item} /> }
          </AnimatePresence>
             
           
        
        <div className={styles.slider_arrow}>
          <span onClick={clickNextSlide}>
            <BsArrowRight />
          </span>
          <span onClick={clickPrevSlide}>
            <BsArrowLeft />
          </span>
        </div>
      </div>
    </section>
  );
}
