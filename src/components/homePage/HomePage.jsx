import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import callicon from '../../assets/callicon.png'
import musicIcon from '../../assets/musicIcon.png'
import girl from '../../assets/girl.png';
import searchIcon from '../../assets/searchIcon.png'
import gridView from '../../assets/gridView.png'
import listView from '../../assets/listView.png'
import headphn from '../../assets/headphn.png'
import gridViewList from '../../assets/gridViewList.png'
import listViewSelected from '../../assets/listViewSelected.png'


function HomePage() {
    const [grid, setgridView] = useState(true)
    const [list, setlistView] = useState(false)
    const [boxCount, setBoxCount] = useState(13);

    useEffect(() => {
        setBoxCount(13);
    }, []);

    const handleGridView = () => {
        setlistView(false)
        setgridView(true)
    }

    const handleListView = () => {
        setgridView(false)
        setlistView(true)
    }
    return (
        <div className={styles.homePage}>
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
                    <span className={styles.login}>Login</span>
                    <div className={styles.line}><b>|</b></div>
                    <span className={styles.signUp}>Sign Up</span>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.appName}>
                    <div className={styles.music}>
                        <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                        <span className={styles.musicartt}>Musicart</span>
                    </div>
                    <div className={styles.home}>Home</div>
                </div>
                <div className={styles.image}>
                    <p className={styles.imgText}><b>Grab upto 50% off on Selected headphones</b></p>
                    <img src={girl} className={styles.girl} />
                </div>

                <div className={styles.searchBar}>
                    <img src={searchIcon} alt="searchIcon" className={styles.searchIcon} />
                    <input type='text' placeholder='Search by Product Name' className={styles.input} />
                </div>

                <div className={styles.filter}>
                    <div className={styles.icon}>
                        {grid ? (<img src={gridView} className={styles.gridView} onClick={handleGridView} />) : (<img src={gridViewList} className={styles.gridView} onClick={handleGridView} />)}
                        {/* <img src={gridView} className={styles.gridView} onClick={handleGridView} /> */}
                        {!list ? (<img src={listView} className={styles.listView} onClick={handleListView} />) : (<img src={listViewSelected} className={styles.listView} onClick={handleListView} />)}
                        {/* <img src={listView} className={styles.listView} onClick={handleListView} /> */}
                    </div>
                    <div className={styles.dropDownBox}>
                        <div className={styles.dropDown}>
                            <select className={styles.filtering}>
                                <option value="" className={styles.options}>Headphone type</option>
                                <option value="option1" className={styles.options}>Option 1</option>
                                <option value="option2" className={styles.options}>Option 2</option>
                                <option value="option3" className={styles.options}>Option 3</option>
                            </select>
                        </div>
                        <div className={styles.dropDown}>
                            <select className={styles.filtering}>
                                <option value="" className={styles.options}>Company</option>
                                <option value="option1" className={styles.options}>Option 1</option>
                                <option value="option2" className={styles.options}>Option 2</option>
                                <option value="option3" className={styles.options}>Option 3</option>
                            </select>
                        </div>
                        <div className={styles.dropDown}>
                            <select className={styles.filtering}>
                                <option value="" className={styles.options}>Colour</option>
                                <option value="option1" className={styles.options}>Option 1</option>
                                <option value="option2" className={styles.options}>Option 2</option>
                                <option value="option3" className={styles.options}>Option 3</option>
                            </select>
                        </div>
                        <div className={styles.dropDown}>
                            <select className={styles.filtering}>
                                <option value="">Price</option>
                                <option value="option1" className={styles.options}>Option 1</option>
                                <option value="option2" className={styles.options}>Option 2</option>
                                <option value="option3" className={styles.options}>Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.sortBox}>
                        <select className={styles.filtering}>
                            <option value="" className={styles.options}>Sort by:Featured</option>
                            <option value="option1" className={styles.options}>Option 1</option>
                            <option value="option2" className={styles.options}>Option 2</option>
                            <option value="option3" className={styles.options}>Option 3</option>
                        </select>
                    </div>
                </div>
                {grid &&
                    <div className={styles.flexContainer}>
                        {[...Array(boxCount)].map((_, index) => (
                            <div className={styles.box} key={index}>
                                <div className={styles.imgBox}>
                                    <img src={headphn} alt="headphone" className={styles.productImg} />
                                </div>
                                <div className={styles.productDetails}>
                                    <span className={styles.productName}><b>boAt Rockerz 551ANC</b></span>
                                    <span className={styles.price}><b>Price - ₹3000</b></span>
                                    <div className={styles.headphnType}>
                                        <span className={styles.color}><b>Black</b><b> | </b><b>In-ear HeadPhone</b></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {list &&
                    <div className={styles.flexContainerlist}>
                        {[...Array(boxCount)].map(() => (
                            <div className={styles.boxlist}>
                                <div className={styles.imgBoxList}>
                                    <img src={headphn} alt="headphone" className={styles.productImgList} />
                                </div>
                                <div className={styles.productDetailsList}>
                                    <span className={styles.productNameList}><b>boAt Rockerz 551ANC</b></span>
                                    <span className={styles.price}><b>Price - ₹3000</b></span>
                                    <span className={styles.color}><b>Black</b><b> | </b><b>In-ear HeadPhone</b></span>
                                    <span className={styles.description}><b>boAt Rockerz 551 ANC with Hybrid ANC, 100 HRS Playback, 40mm Drivers & ASAP Charge
                                        Bluetooth Headset (Stellar Black, On the Ear)</b></span>
                                        <button className={styles.detailsButton}>Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                }

            </div>

            <div className={styles.footer}>
                <p className={styles.footerText}>Musicart | All rights reserved</p>
            </div>
        </div>

    )
}

export default HomePage;