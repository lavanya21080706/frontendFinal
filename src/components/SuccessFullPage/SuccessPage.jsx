import { useState, useEffect } from 'react'
import styles from './SuccessPage.module.css'
import musicIcon from '../../assets/musicIcon.png'
import celebration from '../../assets/celebration.png'
import login from '../../assets/login.png'
import cartImg from '../../assets/cartImg.png'
import home from '../../assets/home.png'
import logout from '../../assets/logout.png'
import invoiceFooter from '../../assets/invoiceFoot.png'
import { useNavigate } from 'react-router-dom'


function SuccessPage() {
    const navigate =useNavigate();
    const dashboard =()=>{
        navigate('/')
    }
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const LOgout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login')
    }
    const invoicefun = ()=>{
        navigate('/MyInVoice')
    }
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
                <button className={styles.button}onClick={dashboard}>Go back to Home page</button>
            </div>
            </div>
            {/* <div className={styles.footerBox}></div>
            <div className={styles.footer}>
                <p className={styles.footerText}>Musicart | All rights reserved</p>
            </div> */}
            {isMobile ? (
                <div className={styles.footerBox}>
                    <hr />
                    <div className={styles.footerBox}>
                        <hr />
                        <div className={styles.footerMob}>
                            <div className={styles.footerImgs}>
                                <div className={styles.bar}></div>
                                <img src={home} alt='img' className={styles.homeImg} />
                                <span className={styles.hometext}>Home</span>
                            </div>
                            <div className={styles.footerImgs}>
                                <span className={styles.cartCount}>0</span>
                                <img src={cartImg} alt='img' className={styles.homeImg} />
                                <span className={styles.hometext}>Cart</span>
                            </div>
                            <div className={styles.footerImgs}>
                                <img src={invoiceFooter} alt='img' className={styles.homeImg} />
                                <span className={styles.hometext}onClick={invoicefun}>Invoice</span>
                            </div>
                            <div className={styles.footerImgs}>
                                <img src={logout} alt='img' className={styles.homeImg} />
                                <span className={styles.hometext}onClick={LOgout}>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.footer}>
                    <p className={styles.footerText}>Musicart | All rights reserved</p>
                </div>
            )}
        </div>
    )
}

export default SuccessPage;