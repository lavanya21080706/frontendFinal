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
import girlMob from '../../assets/girlMob.png'
import cart from '../../assets/cart.png'
import login from '../../assets/login.png'
import logout from '../../assets/logout.png'
import cartImg from '../../assets/cartImg.png'
import home from '../../assets/home.png'
import feedback from '../../assets/feedback.png'
import invoiceFooter from '../../assets/invoiceFoot.png'
import cartIcon from '../../assets/cartIcon.png'
import { useNavigate } from 'react-router-dom';
import { getdata } from '../../../api/products'
import { updatequantity } from '../../../api/products'
import { updateCardStatus } from '../../../api/products'
import { updateDeliveryStatus } from '../../../api/products'
import { getcount } from '../../../api/products';
import { feedbackpost } from '../../../api/feedback';

function HomePage() {
    const navigate = useNavigate();
    const [grid, setgridView] = useState(true)
    const [list, setlistView] = useState(false)
    const [boxCount, setBoxCount] = useState(13);
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [showCompany, setShowCompany] = useState(true);
    const [showColor, setShowColor] = useState(true);
    const [showprice, setShowprice] = useState(true);
    const [showsort, setShowsort] = useState(true);
    const [showCart, setShowCart] = useState(false);
    const [count, updatecount] = useState(0)

    const [filters, setFilters] = useState({
        headphone_type: '',
        company: '',
        color: '',
        price: '',
        sort: '',
        Productsearch: '',
    });
    const [fetchedData, setFetchedData] = useState([
        {
            _id: '',
            headphone_type: '',
            company: '',
            color: '',
            price: '',
            rating: '',
            about: '',
            available: '',
            ProductName: '',
            Images: [''],
            product_description: '',
            review: '',

        }
    ]);

    const changefunction = async (_id) => {
        console.log(_id);
        const response = await updatequantity(_id);
        const response2 = await updateCardStatus(_id);
        const response3 = await updateDeliveryStatus(_id);
        console.log(response3)
        console.log(response2);
        console.log(response);
        fetchData2();
    };
    const fetchData2 = async () => {
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
        fetchData2();
    });
    const handleSelectClick = (event) => {
        const selectedValue = event.target.value;
        setFilters(prevFilters => ({
            ...prevFilters,
            headphone_type: selectedValue
        }));
        setShowPlaceholder(false);
    };

    const handleSelectClick2 = (event) => {
        const selectedValue = event.target.value;
        setFilters(prevFilters => ({
            ...prevFilters,
            company: selectedValue
        }));
        setShowCompany(false);
    };

    const handleSelectClick3 = (event) => {
        const selectedValue = event.target.value;
        setFilters(prevFilters => ({
            ...prevFilters,
            color: selectedValue
        }));
        setShowColor(false);
    };

    const handleSelectClick4 = (event) => {
        const selectedValue = event.target.value;
        setFilters(prevFilters => ({
            ...prevFilters,
            price: selectedValue
        }));
        setShowprice(false);
    };

    const handleSelectClick5 = (event) => {
        const selectedValue = event.target.value;
        setFilters(prevFilters => ({
            ...prevFilters,
            sort: selectedValue
        }));
        setShowsort(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setShowCart(true);
        }
    }, []); // Check token existence on initial render

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
    const login_navigating = () => {
        navigate('/login')
    }
    const register_navigating = () => {
        navigate('/register')
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchData();
    }, [filters]); // Fetch data whenever filters change

    useEffect(() => {
    }, [fetchedData]);


    const fetchData = async () => {
        try {
            const response = await getdata(filters.headphone_type, filters.company, filters.color, filters.price, filters.sort, filters.Productsearch);
            console.log('Response data:', response.data); // Log response data
            const responseData = response.data.data; // Access the data property
            const formattedData = responseData.map(item => ({
                ...item,
                Images: item.Images.map(image => image) // Assuming Images field is an array of strings in the response
            }));
            setFetchedData(formattedData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const Productpage = (index) => {
        const clickedItem = fetchedData[index];
        console.log(clickedItem); // Log particular product details
        navigate(`/ProductDetails`, { state: { fetchedData: clickedItem } });
    }


    const invoicenavigate = () => {
        navigate('/MyInVoice')
    }
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    // const [isFormVisible, setIsFormVisible] = useState(false);
    const [profile, setProfile] = useState(false);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        feedbackType: '',
        feedback: ''
    });
    const [errors, setErrors] = useState({
        feedbackType: '',
        feedback: ''
    });
    useEffect(() => {
        setBoxCount(13);
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // const toggleFormVisibility = () => {
    //     setIsFormVisible(!isFormVisible);
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form fields
        let errors = {};
        if (!formData.feedbackType) {
            errors.feedbackType = '*Required Field';
        }
        if (!formData.feedback.trim()) {
            errors.feedback = '*Required Field';
        }
        if (Object.keys(errors).length === 0) {
            // Submit form data
            console.log('Form submitted:', formData);
            setFormData({ feedbackType: '', feedback: '' });
            setIsFormVisible(false);
        } else {
            setErrors(errors);
        }
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const toggle = () => {
        setProfile(!profile)
    }


    const name = localStorage.getItem('username');

    const getInitials = (name) => {
        const words = name?.split(' ');
        const initials = words?.map(word => word.charAt(0).toUpperCase());
        return initials?.join('');
    };
    const feedbacksubmit = async () => {
        const response = await feedbackpost({ ...formData })
        console.log(response);
    }
    const handleRefreshClick = () => {
        window.location.reload();
    };
    const logoutfun = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        handleRefreshClick();

    }
    const navigatecart = () => {
        if (showCart) {
            navigate('/MyCart')
        }
        else {
            navigate('/login')
        }

    }

    const cartnavigation =()=>{
        navigate('/MyCart')
    }
    return (
        <div>
            {isMobile ? (<div className={styles.mobContainer}>
                <div className={styles.navBarMob}>
                    <div className={styles.searchBox}>
                        <img src={searchIcon} alt="searchIcon" className={styles.searchIcon} />

                        <input
                            type='text'
                            placeholder='Search by Product Name'
                            className={styles.search}
                            name="Productsearch"
                            value={filters.Productsearch}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className={styles.bodybox}>
                    <div className={styles.content}>
                        <div className={styles.imageMob}>
                            <div className={styles.textBox}>
                                <p className={styles.imgTextMob}><b>Grab upto 50% off on Selected headphones</b></p>
                                <button className={styles.buynow}>Buy Now</button>
                            </div>
                            <img src={girl} className={styles.girlMob} />
                        </div>
                        <div className={styles.filter}>

                            <div className={styles.sortBoxMob}>
                                <select className={styles.filtering} onClick={handleSelectClick5}
                                    defaultValue="">
                                    {showsort && (
                                        <option value="" disabled selected className={styles.placeholder}>
                                            Sort by
                                        </option>
                                    )}
                                    {/* <option value="" className={styles.options}></option> */}
                                    <option value="featured" disabled>
                                        Featured
                                    </option>
                                    <option value="Lowest" className={styles.options}>Price: Lowest</option>
                                    <option value="Highest" className={styles.options}>Price: Highest</option>
                                    <option value="A-Z" className={styles.options}>Name: (A-Z)</option>
                                    <option value="Z-A" className={styles.options}>Name: (Z-A)</option>
                                </select>
                            </div>
                            <div className={styles.filterBox}>
                                <div className={styles.dropDown}>

                                    <select
                                        className={styles.filtering}
                                        onClick={handleSelectClick}
                                        defaultValue=""
                                    >
                                        {showPlaceholder && (
                                            <option value="" disabled selected className={styles.placeholder}>
                                                Headphone type
                                            </option>
                                        )}
                                        <option value="featured" disabled>
                                            Featured
                                        </option>
                                        <option value="In-ear headphone" className={styles.options}>
                                            In-ear headphone
                                        </option>
                                        <option value="On-ear headphone" className={styles.options}>
                                            On-ear headphone
                                        </option>
                                        <option value="Over-ear headphone" className={styles.options}>
                                            Over-ear headphone
                                        </option>
                                    </select>


                                </div>
                                <div className={styles.dropDown}>
                                    <select className={styles.filtering} onClick={handleSelectClick2}
                                        defaultValue="">
                                        {showCompany && (
                                            <option value="" disabled selected className={styles.placeholder}>
                                                Company
                                            </option>
                                        )}
                                        <option value="featured" disabled>
                                            Featured
                                        </option>
                                        <option value="BOAT" className={styles.options}>BOAT</option>
                                        <option value="Sony" className={styles.options}>Sony</option>
                                        <option value="Marshall" className={styles.options}>Marshall</option>
                                        <option value="Noise" className={styles.options}>Noise</option>
                                        <option value="MOVSSOU" className={styles.options}>MOVSSOU</option>
                                        <option value="JBL" className={styles.options}>JBL</option>
                                        <option value="Soul Electronics" className={styles.options}>Soul Electronics</option>
                                        <option value="KVIDIO" className={styles.options}>KVIDIO</option>
                                        <option value="JBL" className={styles.options}>JBL</option>
                                        
                                        
                                        
                                        
                                        
                                       

                                    </select>
                                </div>
                                <div className={styles.dropDown}>
                                    <select
                                        className={styles.filtering}
                                        onClick={handleSelectClick3}
                                        defaultValue=""
                                    >
                                        {showColor && (
                                            <option value="" disabled selected className={styles.placeholder}>
                                                Colour
                                            </option>
                                        )}
                                        <option value="featured" disabled>
                                            Featured
                                        </option>

                                        <option value="Black" className={styles.options}>Black</option>
                                        <option value="Blue" className={styles.options}>Blue</option>
                                        <option value="Red" className={styles.options}>Furious Red</option>
                                        <option value="BEIGE" className={styles.options}>BEIGE</option>
                                        <option value="White" className={styles.options}>White</option>
                                        <option value="Brown" className={styles.options}>Brown</option>
                                    </select>
                                </div>
                                <div className={styles.dropDown}>
                                    <select
                                        className={styles.filtering}
                                        onClick={handleSelectClick4}
                                        defaultValue=""
                                    >
                                        {showprice && (
                                            <option value="" disabled selected className={styles.placeholder}>
                                                Price
                                            </option>
                                        )}
                                        <option value="featured" disabled>
                                            Featured
                                        </option>
                                        <option value="1" className={styles.options}>₹0- ₹1,000</option>
                                        <option value="2" className={styles.options}>₹1,000-₹10,000</option>
                                        <option value="3" className={styles.options}>₹10,000-₹20,000</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.productsBox}>
                        {fetchedData.map((item, index) => (
                            <div className={styles.box} key={index}>
                                <div className={styles.imgBox}>
                                    <img src={item.Images[0]} alt="headphone" className={showCart ? styles.productImgWithCart : styles.productImg} onClick={() => Productpage(index)} />
                                    {showCart && <img src={cart} alt="cart" className={styles.cartimage} onClick={() => changefunction(item._id)} />}                </div>
                                <div className={styles.productDetails}>
                                    <span className={styles.productName}><b>{item.ProductName}</b></span>
                                    <span className={styles.price}><b>Price - ₹{item.price}</b></span>
                                    <div className={styles.headphnType}>
                                        <span className={styles.color}><b>{item.color}</b><b> | </b><b>{item.headphone_type}</b></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className={styles.footerBox}>
                    <hr />
                    <div className={styles.footerMob}>
                        <div className={styles.footerImgs}>
                            <div className={styles.bar}></div>
                            <img src={home} alt='img' className={styles.homeImg} />
                            <span className={styles.hometext}>Home</span>
                        </div>
                        <div className={styles.footerImgs} onClick={navigatecart}>
                            <span className={styles.cartCount}>{count}</span>
                            <img src={cartImg} alt='img' className={styles.homeImg} />
                            <span className={styles.hometext}>Cart</span>
                        </div>
                        <div className={styles.footerImgs} onClick={invoicenavigate}>
                            <img src={invoiceFooter} alt='img' className={styles.homeImg} />
                            <span className={styles.hometext}>Invoice</span>
                        </div>
                        {showCart ? (<div className={styles.footerImgs} onClick={logoutfun}>
                            <img src={logout} alt='img' className={styles.homeImg} />
                            <span className={styles.hometext}>Logout</span>
                        </div>) : (<div className={styles.footerImgs} onClick={login_navigating}>
                            <img src={login} alt='img' className={styles.homeImg} />
                            <span className={styles.hometext}>Login</span>
                        </div>)}
                    </div>
                </div>
            </div>


            ) : (
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
                            {!showCart && (
                                <>
                                    <span className={styles.login} onClick={login_navigating}>Login</span>
                                    <div className={styles.line}><b>|</b></div>
                                    <span className={styles.signUp} onClick={register_navigating}>Sign Up</span>
                                </>
                          
                            )}
                        </div>

                    </div>

                    <div className={styles.container}>
                        <div className={styles.appName}>
                            <div className={styles.loggedOut}><div className={styles.music}>
                                <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                                <span className={styles.musicartt}>Musicart</span>
                            </div>
                                <div className={styles.home}>Home   <span onClick={invoicenavigate}>Invoice</span></div></div>
                            <div className={styles.loggedin}>
                                {showCart && (
                                    <div className={styles.viewCart} onClick={cartnavigation}>
                                        <img src={cartIcon} alt='cartIcon' className={styles.cartIcon} />
                                        <span className={styles.viewCartText}>View Cart {count}</span>
                                    </div>
                                )}

                                <div>
                                    {showCart && (
                                        <div className={styles.profile} onClick={toggle}>
                                            <span className={styles.name}>{getInitials(name)}</span>
                                        </div>
                                    )}

                                    {profile && (
                                        <div className={styles.profileDetails}>
                                            <div className={styles.usernameBox}>
                                                <span className={styles.userName}>{name}</span></div>
                                                {/* <span className={styles.logout}>Logout</span> */}
                                            <div className={styles.hr} />
                                            <div className={styles.LogoutBox} onClick={logoutfun}>
                                                <span className={styles.logout}>Logout</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.image}>
                            <p className={styles.imgText}><b>Grab upto 50% off on Selected headphones</b></p>
                            <img src={girl} className={styles.girl} />
                        </div>

                        <div className={styles.searchBar}>
                            <img src={searchIcon} alt="searchIcon" className={styles.searchIcon} />
                            <input
                                type='text'
                                placeholder='Search by Product Name'
                                className={styles.input}
                                name="Productsearch"
                                value={filters.Productsearch}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.filter}>
                            <div className={styles.icon}>
                                {grid ? (<img src={gridView} className={styles.gridView} onClick={handleGridView} />) : (<img src={gridViewList} className={styles.gridView} onClick={handleGridView} />)}
                                {!list ? (<img src={listView} className={styles.listView} onClick={handleListView} />) : (<img src={listViewSelected} className={styles.listView} onClick={handleListView} />)}
                            </div>
                            <div className={styles.dropDownBox}>
                                <div className={styles.dropDown}>

                                    <select
                                        className={styles.filtering}
                                        onClick={handleSelectClick}
                                        defaultValue=""
                                    >
                                        {showPlaceholder && (
                                            <option value="" disabled selected className={styles.placeholder}>
                                                Headphone type
                                            </option>
                                        )}
                                        <option value="featured" disabled>
                                            Featured
                                        </option>
                                        <option value="In-ear headphone" className={styles.options}>
                                            In-ear headphone
                                        </option>
                                        <option value="On-ear headphone" className={styles.options}>
                                            On-ear headphone
                                        </option>
                                        <option value="Over-ear headphone" className={styles.options}>
                                            Over-ear headphone
                                        </option>
                                    </select>


                                </div>
                                <div className={styles.dropDown}>
                                    <select className={styles.filtering} onClick={handleSelectClick2}
                                        defaultValue="">
                                        {showCompany && (
                                            <option value="" disabled selected className={styles.placeholder}>
                                                Company
                                            </option>
                                        )}
                                        <option value="featured" disabled>
                                            Featured
                                        </option>

                                        <option value="BOAT" className={styles.options}>BOAT</option>
                                        <option value="Sony" className={styles.options}>Sony</option>
                                        <option value="Marshall" className={styles.options}>Marshall</option>
                                        <option value="Noise" className={styles.options}>Noise</option>
                                        <option value="MOVSSOU" className={styles.options}>MOVSSOU</option>
                                        <option value="JBL" className={styles.options}>JBL</option>
                                        <option value="Soul Electronics" className={styles.options}>Soul Electronics</option>
                                        <option value="KVIDIO" className={styles.options}>KVIDIO</option>
                                        <option value="JBL" className={styles.options}>JBL</option>
                                        

                                    </select>
                                </div>
                                <div className={styles.dropDown}>
                                    <select
                                        className={styles.filtering}
                                        onClick={handleSelectClick3}
                                        defaultValue=""
                                    >
                                        {showColor && (
                                            <option value="" disabled selected className={styles.placeholder}>
                                                Colour
                                            </option>
                                        )}
                                        <option value="featured" disabled>
                                            Featured
                                        </option>

                                        <option value="Black" className={styles.options}>Black</option>
                                        <option value="Blue" className={styles.options}>Blue</option>
                                        <option value="Red" className={styles.options}>Furious Red</option>
                                        <option value="BEIGE" className={styles.options}>BEIGE</option>
                                        <option value="White" className={styles.options}>White</option>
                                        <option value="Brown" className={styles.options}>Brown</option>
                                    </select>
                                </div>
                                <div className={styles.dropDown}>
                                    <select
                                        className={styles.filtering}
                                        onClick={handleSelectClick4}
                                        defaultValue=""
                                    >
                                        {showprice && (
                                            <option value="" disabled selected className={styles.placeholder}>
                                                Price
                                            </option>
                                        )}
                                        <option value="featured" disabled>
                                            Featured
                                        </option>
                                        <option value="1" className={styles.options}>₹0- ₹1,000</option>
                                        <option value="2" className={styles.options}>₹1,000-₹10,000</option>
                                        <option value="3" className={styles.options}>₹10,000-₹20,000</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.sortBox}>
                                <select className={styles.filtering} onClick={handleSelectClick5}
                                    defaultValue="">
                                    {showsort && (
                                        <option value="" disabled selected className={styles.placeholder}>
                                            Sort by:Featured
                                        </option>
                                    )}
                                    <option value="featured" disabled>
                                        Featured
                                    </option>
                                    <option value="Lowest" className={styles.options}>Price: Lowest</option>
                                    <option value="Highest" className={styles.options}>Price: Highest</option>
                                    <option value="A-Z" className={styles.options}>Name: (A-Z)</option>
                                    <option value="Z-A" className={styles.options}>Name: (Z-A)</option>
                                </select>
                            </div>
                        </div>
                        {grid &&
                            <div className={styles.flexContainer}>
                                {fetchedData.map((item, index) => (
                                    <div className={styles.box} key={index}>
                                        <div className={styles.imgBox}>
                                            <img src={item.Images[0]} alt="headphone" className={showCart ? styles.productImgWithCart : styles.productImg} onClick={() => Productpage(index)} />
                                            {showCart && <img src={cart} alt="cart" className={styles.cartimage} onClick={() => changefunction(item._id)} />}                </div>
                                        <div className={styles.productDetails}>
                                            <span className={styles.productName}><b>{item.ProductName}</b></span>
                                            <span className={styles.price}><b>Price - ₹{item.price}</b></span>
                                            <div className={styles.headphnType}>
                                                <span className={styles.color}><b>{item.color}</b><b> | </b><b>{item.headphone_type}</b></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }

                        {list &&
                            <div className={styles.flexContainerlist}>
                                {fetchedData.map((item, index) => (
                                    <div className={styles.boxlist} key={index}>
                                        <div className={styles.imgBoxList}>

                                            <img src={item.Images[0]} alt="headphone" className={showCart ? styles.productImgWithCarts : styles.productImgs}  />
                                            {showCart && <img src={cart} alt="cart" className={styles.cartimages} onClick={() => changefunction(item._id)} />}
                                        </div>
                                        <div className={styles.productDetailsList}>
                                            <span className={styles.productNameList}><b>{item.ProductName}</b></span>
                                            <span className={styles.price}><b>Price - ₹{item.price}</b></span>
                                            <span className={styles.color}><b>{item.color}</b><b> | </b><b>{item.headphone_type}</b></span>
                                            <span className={styles.description}><b>{item.product_description}</b></span>
                                            <button className={styles.detailsButton} onClick={() => Productpage(index)} >Details</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }

                    </div>
                    <div className={styles.feedBack}>
                        {isFormVisible && (
                            <div className={styles.feedbackFormCon}>
                                <form className={styles.forms} onSubmit={handleSubmit}>
                                    <label className={styles.label}>Type of feedback</label>
                                    <select
                                        className={`${styles.options} ${errors.feedbackType && styles.error}`}
                                        name="feedbackType"
                                        value={formData.feedbackType}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Choose the type</option>
                                        <option value="Bugs">Bugs</option>
                                        <option value="Feedback">Feedback</option>
                                        <option value="Query">Query</option>
                                    </select>
                                    {errors.feedbackType && <div className={styles.errorMsg}>{errors.feedbackType}</div>}
                                    <label className={styles.label}>Feedback</label>
                                    <textarea
                                        className={`${styles.textArea} ${errors.feedback && styles.error}`}
                                        placeholder="Type your Feedback"
                                        name="feedback"
                                        value={formData.feedback}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.feedback && <div className={styles.errorMsg}>{errors.feedback}</div>}
                                    <button className={styles.submit} onClick={feedbacksubmit}>Submit</button>
                                </form>
                            </div>
                        )}
                        <div className={styles.fbBox} onClick={toggleFormVisibility}>
                            <img src={feedback} className={styles.icon} alt="Feedback Icon" />
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

export default HomePage;

