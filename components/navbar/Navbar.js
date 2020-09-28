import {gql,useQuery} from '@apollo/client';
import styles from './navbar.module.scss';
import {FaSearch} from 'react-icons/fa';
import {CgMenuRight} from 'react-icons/cg';


export const GET_SITE_TITLE = gql`
        query GetTitle {
            allSettings {
                generalSettingsTitle
         }
    }

`

export default function Navbar(){
    const {loading,data} = useQuery( GET_SITE_TITLE)
    return(
        <nav className={styles.navbar}>
          <div className={styles.container_navbar}>
          <a href="/" className={styles.brand_navbar}>
                <img src="/logo.png" alt=""/>
            </a>
            <h1>{data && data.allSettings.generalSettingsTitle}</h1>
            <div className={styles.icon_wrapper}>
                <span><FaSearch /></span>
                <span><CgMenuRight /></span> 
            </div>
          </div>
        </nav>
    )
}