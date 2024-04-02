import { useState, useEffect } from 'react'
import styles from './MyInVoice.module.css'
import callicon from '../../../assets/callicon.png'
import musicIcon from '../../../assets/musicIcon.png'
import cartIcon from '../../../assets/cartIcon.png'
import invoice from '../../../assets/invoice.png'
import arrow from '../../../assets/arrow.png'
import logout from '../../../assets/logout.png'
import cartImg from '../../../assets/cartImg.png'
import home from '../../../assets/home.png'
import invoicehead from '../../../assets/invoicehead.png'
import invoiceFooter from '../../../assets/invoiceFoot.png'
import { useNavigate } from 'react-router-dom'
import {alldata} from '../../../../api/cart'


function MyInVoice() {
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();
 
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
    const fetchdata = async()=>{
        const response = await alldata();
        console.log(`api response${response}`)
        setInvoices(response);
        console.log(`invoices is ${invoices}`)

    }
    useEffect(()=>{
        fetchdata()
    },[])
    useEffect(() => {
        console.log("Updated invoices:", invoices);
    
    }, [invoices]);
    const InVoicenavigation = (id) => {
        // Navigate to the Invoice page with id in state
        console.log(id)
        navigate('/Invoice', { state: { id: id } });
    };
   const navigationpage =()=>{
    navigate('/')
   }
   const Login =()=>{
    navigate('/login')
}
    return (
        <div>
            {isMobile ? (
                <div className={styles.mobContainer}>
                    <div className={styles.music}>
                        <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                        <span className={styles.musicartt}>Musicart</span>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.arrowBox}onClick={navigationpage}>
                            <img src={arrow} className={styles.arrow} />
                        </div>
                        <div className={styles.headingBox}>
                        <img src={invoicehead} className={styles.invoices}/>
                        <span className={styles.invoiceheadin}>My Invoices</span>
                        </div>
 
                        {invoices.map((invoiced) => (
                                            <div className={styles.inVoiceBox}>
                                        
                                <div key={invoiced._id} className={styles.invoiceBox}>
                                    <div className={styles.left}>
                                        <img src={invoice} className={styles.invoiceImg} />
                                        <div className={styles.user}>
                                            <span className={styles.userName}>{invoiced.username}</span>
                                            <span className={styles.userAdress}>{invoiced.address}</span>
                                           
                                        </div>
                                      
                                    </div>
                                    
                                    <button className={styles.details}onClick={() => InVoicenavigation(invoiced._id)}>View Invoice</button>
                                   
                                  
                                </div>
                                <div className={styles.hr}></div>
                                </div>
                                
                            ))}

 
                    </div>
                   
                    <div className={styles.footerBox}>
                        <hr />
                        <div className={styles.footerMob}>
                            <div className={styles.footerImgs}>
                                <div className={styles.bar}/>
                                <img src={home} alt='img' className={styles.homeImg} />
                                <span className={styles.hometext}>Home</span>
                            </div>
                            <div className={styles.footerImgs}>
                                <img src={cartImg} alt='img' className={styles.homeImg} />
                                <span className={styles.hometext}>Cart</span>
                            </div>
                            <div className={styles.footerImgs}>
                                <img src={logout} alt='img' className={styles.homeImg} />
                                <span className={styles.hometext}onClick={Login}>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
 
            ) : (
                <div className={styles.container}>
                    <div className={styles.navBar}>
                        <div className={styles.contact}>
                            <img src={callicon} alt='callIcon' className={styles.callicon} />
                            <span className={styles.number}>912121131313</span>
                        </div>
                        <div className={styles.navBarText}>
                            <span className={styles.text}>Get 50% off on selected items</span>
                            <div className={styles.line}><b>|</b></div>
                            <span className={styles.shopNow}>Shop Now</span>
                        </div>
                        <div className={styles.navBarText1}>
                            <span className={styles.login}onClick={Login}>Logout</span>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.appName}>
                            <div className={styles.music}>
                                <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                                <span className={styles.musicartt}>Musicart</span>
                            </div>
                            <div className={styles.home}>Home/My Invoices</div>
                            <div className={styles.viewCart}>
                                <img src={cartIcon} alt='cartIcon' className={styles.cartIcon} />
                                <span className={styles.viewCartText}>View Cart</span>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <button className={styles.backButton}onClick={navigationpage}>Back to products</button>
                        </div>
                        <div className={styles.myCart}>
                            <div className={styles.heading}>
                                <span className={styles.myCartText}>My Invoices</span>
                            </div>
                           
 
                            
                                
                                    {invoices.map((invoiced) => (
                                            <div className={styles.inVoiceBox}>
                                        
                                <div key={invoiced._id} className={styles.invoiceBox}>
                                    <div className={styles.left}>
                                        <img src={invoice} className={styles.invoiceImg} />
                                        <div className={styles.user}>
                                            <span className={styles.userName}>{invoiced.username}</span>
                                            <span className={styles.userAdress}>{invoiced.address}</span>
                                           
                                        </div>
                                      
                                    </div>
                                    
                                    <button className={styles.details} onClick={() => InVoicenavigation(invoiced._id)}>View Invoice</button>
                                   
                                  
                                </div>
                                <div className={styles.hr}></div>
                                </div>
                                
                            ))}

 
                              
                              
                              
 
 
                         
 
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <p className={styles.footerText}>Musicart | All rights reserved</p>
                    </div>
                </div>
            )}
        </div>
 
    )
}
 
export default MyInVoice;

