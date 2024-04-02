import { useState, useEffect } from 'react'
import styles from './Checkout.module.css'
import callicon from '../../assets/callicon.png'
import musicIcon from '../../assets/musicIcon.png'
import headphn from '../../assets/headphn.png'
import arrow from '../../assets/arrow.png'
import logout from '../../assets/logout.png'
import cartImg from '../../assets/cartImg.png'
import home from '../../assets/home.png'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { updatequantity } from '../../../api/products'
import { updateCardStatus } from '../../../api/products'
import { updateDeliveryStatus } from '../../../api/products'
import { userdata } from '../../../api/cart';
import { updateall } from '../../../api/products';
import { deliverydata } from '../../../api/products';
import { feedbackpost } from '../../../api/feedback';
import { getcount } from '../../../api/products';
import { toast } from 'react-toastify';


function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = localStorage.getItem('username');
    const [selectedItem, setSelectedItem] = useState(null);
    const [fetchedData, setFetchedData] = useState([]);
    const totalAmount = location.state.totalAmount;

    const [userData, setUserData] = useState({
        username: username,
        address: '',
        paymentMethod: '',
        selectedImages: [],
        totalAmount: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await deliverydata();
                setFetchedData(response.data);
                // Set the initially selected item when the component mounts
                if (response.data.length > 0) {
                    setSelectedItem(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleBackToProducts = () => {
        navigate('/');
    };

    const handleItemClick = (item) => {
        // Update the selected item when the user clicks on an image
        setSelectedItem(item);
    };

    const handlePlaceOrder = async () => {
        try {
            // Check if any field in userData is empty
            const emptyFields = Object.keys(userData).filter(key => userData[key] === '');
            if (emptyFields.length > 0) {
                // Display toast message indicating the empty fields
                toast.error(`Required field(s) ${emptyFields.join(', ')} is in  empty`, {
                    autoClose: 2000, // Auto-close toast after 3 seconds
                    hideProgressBar: true // Hide progress bar
                });
                return; // Exit function if any field is empty
            }

            // Call the userdata function to send userData state to the backend
            await userdata({ userdata: userData });

            console.log('User data sent successfully');
            const response = await updateall();
            navigate('/Sucess');
        } catch (error) {
            console.error('Failed to send user data:', error);
            // Handle the error appropriately, such as displaying an error message to the user
        }
    };
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

    const handleNavigate=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
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
    return (
        <div>
            {isMobile ? (<div className={styles.mobContainer}>
                <div className={styles.music}>
                    <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                    <span className={styles.musicartt}>Musicart</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.arrowBox}onClick={handleBackToProducts}>
                        <img src={arrow} className={styles.arrow} />
                    </div>
                    <span className={styles.heading}>Checkout</span>

                </div>

                <div className={styles.deliveryBox}>
                    <span className={styles.addressLabel}>1.Delivery address</span>
                    <div className={styles.userDetails}>
                        <span className={styles.userName}>{username}</span>
                        <textarea className={styles.textArea} onChange={handleAddressChange} value={userData.address} />
                    </div>
                </div>
                <div className={styles.hr}></div>
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
                            {fetchedData.map((item, index) => (
                                <div key={index} className={styles.imgBox} onClick={() => handleItemClick(item)}>
                                    <img src={item.Images[0]} alt={`item-${index}`} className={styles.img} />
                                </div>
                            ))}
                        </div>

                        {selectedItem && (
                            <div className={styles.productDetails}>
                                <span className={styles.productName}>{selectedItem.ProductName}</span>
                                <span className={styles.color}>Color : {selectedItem.color}</span>
                                <span className={styles.estimated}>Estimated delivery:</span>
                                <span className={styles.estimated}>Monday — FREE Standard Delivery</span>
                            </div>
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
                    <span className={styles.totalOrderCost}>₹{totalAmount + 45}</span>
                </div>
                <div className={styles.buttonCon}>
                    <button className={styles.orderButton}onClick={handlePlaceOrder}>Place your order</button>
                </div>



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
                        <div className={styles.footerImgs} onClick={handleNavigate}>
                            <img src={logout} alt='img' className={styles.homeImg} />
                            <span className={styles.hometext}>Logout</span>
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
                        <div className={styles.home}>Home/Checkout</div>
                    </div>
                    <div className={styles.button}>
                        <button className={styles.backButton} onClick={handleBackToProducts}>Back to products</button>
                    </div>
                    <div className={styles.myCart}>
                        <div className={styles.heading}>
                            <span className={styles.checkout}><u>Checkout</u></span>
                        </div>
                        <div className={styles.checkoutBox}>
                            <div className={styles.left}>
                                <div className={styles.deliveryBox}>
                                    <span className={styles.addressLabel}>1. Delivery address</span>
                                    <div className={styles.userDetails}>
                                        <span className={styles.userName}>{username}</span>
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
                                            {fetchedData.map((item, index) => (
                                                <div key={index} className={styles.imgBox} onClick={() => handleItemClick(item)}>
                                                    <img src={item.Images[0]} alt={`item-${index}`} className={styles.img} />
                                                </div>
                                            ))}
                                        </div>

                                        {selectedItem && (
                                            <div className={styles.productDetails}>
                                                <span className={styles.productName}>{selectedItem.ProductName}</span>
                                                <span className={styles.color}>Color : {selectedItem.color}</span>
                                                <span className={styles.estimated}>Estimated delivery:</span>
                                                <span className={styles.estimated}>Monday — FREE Standard Delivery</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <hr />
                                <div className={styles.orderTotal}>
                                    <button className={styles.orderButton} onClick={handlePlaceOrder}>Place your order</button>
                                    <div className={styles.totalBox}>
                                        <span className={styles.total}>Order Total : ₹{totalAmount + 45}</span>
                                        <span className={styles.totalDesc}>By placing your order, you agree to Musicart privacy notice and conditions of use.</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.orderSummary}>
                                    <div className={styles.orderbox}>
                                        <button className={styles.orderbutton} onClick={handlePlaceOrder}>Place your order</button>
                                        <span className={styles.desc}>By placing your order, you agree to Musicart privacy <br />notice and conditions of use.</span>
                                    </div>
                                    <hr />
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

export default Checkout;