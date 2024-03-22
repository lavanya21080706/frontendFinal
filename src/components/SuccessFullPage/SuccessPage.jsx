import styles from './SuccessPage.module.css'
import musicIcon from '../../assets/musicIcon.png'
import celebration from '../../assets/celebration.png'


function SuccessPage() {
    return (
        <div className={styles.container}>
            <div className={styles.music}>
                <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                <span className={styles.musicartt}>Musicart</span>
            </div>
            <div className={styles.content}>
            <div className={styles.orderPlaced}>
                <img src={celebration} alt='celebrationIcon' className={styles.celeb}/>
                <div className={styles.textBox}>
                <span className={styles.text}>Order is placed successfully!</span>
                <span className={styles.text2}>You  will be receiving a confirmation email with order details</span>
                </div>
                <button className={styles.button}>Go back to Home page</button>
            </div>
            </div>
            <div className={styles.footerBox}></div>
            <div className={styles.footer}>
                <p className={styles.footerText}>Musicart | All rights reserved</p>
            </div>
        </div>
    )
}

export default SuccessPage;