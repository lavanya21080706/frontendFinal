import styles from './ProductDetailsPage.module.css'
import callicon from '../../assets/callicon.png'
import musicIcon from '../../assets/musicIcon.png'
import cartIcon from '../../assets/cartIcon.png'
import headphn from '../../assets/headphn.png'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import 'react-icons/fa';



function ProductDetailsPage() {

    let rating = 3.5;
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
    return (
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
                    <span className={styles.login}>Logout</span>
                </div>
            </div>
            <div className={styles.productDetailsBox}>
                <div className={styles.appName}>
                    <div className={styles.music}>
                        <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                        <span className={styles.musicartt}>Musicart</span>
                    </div>
                    <div className={styles.home}>Home/boat Rockerz 550c</div>
                    <div className={styles.viewCart}>
                        <img src={cartIcon} alt='cartIcon' className={styles.cartIcon} />
                        <span className={styles.viewCartText}>View Cart 0</span>
                    </div>
                </div>
                <div className={styles.button}>
                    <button className={styles.backButton}>Back to products</button>
                </div>
                <div className={styles.desc}><b>Sony WH-CH720N, Wireless Over-Ear Active Noise Cancellation Headphones with Mic, up to 50 Hours Playtime, Multi-Point Connection, App Support, AUX & Voice Assistant Support for Mobile Phones (Black)</b></div>
                <div className={styles.images}>
                    <div className={styles.left}>
                        <div className={styles.imagesContainer}>
                            <img src={headphn} className={styles.headphone} />
                        </div>
                        <div className={styles.imagesBox}>
                            <div className={styles.imgborder}>
                                <img src={headphn} className={styles.headphone} />
                            </div>
                            <div className={styles.imgborder}>
                                <img src={headphn} className={styles.headphone} />
                            </div>
                            <div className={styles.imgborder}>
                                <img src={headphn} className={styles.headphone} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.info}>
                        <span className={styles.productName}><strong> Sony WH-CH720N</strong></span>
                        <div className={styles.starsBox}> {renderStars()}
                        <span className={styles.reviews}>(50 customer reviews)</span> </div>
                        <span className={styles.price}><b>Price - ₹3000</b></span>
                        <span className={styles.color}>Black |  In-ear HeadPhone</span>
                        <span className={styles.about}>About this item</span>
                        <ul className={styles.descList}>
                        {/* About this item */}
                            <li>
                                Sony’s lightest Wireless Noise-cancelling headband
                                ever
                            </li>
                            <li>Up to 50-hour battery life with quick charging (3 min
                                charge for up to 1 hour of playback)</li>
                            <li>Multi-Point Connection helps to pair with two
                                Bluetooth devices at the same time</li>
                            <li>Take noise cancelling to the next level with Sony’s</li>
                            <li>Integrated Processor V1,so you can fully immerse
                                yourself in the music</li>
                            <li>Super comfortable and lightweight design
                                ( 192 Grams )</li>
                            <li>High sound quality and well-balanced sound tuning</li>
                        </ul>
                        <span className={styles.available}><strong>Available</strong> - In stock</span>
                        <span className={styles.brand}><strong>Brand</strong> - Sony</span>
                        </div>
                        <div className={styles.cartbutton}>
                        <button className={styles.add}>Add to Cart</button>
                        <button className={styles.buy}>Buy Now</button>
                        </div>

                    </div>

                </div>
            </div>
            <div className={styles.footer}>
                <p className={styles.footerText}>Musicart | All rights reserved</p>
            </div>
        </div>
    )
}

export default ProductDetailsPage;