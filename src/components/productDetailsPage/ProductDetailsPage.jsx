import { useState,useEffect } from 'react'
import styles from './ProductDetailsPage.module.css'
import callicon from '../../assets/callicon.png'
import musicIcon from '../../assets/musicIcon.png'
import cartIcon from '../../assets/cartIcon.png'
import headphn from '../../assets/headphn.png'
import searchIcon from '../../assets/searchIcon.png'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import 'react-icons/fa';
import arrow from '../../assets/arrow.png'
import { Carousel } from './carousel/Carousel'
import login from '../../assets/login.png'
import cartImg from '../../assets/cartImg.png'
import home from '../../assets/home.png'
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { getcount } from '../../../api/products'
import logout from '../../assets/logout.png'
import {updatequantity} from '../../../api/products'
import{updateCardStatus} from '../../../api/products'
import{updateDeliveryStatus} from '../../../api/products'



function ProductDetailsPage() {
    const navigate= useNavigate();
    const {state}=useLocation();
    const [cartcount, updatecount] = useState(0);
    const [status ,statusupdate]=useState(false);
    
    // const [selectedImage, setSelectedImage] = useState(null);

    // const handleImageClick = (index) => {
    //     setSelectedImage(formData.Images[index]);
    // };
    const [formData, setFormData] = useState({
        
        _id: state?.fetchedData?._id,
        headphone_type:state?.fetchedData?.headphone_type,
        company: state?.fetchedData?.company,
        color: state?.fetchedData?.color,
        price: state?.fetchedData?.price,
        rating: state?.fetchedData?.rating,
        about: state?.fetchedData?.about,
        available: state?.fetchedData?.available,
        ProductName: state?.fetchedData?.ProductName,
        Images: state?.fetchedData?.Images,
        product_description: state?.fetchedData?.product_description,
        review: state?.fetchedData?.review,
       
    });
    // console.log(formData)
    // console.log(state)
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
    let rating = formData.rating;
    // Determine the number of filled stars
    const filledStars = Math.floor(rating);
    // Determine if there is a half-filled star
    const hasHalfStar = rating - filledStars >= 0.5;

    const renderStars = () => {
        let stars = [];

        // Filled stars
        for (let i = 0; i < filledStars; i++) {
            stars.push(<FaStar key={i} color="#FFD600" size={25} />);
        }

        // Half-filled star
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half-star" color="#FFD600" size={25} />);
        }

        // Empty stars
        const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<FaRegStar key={`empty-star-${i}`} color="#FFD600" size={25} />);
        }

        return stars;
    };
    const renderAbout = () => {
        if (!formData.about) return null;

        // Split the about text by newline and render each line as <li>
        return formData.about.split('\n').map((line, index) => (
            <li key={index}>{line}</li>
        ));
    };
const BacktoProducts=()=>{
    navigate('/');
}
const cartnavigation =()=>{
    if (status){
        navigate('/MyCart')
    }
   
}

const fetchData = async () => {
    try {
        const response = await getcount();
        console.log('Response:', response); // Log the entire response object to inspect its structure
        
        // Check if response is not null/undefined and contains the expected property
        if (response && response.cardStatusQuantity !== undefined) {
            console.log(`API count response: ${response.cardStatusQuantity}`);
            updatecount(response.cardStatusQuantity);
        } else {
            console.log('Unexpected response format');
        }
    } catch (error) {
        console.log('Error:', error);
    }
};
useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        statusupdate(true);
    }
}, []);


useEffect(() => {
    fetchData();
}, [formData]);

const changefunction = async (_id) => {
    if(!status){
        navigate('/login')
    }
    console.log(_id);
    const response = await updatequantity(_id);
    const response2 = await updateCardStatus(_id);
    const response3 = await updateDeliveryStatus(_id);
    console.log(response3)
    console.log(response2);
    console.log(response);
    fetchData();
    if (status){
        navigate('/MyCart')
    }

};


const handleNavigate = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('./MyCart')
}
const changefunctions = async (_id) => {
    if(!status){
        navigate('/login')
    }
    console.log(_id);
    const response = await updatequantity(_id);
    const response2 = await updateCardStatus(_id);
    const response3 = await updateDeliveryStatus(_id);
    console.log(response3);
    console.log(response2);
    console.log(response);
    fetchData();
   

};
const handleRefreshClick = () => {
    window.location.reload();
  };

const Logout =()=>{
    
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    handleRefreshClick();

}
const Login =()=>{
    navigate('/login')
}

const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImage(formData.Images[index]);
    };
    return (
        <div>
            {isMobile?( <div className={styles.mobContainer}>
            <div className={styles.navBarMob}>
                    <div className={styles.searchBox}>
                        <img src={searchIcon} alt="searchIcon" className={styles.searchIcon} />
                        <input type='text' placeholder='Search Musicart' className={styles.search} />
                    </div>
                </div>

            <div className={styles.contentMob}>
            <div className={styles.arrowBox}>
                <img src={arrow} className={styles.arrow}onClick={BacktoProducts}/>
            </div>
            <button className={styles.buyButton}onClick={() => changefunction(formData._id)}>Buy Now</button>
            <div className={styles.carousel}>
            <Carousel data ={formData.Images}/>
            </div>

            <div className={styles.right}>
                    <div className={styles.info}>
                    <span className={styles.productName}><strong> {formData.ProductName}</strong></span>
                    <div className={styles.starsBox}> {renderStars()}
                    <span className={styles.reviews}>({formData.review} customer reviews)</span> </div>
                    <div className={styles.desc}>{formData.product_description}</div>
                    <span className={styles.price}>Price - ₹{formData.price}</span>
                    <span className={styles.color}>{formData.color} |  {formData.headphone_type}</span>
                    <span className={styles.about}>About this item</span>
                    <ul className={styles.descList}>
                    {renderAbout()}
                    </ul>
                    <span className={styles.available}><strong>Available</strong> - {formData.available}</span>
                    <span className={styles.brand}><strong>Brand</strong> - {formData.company}</span>
                    </div>
                    <div className={styles.cartbutton}>
                    <button className={styles.add}onClick={() => changefunctions(formData._id)}>Add to Cart</button>
                    <button className={styles.buy}onClick={() => changefunction(formData._id)}>Buy Now</button>
                    </div>

                </div>


            {/* <div> </div> */}
            </div>
            <div className={styles.footerBox}>
                <hr/>
                <div className={styles.footerMob}>
                    <div className={styles.footerImgs}>
                    <div className={styles.bar}></div>
                    <img src={home} alt='img'className={styles.homeImg}/>
                    <span className={styles.hometext}>Home</span>
                    </div>
                    <div className={styles.footerImgs} onClick={handleNavigate}>
                    <span className={styles.cartCount}>{cartcount}</span>   
                    <img src={cartImg} alt='img'className={styles.homeImg}/>
                    <span className={styles.hometext }onClick={changefunction}>Cart</span>
                    </div>
                    {status?(<div className={styles.footerImgs}onClick={Logout}>
                                <img src={logout} alt='img' className={styles.homeImg} />
                                <span className={styles.hometext}>Logout</span>
                            </div>):(<div className={styles.footerImgs}onClick={Login}>
                                <img src={login} alt='img' className={styles.homeImg} />
                                <span className={styles.hometext}>Login</span>
                            </div>)} 
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
                    {status ? (
                        <span className={styles.login}onClick={Logout}>Logout</span>
                    ) : (
                        <span className={styles.login}onClick={Login}>Login</span>
                    )}
                </div>
            </div>
            <div className={styles.productDetailsBox}>
                <div className={styles.appName}>
                    <div className={styles.music}>
                        <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                        <span className={styles.musicartt}>Musicart</span>
                    </div>
                    <div className={styles.home}>Home/{formData.ProductName}</div>
                    {status && (
                    <div className={styles.viewCart}>
                        <img src={cartIcon} alt='cartIcon' className={styles.cartIcon}onClick={cartnavigation} />
                        <span className={styles.viewCartText}onClick={cartnavigation}>View Cart {cartcount} </span>
                    </div>
                )}
                </div>
                <div className={styles.button}>
                    <button className={styles.backButton}onClick={BacktoProducts}>Back to products</button>
                </div>
                <div className={styles.desc}><b> {formData.product_description}</b></div>
                <div className={styles.images}>
                    <div className={styles.left}>

                       <div className={styles.imagesContainer}>
                <img src={selectedImage || formData.Images[0]} className={styles.headphone} />
            </div>
            <div className={styles.imagesBox}>
                {formData.Images.slice(1).map((image, index) => (
                    <div className={styles.imgborder} key={index}>
                        <img
                            src={image}
                            className={styles.headphone}
                            onClick={() => handleImageClick(index + 1)} // Adjust index since we are slicing
                        />
                    </div>
                ))}
            </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.info}>
                        <span className={styles.productName}><strong>{formData.ProductName}</strong></span>
                        <div className={styles.starsBox}> {renderStars()}
                        <span className={styles.reviews}>({formData.review} customer reviews)</span> </div>
                        <span className={styles.price}><b>Price -  ₹ {formData.price}</b></span>
                        <span className={styles.color}> {formData.color} | {formData.headphone_type}</span>
                        <span className={styles.about}>About this item</span>
                        <ul className={styles.descList}>
                            {renderAbout()}
                        </ul>
                        <span className={styles.available}><strong>Available</strong> - {formData.available}</span>
                        <span className={styles.brand}><strong>Brand</strong> - {formData.company}</span>
                        <div className={styles.cartbutton}>
                        <button className={styles.add}onClick={() => changefunctions(formData._id)}>Add to Cart</button>
                       
                        <button className={styles.buy} onClick={() => changefunction(formData._id)}>Buy Now</button>

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

export default ProductDetailsPage;
