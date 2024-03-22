import styles from './MyCart.module.css'
import callicon from '../../assets/callicon.png'
import musicIcon from '../../assets/musicIcon.png'
import cartIcon from '../../assets/cartIcon.png'
import bagIcon from '../../assets/bagIcon.png' 
import headphn from '../../assets/headphn.png'


    function MyCart() {
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
                        <button className={styles.backButton}>Back to products</button>
                    </div>
                    <div className={styles.myCart}>
                        <div className={styles.heading}>
                            <img src={bagIcon} alt='bag Icon' className={styles.bagIcon}/>
                        <span className={styles.myCartText}>My Cart</span>
                        </div>
                        <div className={styles.cartBox}>
                            <div className={styles.left}>
                                <hr/>
                                <div className={styles.productCart}>
                                <div className={styles.product}>
                                    <img src={headphn} className={styles.headphone}/>
                                    <div className={styles.productDetails}>
                                       
                                        <span className={styles.productName}> <strong>Sony WH-CHH51</strong></span>
                                        <span className={styles.color}> Color : Black</span>
                                        <span className={styles.stock}>In Stock</span>
                                    </div>
                                    <div className={styles.priceBox}>
                                    <span className={styles.priceText}><strong>Price</strong></span>
                                    <span className={styles.price}>₹3000</span>
                                    </div>
                                    <div className={styles.quantityBox}>
                                        <span className={styles.quantityText}><strong>Quantity</strong></span>
                                        <select className={styles.options}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                        </select>
                                    </div>
                                    <div className={styles.totalBox}>
                                    <span className={styles.total}><strong>Total</strong></span>
                                    <span className={styles.totalAmount}>₹3000</span>
                                    </div>
                                   
                                </div>
                                <div className={styles.product}>
                                    <img src={headphn} className={styles.headphone}/>
                                    <div className={styles.productDetails}>
                                       
                                        <span className={styles.productName}> <strong>Sony WH-CHH51</strong></span>
                                        <span className={styles.color}> Color : Black</span>
                                        <span className={styles.stock}>In Stock</span>
                                    </div>
                                    <div className={styles.priceBox}>
                                    <span className={styles.priceText}><strong>Price</strong></span>
                                    <span className={styles.price}>₹3000</span>
                                    </div>
                                    <div className={styles.quantityBox}>
                                        <span className={styles.quantityText}><strong>Quantity</strong></span>
                                        <select className={styles.options}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                        </select>
                                    </div>
                                    <div className={styles.totalBox}>
                                    <span className={styles.total}><strong>Total</strong></span>
                                    <span className={styles.totalAmount}>₹3000</span>
                                    </div>
                                   
                                </div>
                                <div className={styles.product}>
                                    <img src={headphn} className={styles.headphone}/>
                                    <div className={styles.productDetails}>
                                       
                                        <span className={styles.productName}> <strong>Sony WH-CHH51</strong></span>
                                        <span className={styles.color}> Color : Black</span>
                                        <span className={styles.stock}>In Stock</span>
                                    </div>
                                    <div className={styles.priceBox}>
                                    <span className={styles.priceText}><strong>Price</strong></span>
                                    <span className={styles.price}>₹3000</span>
                                    </div>
                                    <div className={styles.quantityBox}>
                                        <span className={styles.quantityText}><strong>Quantity</strong></span>
                                        <select className={styles.options}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                        </select>
                                    </div>
                                    <div className={styles.totalBox}>
                                    <span className={styles.total}><strong>Total</strong></span>
                                    <span className={styles.totalAmount}>₹3000</span>
                                    </div>
                                   
                                </div>
                                <div className={styles.product}>
                                    <img src={headphn} className={styles.headphone}/>
                                    <div className={styles.productDetails}>
                                       
                                        <span className={styles.productName}> <strong>Sony WH-CHH51</strong></span>
                                        <span className={styles.color}> Color : Black</span>
                                        <span className={styles.stock}>In Stock</span>
                                    </div>
                                    <div className={styles.priceBox}>
                                    <span className={styles.priceText}><strong>Price</strong></span>
                                    <span className={styles.price}>₹3000</span>
                                    </div>
                                    <div className={styles.quantityBox}>
                                        <span className={styles.quantityText}><strong>Quantity</strong></span>
                                        <select className={styles.options}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                        </select>
                                    </div>
                                    <div className={styles.totalBox}>
                                    <span className={styles.total}><strong>Total</strong></span>
                                    <span className={styles.totalAmount}>₹3000</span>
                                    </div>
                                   
                                </div>
                                </div>
                                <hr/>
                                <div className={styles.bottom}>
                                <span className={styles.count}>1 Item</span>
                                <span className={styles.sum}>₹3000</span>
                                </div>
                            </div>
                            <div className={styles.right}>
                                {/* <div></div> */}
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

export default MyCart;