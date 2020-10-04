import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styles from "./categoryheader.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Category from "../../../components/category/Category";
export const GET_CATEGORY_NAME = gql`
  query categoryPage($id: ID!) {
    category(id: $id) {
      name
      posts {
        nodes {
         
          title
         
        }
      }
    }
  }
`;

const CategoryHeader = () => {
  const [showCategory, setShowCategory] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { loading, data } = useQuery(GET_CATEGORY_NAME, {
    variables: { id },
  });

  const clickShowCategory = (e) => {
    e.preventDefault();
    setShowCategory(!showCategory);
  };
  const variants = {
      open:{ height: "700px" },
      close:{ height:"450px" }
  }
  return (
    <AnimatePresence>
    <motion.header className={styles.header} initial={{height:"500px"}} animate={showCategory ? "open" : "close"}
     variants={variants}
     
     >
      <div className={styles.category_container}>
        <h2>
          {data && data.category.name}
          <span>{data && data.category.posts.nodes.length}</span>
        </h2>
        <a href="#" className={styles.showCategory} onClick={clickShowCategory}>
          نمایش دسته بندی ها
        </a>
       
       <Category title={false} theme="dark" />

      </div>
    </motion.header >

    </AnimatePresence>
  );
};

export default CategoryHeader;
