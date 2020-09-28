import { gql, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import SliderPostItem from "./sliderPostItem";
import styles from "./sliderpost.module.scss";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {motion,useCycle} from 'framer-motion';

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
        setItemIndex(0);
      }
  }
  return (
    <section className={styles.slider}>
      <div className={styles.slider_container}>
          
             <SliderPostItem show={isVisible} post={item && item} /> 
           
        
        <div className={styles.slider_arrow}>
          <span onClick={clickNextSlide}>
            <BsArrowRight />
          </span>
          <span>
            <BsArrowLeft />
          </span>
        </div>
      </div>
    </section>
  );
}
