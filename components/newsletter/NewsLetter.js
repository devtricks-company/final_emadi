import styles from './newsletter.module.scss';


export default function NewsLetter(){
    return(
        <section className={styles.news_letter}>
            <div className={styles.image_news_container}>
                <img src="/news.jpg" alt=""/>
            </div>
            <div className={styles.content_news_letter}>
                <form>
                    <h2>با ما همراه باشید</h2>
                   
                    <button type="submit" class="button_submit">ارسال</button>
                    <input type="email" id="email" name="email" placeholder="لطفا ایمیل خود را وارد کنید" />
                </form>
            </div>
        </section>
    )
}