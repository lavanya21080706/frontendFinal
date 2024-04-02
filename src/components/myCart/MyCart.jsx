import { useState, useEffect } from 'react'
import styles from './MyCart.module.css'
import callicon from '../../assets/callicon.png'
import musicIcon from '../../assets/musicIcon.png'
import cartIcon from '../../assets/cartIcon.png'
import bagIcon from '../../assets/bagIcon.png'
import headphn from '../../assets/headphn.png'
import arrow from '../../assets/arrow.png'
import logout from '../../assets/logout.png'
import cartImg from '../../assets/cartImg.png'
import home from '../../assets/home.png'
import searchIcon from '../../assets/searchIcon.png'
import {useNavigate} from 'react-router-dom'
import {productdata} from '../../../api/products'
import{quantityupdate} from '../../../api/products'



function MyCart() {
    const navigate= useNavigate();
    const [fetchedData, setFetchedData] = useState([
        {
            _id:'',
            headphone_type:'',
            company:'',
            color:'',
            price:'',
            rating:'',
            about:'',
            available:'',
            ProductName:'',
            Images:[''],
            product_description:'',
            review:'',
            fee:'',
            discount:'',
          
        }
    ]);
// console.log(`fetched data is ${fetchedData  }`)

    const fetchData = async () => {
        try {
            const response = await productdata();
            console.log('Response:', response.data); // Log the entire response object to inspect its structure
            const responseData = response.data;
            const formattedData = responseData.map(item => ({
                            ...item,
                            Images: item.Images.map(image => image) // Assuming Images field is an array of strings in the response
                        }));
                        setFetchedData(formattedData);
                    } catch (error) {
                             console.error('Error fetching data:', error);
                     }
  
                    }
    useEffect(() => {
    }, [fetchedData]); 
    useEffect(() => {
        fetchData();
    }, []);
    const navigation=()=>{
        navigate('/')
    }
    const handleChangeQuantity = async (_id, value) => {
        try {
            const apiresponse = await quantityupdate(_id, { quantity: value });
            console.log(apiresponse);
            fetchData();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };
    const totalAmount = fetchedData.reduce((total, item) => total + (item.price * item.Quantity), 0);

  
    const checkoutnaviagte = () => {
       
            navigate('/checkout', { state: { totalAmount: totalAmount } });
        
        
        
    }

    const navigateBack =()=>{
        localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login')
    }
    const Login =()=>{
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
    const totalQuantity = fetchedData.reduce((total, item) => total + item.Quantity, 0);
    return (
        <div>
             {isMobile?(<div className={styles.mobContainer}>
            <div className={styles.navBarMob}>
                <div className={styles.searchBox}>
                    <img src={searchIcon} alt="searchIcon" className={styles.searchIcon} />
                    <input type='text' placeholder='Search Musicart' className={styles.search} />
                </div>
            </div>

            <div className={styles.contentMob}>
                <div className={styles.arrowBox}onClick={navigation}>
                    <img src={arrow} className={styles.arrow} />
                </div>
               
            {fetchedData.map((item, index) => (
                <div className={styles.productBox} key={index}>
                    <img src={item.Images[0]} className={styles.headimg} />
                    <div className={styles.productDetailsBox}>
                        <span className={styles.productName}><strong>{item.ProductName}</strong></span>
                        <span className={styles.price}><strong>₹{item.price}</strong></span>
                        <span className={styles.color}> Color: {item.color}</span>
                        <span className={styles.stock}>In Stock</span>
                        <div className={styles.fee}>
                            <span className={styles.same}>Convenience Fee</span>

                            <span className={styles.rate}>₹45</span>
                            
                        </div>
                        <div className={styles.tot}>
                        <span className={styles.amo}>Total:</span>
                        <span className={styles.ta}><strong>₹{item.price * item.Quantity}</strong></span>
                    </div>
                    </div>
                    
                    
                </div>
            ))}
        {/* </div> */}
                <div className={styles.hr}/>

                <div className={styles.totamo}>
                    <span className={styles.textTot}>Total Amount <strong>₹{totalAmount}</strong></span>
                </div>
                <button className={styles.placeOrder}onClick={checkoutnaviagte}>PLACE ORDER</button>
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
                    <span className={styles.cartCount}>{totalQuantity}</span> 
                        <img src={cartImg} alt='img' className={styles.homeImg} />
                        <span className={styles.hometext}>Cart</span>
                    </div>
                    <div className={styles.footerImgs} onClick={navigateBack}>
                        <img src={logout} alt='img' className={styles.homeImg} />
                        <span className={styles.hometext}>Logout</span>
                    </div>
                </div>
            </div>
        </div>):( <div className={styles.container}>
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
                    <div className={styles.home}>Home/View Cart</div>
                    <div className={styles.viewCart}>
                        <img src={cartIcon} alt='cartIcon' className={styles.cartIcon} />
                        <span className={styles.viewCartText}>View Cart</span>
                    </div>
                </div>
                <div className={styles.button}>
                    <button className={styles.backButton}onClick={navigation}>Back to products</button>
                </div>
                <div className={styles.myCart}>
                    <div className={styles.heading}>
                        <img src={bagIcon} alt='bag Icon' className={styles.bagIcon} />
                        <span className={styles.myCartText}>My Cart</span>
                    </div>
                    <div className={styles.cartBox}>
    <div className={styles.left}>
        <hr />
        <div className={styles.productCart}>
            {fetchedData.map((item, index) => (
                <div className={styles.product} key={index}>
                    <img src={item.Images[0]} className={styles.headphone} />
                    <div className={styles.productDetails}>
                        <span className={styles.productName}><strong>{item.ProductName}</strong></span>
                        <span className={styles.color}> Color: {item.color}</span>
                        <span className={styles.stock}>In Stock</span>
                    </div>
                    <div className={styles.priceBox}>
                        <span className={styles.priceText}><strong>Price</strong></span>
                        <span className={styles.price}>₹{item.price}</span>
                    </div>
                    <div className={styles.quantityBox}>
                        <span className={styles.quantityText}><strong>Quantity</strong></span>
                        <select
    className={styles.options}
    value={item.Quantity} // Set the value attribute to item.Quantity
    onChange={e => handleChangeQuantity(item._id, e.target.value)}
>
    {Array.from({ length: 8 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
            {i + 1}
        </option>
    ))}
</select>


                    </div>
                    <div className={styles.totalBox}>
                        <span className={styles.total}><strong>Total</strong></span>
                        <span className={styles.totalAmount}>{item.price * item.Quantity}</span>
                    </div>
                </div>
            ))}
        </div>
        <hr />
        <div className={styles.bottom}>
        <span className={styles.count}>{fetchedData.length} Item{fetchedData.length !== 1 ? 's' : ''}</span>

        <span className={styles.sum}>₹{totalAmount}</span>
        </div>
    </div>
    <div className={styles.right}>
        <hr className={styles.vertical} />
        <div className={styles.priceContainer}>
            <span className={styles.priceDetails}><strong>PRICE DETAILS</strong></span>
            <div className={styles.totalMrp}>
                <span className={styles.same}>Total MRP</span>
                <span className={styles.tmrp}>₹{totalAmount}</span>
            </div>
            <div className={styles.discount}>
                <span className={styles.same}>Discount on MRP</span>
                <span className={styles.discountRate}>₹0</span>
            </div>
            <div className={styles.fee}>
                <span className={styles.same}>Convenience Fee</span>
                <span className={styles.rate}>₹45</span>
            </div>
            <div className={styles.tot}>
                <span className={styles.amo}><strong>Total Amount</strong></span>
                <span className={styles.ta}>{totalAmount+45}</span>
            </div>
            <button className={styles.placeOrder}onClick={checkoutnaviagte}>Place Order</button>
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
 
export default MyCart;

