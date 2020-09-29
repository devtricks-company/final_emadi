import styles from './newsletter.module.scss';


export default function NewsLetter(){
    return(
        <section className={styles.news_letter}>
            <div className={styles.image_news_container}>
                <img src="/news.jpg" alt=""/>
            </div>
            <div className={styles.content_news_letter}>
                <form>
                    <input type="email" id="email" name="email"  />
                    <button type="submit" class="button_submit">ارسال</button>
                </form>
            </div>
        </section>
    )
}