import {gql,useQuery} from '@apollo/client';
import styles from './navbar.module.scss';
import {FaSearch,FaTimes} from 'react-icons/fa';
import {CgMenuRight} from 'react-icons/cg';
import Category from '../category/Category';
import { useEffect, useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Aos from 'aos';

export const GET_SITE_TITLE = gql`
        query GetTitle {
            allSettings {
                generalSettingsTitle
         }
    }

`;

export const GET_CATEGORY = gql`

query getCategories {
  categories {
    nodes {
      id
      name
      
    }
  }
}

`;

export const GET_SEARCH_POST = gql`
    query SearchPost($search:String) {
  posts(first: 10000, where: {search: $search}) {
    edges {
      node {
        id
        title
        date
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
}

`;

export default function Navbar(){
    const [showSearch,setShowSearch] = useState(false);
    const [searchValue,setSearchValue] = useState('');
    const [showSearchContent,setSearchShowContent] = useState(false);
    const [searchPostList,setSearchPostList] = useState([]);
    const [backMenu,setBackMenu] = useState(false);
    const [mainMenu,setMainMenu] = useState(false);
    const {loading,data} = useQuery( GET_SITE_TITLE);
    const {loading:loadingSearch,data:dataSearch} = useQuery(GET_SEARCH_POST,{
        variables:{search:searchValue}
    })
    const {loading:loadingCategory,data:dataCategory} = useQuery(GET_CATEGORY);
    useEffect(() => {
        Aos.init({duration:2000});
    },[]);
     const showSearchClickHandler = () =>{
         setShowSearch(true);
     }   

     const closeSearchHandler = () => {
         setShowSearch(false);
     }

     const changeHanlder = (e) => {
         setSearchValue(e.target.value)
     }
     const hitEnterHandler = e => {
         if(e.keyCode === 13){
            setSearchShowContent(true);
            setSearchPostList(dataSearch && dataSearch.posts.edges);
         }
     }

     const closeSearchContentHandler = () => {
         setSearchShowContent(false);
     }

     const showMenuHanlder = e => {
         setBackMenu(!backMenu);
         setMainMenu(!mainMenu);
     }
    
     const closeMenuClickHandler = () =>{
         setMainMenu(false);
         setBackMenu(false);
     }
     
    return(
        <>
        <nav className={styles.navbar}>
          <div className={styles.container_navbar}>
          <a href="/" className={styles.brand_navbar}>
                <img src="/logo.png" alt=""/>
            </a>
            <h1>{data && data.allSettings.generalSettingsTitle}</h1>
            <div className={styles.icon_wrapper}>
                <span><FaSearch onClick={showSearchClickHandler} /></span>
                <span><CgMenuRight onClick={showMenuHanlder} /></span> 
            </div>
          </div>
        </nav>
        <AnimatePresence> {showSearch ?   <motion.div exit="slideUp" initial="startInitial" animate="slideDown" variants={{
            startInitial:{
                height:0
            },
            slideUp:{
                height:0
            },
            slideDown:{
                height:"100vh"
            }
        }}  transition={{duration:.5}} className={styles.search_container}>
            <div className={styles.search_container_wrapper}>
            <nav className={styles.navbar_dark}>
          <div className={styles.container_navbar}>
          <a href="/" className={styles.brand_navbar}>
                <img src="/logo.png" alt=""/>
            </a>
            <h1>{data && data.allSettings.generalSettingsTitle}</h1>
            <div className={styles.icon_wrapper}>
                <span><FaTimes color="white" onClick={closeSearchHandler} style={{cursor:"pointer"}} /></span>
                 
            </div>
          </div>
        </nav>
                <input type="text" name="search" id="search" placeholder="جستجو کنید..."
                    value={searchValue}
                    onChange={changeHanlder}
                    onKeyUp={hitEnterHandler}
                />
                <Category title={false} theme="dark" />
            </div>
        </motion.div> : null}</AnimatePresence> 
        <AnimatePresence> {showSearchContent ? <motion.div exit={{width:0}} initial={{width:0}} animate={{width:"99.11vw"}} transition={{duration:1}} className={styles.search_content}>
        

        <nav className={styles.navbar_search}>
          <div className={styles.container_navbar}>
          <a href="/" className={styles.brand_navbar}>
                <img src="/logo.png" alt=""/>
            </a>
            <h1>{data && data.allSettings.generalSettingsTitle}</h1>
            <div className={styles.icon_wrapper}>
               
                <span><FaTimes color="black" onClick={closeSearchContentHandler} style={{cursor:"pointer"}} /></span> 
            </div>
          </div>
        </nav>
            <div className={styles.search_content_wrapper}>



                 <span className={styles.search_word}>{searchValue}</span>
            </div>
        <div data-aos="fade-up" className={styles.searchPostContent}>
                <div   className={styles.searchPostContainer}>
                        {dataSearch && dataSearch.posts.edges.length > 0 && dataSearch.posts.edges.map(post => 
                            <div key={post.node.id} data-aos="fade-up" className={styles.post_item}>
                                <div className={styles.post_item_image}>
                                    <img src={post.node.featuredImage.node.mediaItemUrl} alt=""/>
                                </div>
                                <div className={styles.category_date}>
                                    <span>{post.node.categories.nodes[0].name}</span>
                                    <span>{post.node.date}</span>
                                </div>
                                <h4>{post.node.title}</h4>
                                

                            </div>
                            ) }
                </div>    
        </div>    
        </motion.div> : null }
        </AnimatePresence>
        <AnimatePresence>
        {backMenu ? 
            <motion.div exit={{
                left:"100%"
            }} initial={{
                left:"100%"
            }} animate={{
                left:0
            }}
            transition={{duration:0.3}}
            className={styles.backmenu}
            onClick={closeMenuClickHandler}
            >

            </motion.div>
        
        
        : null}
        </AnimatePresence> 
        <AnimatePresence>
            {mainMenu ?
                <motion.div className={styles.main_menu} 
                initial={{right:"-500px"}} 
                exit={{right:"-500px"}}
                animate={{
                        right:0
                }}
                >
                    <FaTimes color="white" className={styles.closeMenu} onClick={closeMenuClickHandler} />
                   <h2>دسته بندی</h2>
                   <ul>
                       {dataCategory && dataCategory.categories.nodes.map(category => 
                            <>
                            {category.name === "Uncategorized" ? null : <li>{category.name}</li> }
                                
                            </>
                        )}
                   </ul>  
                   <h2 className={styles.pageHeading}>صحفه دیگر</h2> 
                   <ul>
                        <li>درباره من</li>
                        <li>سوالات متداول</li>
                        <li>ارتباط با ما</li>
                        
                    </ul>  

                        <h2 className={styles.withUs}>
                            با ما همراه باشید 
                        </h2>
                       <div className={styles.form}>
                       <input type="text" name/>
                        <button>ارسال</button>
                       </div>
                </motion.div>
            
            : null}    
        </AnimatePresence>      
        </>
    )
}