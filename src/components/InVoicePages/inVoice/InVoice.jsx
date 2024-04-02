import { useState, useEffect } from 'react'
import styles from './InVoice.module.css'
import callicon from '../../../assets/callicon.png'
import musicIcon from '../../../assets/musicIcon.png'
import headphn from '../../../assets/headphn.png'
import arrow from '../../../assets/arrow.png'
import logout from '../../../assets/logout.png'
import cartImg from '../../../assets/cartImg.png'
import home from '../../../assets/home.png'
import invoiceFooter from '../../../assets/invoiceFoot.png'
import { useNavigate } from 'react-router-dom';
import { deliverydata } from '../../../../api/products';
import { useLocation } from 'react-router-dom';
import { getcart } from '../../../../api//cart';



function InVoice() {

    const navigate = useNavigate();
    const { state } = useLocation();


    const [selectedItem, setSelectedItem] = useState(null);
    const [fetchedData, setFetchedData] = useState([]);

    const [dbid, updateId] = useState(state ? state.id : null);
    console.log(`this id ${dbid}`)





    const [userData, setUserData] = useState({
        username: '',
        address: '',
        paymentMethod: '',
        selectedImages: [],
        totalAmount: 0
    });


    const initiallfetch = async (dbid) => {
        console.log(`Fetching data for id: ${dbid}`);
        const response = await getcart(dbid);
        console.log('API Response:', response);
        setUserData({
            username: response.username || '',
            address: response.address || '',
            paymentMethod: response.paymentMethod || '',
            selectedImages: response.selectedImages || [], // Ensure that selectedImages is correctly set
            totalAmount: response.totalAmount || 0
        });
        console.log('Updated userData:', userData);
    };
    useEffect(() => {
        initiallfetch()
    }, [])

 
    
    // Inside the useEffect hook for updating selectedImages
   
    useEffect(() => {
        if (state && state.id) {
            initiallfetch(state.id);
        }
    }, [state]);
    
    
  

    const handleBackToProducts = () => {
        navigate('/');
    };

    const handleItemClick = (item) => {
        // Toggle selection
        setSelectedItem(selectedItem === item ? null : item);
    };

    const totalAmount = userData.totalAmount
 

    useEffect(() => {
        const images = fetchedData.map(item => ({
            imageUrl: item.Images[0],
            productName: item.ProductName,
            color: item.color
        }));
        setUserData(prevState => ({
            ...prevState,
            selectedImages: images
        }));
    }, [fetchedData]);

    useEffect(() => {
        setUserData(prevState => ({
            ...prevState,
            totalAmount: totalAmount
        }));
    }, [totalAmount]);
    const handleAddressChange = (event) => {
        const address = event.target.value;
        setUserData(prevState => ({
            ...prevState,
            address: address
        }));
    };

    const handleNavigate=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/MyCart')
    }

    const handlePaymentMethodChange = (event) => {
        const paymentMethod = event.target.value;
        setUserData(prevState => ({
            ...prevState,
            paymentMethod: paymentMethod
        }));
    };
    const Login = () => {
        navigate('/login')
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
    const invoicefun = () => {
        console.log('userData.selectedImages:', userData.selectedImages);
        navigate('/MYInvoice');
    };
    return (
        <div>
            {isMobile ? (<div className={styles.mobContainer}>
                <div className={styles.music}>
                    <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                    <span className={styles.musicartt}>Musicart</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.arrowBox} onClick={handleBackToProducts}>
                        <img src={arrow} className={styles.arrow} />
                    </div>
                    <span className={styles.heading}>Invoices</span>

                </div>

                <div className={styles.deliveryBox}>
                    <span className={styles.addressLabel}>1.Delivery address</span>
                    <div className={styles.userDetails}>
                        <span className={styles.userName}>{userData.username}</span>
                        <textarea className={styles.textArea} onChange={handleAddressChange} value={userData.address} />
                    </div>
                </div>
                <div className={styles.hr}></div>

                <div className={styles.paymentBox}>
                    <span className={styles.paymentLabel}>2.Payment method</span>
                    <span className={styles.dropdown}>{ userData.paymentMethod}</span>
                </div>
                <div className={styles.hr}></div>
                <div className={styles.review}>
                                    <span className={styles.reviewLabel}>3. Review items and delivery</span>
                                    <div className={styles.images}>
                                        <div className={styles.imgContainer}>
                                            {userData.selectedImages.map((item, index) => (

                                                <div key={index} className={styles.imgBox} onClick={() => handleItemClick(item)}>
                                               
                                                <img src={item.imageUrl} alt={`item-${index}`} className={styles.img} />
                                                </div>
                                            ))}
                                        </div>

                                        {selectedItem ? (
                                            <div className={styles.productDetails}>
                                                
                                                <span className={styles.productName}>{selectedItem.productName}</span>
                                                <span className={styles.color}>Color : {selectedItem.color}</span>
                                                <span className={styles.estimated}>Estimated delivery:</span>
                                                <span className={styles.estimated}>Monday — FREE Standard Delivery</span>
                                            </div>
                                        ) : (
                                            userData.selectedImages.length > 0 && (
                                                <div className={styles.productDetails}>
                                                    <span className={styles.productName}>{userData.selectedImages[0].productName}</span>
                                                    <span className={styles.color}>Color : {userData.selectedImages[0].color}</span>
                                                    <span className={styles.estimated}>Estimated delivery:</span>
                                                    <span className={styles.estimated}>Monday — FREE Standard Delivery</span>
                                                </div>
                                            )
                                        )}

                                    </div>
                                </div>
                <div className={styles.hr}></div>

                <div className={styles.summaryBox}>
                    <span className={styles.summaryText}>Order Summary</span>
                    <div className={styles.itemsBox}>
                        <span className={styles.items}>Items:</span>
                        <span className={styles.cost}>₹{totalAmount}</span>
                    </div>
                    <div className={styles.delBox}>
                        <span className={styles.del}>Delivery:</span>
                        <span className={styles.delCost}>₹45.00</span>
                    </div>
                </div>
                <div className={styles.hr}></div>
                <div className={styles.orderTotalBox}>
                    <span className={styles.totalOrder}>Order Total:</span>
                    <span className={styles.totalOrderCost}>₹{totalAmount+45}</span>
                </div>
                <div className={styles.footerBox}>
                    <hr />
                    <div className={styles.footerMob}>
                        <div className={styles.footerImgs}>
                            <div className={styles.bar}></div>
                            <img src={home} alt='img' className={styles.homeImg} />
                            <span className={styles.hometext}>Home</span>
                        </div>
                        <div className={styles.footerImgs} onClick={handleNavigate}>
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
                            <span className={styles.hometext}onClick={Login}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>) : (<div className={styles.container}>
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
                        <span className={styles.login} onClick={Login}>Logout</span>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.appName}>
                        <div className={styles.music}>
                            <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                            <span className={styles.musicartt}>Musicart</span>
                        </div>
                        <div className={styles.home}>Home/Invoice</div>
                    </div>
                    <div className={styles.button}>
                        <button className={styles.backButton} onClick={handleBackToProducts}>Back to products</button>
                    </div>
                    <div className={styles.myCart}>
                        <div className={styles.heading}>
                            <span className={styles.checkout}><u>Invoice</u></span>
                        </div>
                        <div className={styles.checkoutBox}>
                            <div className={styles.left}>
                                <div className={styles.deliveryBox}>
                                    <span className={styles.addressLabel}>1. Delivery address</span>
                                    <div className={styles.userDetails}>
                                        <span className={styles.userName}>{userData.username}</span>
                                        <textarea className={styles.textArea} onChange={handleAddressChange} value={userData.address} />
                                    </div>
                                </div>
                                <hr />
                                <div className={styles.paymentBox}>
                                    <span className={styles.paymentLabel}>2. Payment method</span>
                                    <select className={styles.dropdown} onChange={handlePaymentMethodChange} value={userData.paymentMethod}>
                                        <option disabled selected className={styles.options}>Mode of payment</option>
                                        <option className={styles.options}>Pay on Delivery</option>
                                        <option className={styles.options}>Upi</option>
                                        <option className={styles.options}>Card</option>
                                    </select>
                                </div>
                                <hr />
                                <div className={styles.review}>
                                    <span className={styles.reviewLabel}>3. Review items and delivery</span>
                                    <div className={styles.images}>
                                        <div className={styles.imgContainer}>
                                            {userData.selectedImages.map((item, index) => (
                                                <div key={index} className={styles.imgBox} onClick={() => handleItemClick(item)}>
                                                    <img src={item.imageUrl} alt={`item-${index}`} className={styles.img} />
                                                </div>
                                            ))}
                                        </div>

                                        {selectedItem ? (
                                            <div className={styles.productDetails}>
                                                <span className={styles.productName}>{selectedItem.productName}</span>
                                                <span className={styles.color}>Color : {selectedItem.color}</span>
                                                <span className={styles.estimated}>Estimated delivery:</span>
                                                <span className={styles.estimated}>Monday — FREE Standard Delivery</span>
                                            </div>
                                        ) : (
                                            userData.selectedImages.length > 0 && (
                                                <div className={styles.productDetails}>
                                                    <span className={styles.productName}>{userData.selectedImages[0].productName}</span>
                                                    <span className={styles.color}>Color : {userData.selectedImages[0].color}</span>
                                                    <span className={styles.estimated}>Estimated delivery:</span>
                                                    <span className={styles.estimated}>Monday — FREE Standard Delivery</span>
                                                </div>
                                            )
                                        )}

                                    </div>
                                </div>
                                <hr />
                                {/* <div className={styles.orderTotal}>
                                <button className={styles.orderButton}onClick={handlePlaceOrder}>Place your order</button>
                                <div className={styles.totalBox}> 
                                <span className={styles.total}>Order Total : ₹{totalAmount+45}</span>
                                    <span className={styles.totalDesc}>By placing your order, you agree to Musicart privacy notice and conditions of use.</span>
                                </div>
                            </div> */}
                            </div>
                            <div className={styles.right}>
                                <div className={styles.orderSummary}>
                                    <div className={styles.summaryBox}>
                                        <span className={styles.summaryText}>Order Summary</span>
                                        <div className={styles.itemsBox}>
                                            <span className={styles.items}>Items:</span>
                                            <span className={styles.cost}>₹{totalAmount}</span>
                                        </div>
                                        <div className={styles.delBox}>
                                            <span className={styles.del}>Delivery:</span>
                                            <span className={styles.delCost}>₹45.00</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={styles.orderTotalBox}>
                                        <span className={styles.totalOrder}>Order Total:</span>
                                        <span className={styles.totalOrderCost}>₹{totalAmount + 45}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <p className={styles.footerText}>Musicart | All rights reserved</p>
                </div>
            </div>)}
        </div>
    )
}


export default InVoice;

