import React, { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import './globalComponents.css';
import { IconButton, Toolbar, AppBar, Button, styled, Badge, Typography, Box, CardMedia } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ToggleSideBar from './toggleSidebar';
import { useState } from 'react';
import Overlay from './overlay';
import LoginForm from './loginForm';
import * as UserServices from './../../Services/UserServices';
import { UseMutationHooks } from '../../Hooks/UseMutationHook';
import jwt_decode from "jwt-decode";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, updateUser } from '../../Redux/Slides/userSlide';
import { removeProduct } from '../../Redux/Slides/orderSlide';
import * as ProductServices from "../../Services/ProductServices"
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query';
import { MdKeyboardArrowDown } from "react-icons/md";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 3,
        top: 0,
        border: `2px solid 'red'`,
        padding: '0 4px',
    },
}));

export default function StickyNav() {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [opac, setOpac] = useState(true);
    const location = useLocation(); // Lấy đường dẫn hiện tại

    // Mapping đường dẫn với tiêu đề trang
    const pageTitles = {
        "/": "Trang chủ",
        "/products": "Sản phẩm",
        "/collections": "Bộ sưu tập",
        "/projects": "Dự án",
        "/about-us": "Về chúng tôi",
        "/payment": "Thanh toán",
        "/follow-your-orders": "Theo dõi đơn hàng",
        "/admin": "Quản lí website",
    };
    var pageTitle;
    if (location.pathname.startsWith("/products")) {
        pageTitle = "Sản phẩm";
    } 
    else if(location.pathname.startsWith("/product-details"))
    {
        pageTitle = "Chi tiết sản phẩm";
    }
    else if(location.pathname.startsWith("/project-details"))
    {
        pageTitle = "Chi tiết dự án";
    }
    else if(location.pathname.startsWith("/payment/form"))
    {
        pageTitle = "Đơn hàng";
    }
    else {
        pageTitle = pageTitles[location.pathname] || "";
    }
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isScrollingDown = prevScrollPos <= currentScrollPos;

            setVisible(!isScrollingDown);
            if (currentScrollPos <= 10) {
                setOpac(true); 
                setVisible(true);
            }
            else setOpac(false);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, visible]);

    const headerStyle = {
        maxWidth: '100vw',
        fontWeight: "bold",
        transition: 'top 0.3s',
        background: opac ? "rgb(255 255 255 / 0%)" : "#fff0",
        // top: visible ? '0px' : '-60px', // assuming your header's height is 60px
    };

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top
    }, []);

    const navigate = useNavigate();
    const handleLink = (link) => {
        if (link === "")
            navigate(`/`);
        else
            navigate(`/${link}`);
    }

    // redux toolkit
    const dispatch = useDispatch();
    const userSelector = useSelector((state) => state.user)
    const orderSelector = useSelector((state) => state.order)
    
    // State
    let [toggleCart, setToggleCart] = useState(false);
    const handleToggleCart = () => setToggleCart(!toggleCart);
    let [toggleSearch, setToggleSearch] = useState(false);
    const handleToggleSearch = () => setToggleSearch(!toggleSearch);

    let [toggleLoginForm, setToggleLoginForm] = useState(false);
    const handleToggleLogin = () => setToggleLoginForm(!toggleLoginForm);

    let [toggleAccountOption, setToggleAccountOption] = useState(false);
    const handleToggleAccountOption = () => setToggleAccountOption(!toggleAccountOption);

    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const [searchValue, setSearchValue] = useState("")
    // SEARCH HANDLE 
    const onSearch = (e) => {
        setSearchValue(e.target.value)
    }
    const handleSearch = (e) => {
        if (searchValue) {
            navigate(`/products?search=${searchValue}`);
        }
    }
    const handleLinkToCart = () => {
        navigate(`/payment`);
    }
    // LOGIN HANDLE

    const [userNameValue, setUserNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const handleUserNameChange = (e) => {
        setUserNameValue(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };

    const mutation = UseMutationHooks(data => UserServices.LoginUser(data))

    const handleSignIn = () => {
        mutation.mutate({
            email: userNameValue,
            password: passwordValue
        })
    }

    const { data, isLoading, isSuccess } = mutation


    const getAllProductType = async () => {
        const res = await ProductServices.getAllProductType();
        return res;
    }

    const { isLoading: isLoadingType, data: typeData } = useQuery({ queryKey: ['product-types'], queryFn: getAllProductType })

    useEffect(() => {
        if (isSuccess) {
            if (data?.access_token !== undefined) {
                localStorage.setItem('access_token', data?.access_token);
                if (data?.access_token) {
                    const decoded = jwt_decode(data?.access_token);
                    console.log("decoded : " + decoded);
                    if (decoded?.id) {
                        handleGetDetailsUser(decoded?.id, data?.access_token);
                    }
                }
            }
        }
    }, [isSuccess])

    const handleLogOut = async () => {
        dispatch(resetUser())
        await UserServices.LogOutUser();
        localStorage.removeItem('access_token'); // remove access token when logout
    }

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserServices.GetDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token })) // update local access token
    }

    const handleRemoveItemInCart = (id) => {
        dispatch(removeProduct({ productId: id }))
    }

    let isLoggedIn = (userSelector.name !== "" ? true : false) || (userSelector.isLoggedIn)
    useEffect(() => {
        if (toggleLoginForm === true)
            handleToggleLogin()
        if (toggleAccountOption === true)
            handleToggleAccountOption()
    }, [isLoggedIn])

    return (
        <>
            <div className="nav-container" style={headerStyle} onMouseLeave={() => setIsOpenDropdown(false)} >
                <AppBar position='static' sx={{ padding: {xs: '0px', md: '0px'}, background: 
                {xs: "linear-gradient(180deg, rgba(28, 28, 28, 0.93) 0%,rgba(28, 28, 28, 0.72) 40%, rgba(0, 0, 0, 0.41) 70%, rgba(0, 0, 0, 0) 100%)", md: "#292929d9"}, boxShadow: 'none' }}>
                    <Toolbar className="nav-wrapper" style={{ display: "flex", justifyContent: "space-between" }}>
                    <Box className="desktop-only" onClick={() => handleLink("")} sx={{ color: 'black !important'}}>
                                <Typography variant="h5" sx={{color: "white", fontFamily: "'Playfair Display', serif", cursor: 'pointer', marginLeft: "15px" }}>Tam Anh Lighting</Typography>
                    </Box>
                    <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                        <Box className='right-nav' sx={{ display: {xs: "flex", md: "none"}, width: {xs: "100vw", md: "auto"}, justifyContent: "space-between", paddingRight: "21px" }}>
                            <Box onClick={() => handleLink("")} sx={{ color: 'black !important'}}>
                                <Typography variant="h5" sx={{color: "white", fontFamily: "'Playfair Display', serif", cursor: 'pointer' }}>Tam Anh Lighting</Typography>
                            </Box>
                            <ToggleSideBar />
                        </Box>
                        
                    </div>

                        
                        <Box sx={{
                            display: 'flex', gap: {
                                xs: "0px",
                                md: "50px",
                                lg: "80px"
                            }
                        }}>
                            <Button onMouseEnter={() => setIsOpenDropdown(true)} onClick={() => handleLink("products/0")}
                                color='inherit' sx={{
                                    display: { xs: 'none', md: 'flex' }, textTransform: 'none', fontFamily: "Roboto", fontWeight: 'bold', "&.hover": {
                                        border: 'none',
                                        boxShadow: 'none'
                                    }
                                }}>
                                <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                                    <Typography variant="body2" sx={{
                                        color: "white", 
                                        fontFamily: "Roboto", "&:hover": {
                                            color: "white",
                                        }, fontWeight: 'bold',
                                        fontSize: {md: "0.5rem", lg: "0.6rem"}
                                    }}>SẢN PHẨM  </Typography><MdKeyboardArrowDown style={{fontSize: '15px'}}/>
                                </div>
                            </Button>

                            {/* <Box sx={{display: {xs: "flex", md: 'none'},position: 'fixed', top: '80px', left: '10vw', width: '80vw', height: '30px', border: '2px solid white', alignItems: "center", justifyContent: "center"}}>
                                <Typography className='page-title' variant="body1" sx={{ }}>
                                    {pageTitle}
                                </Typography>
                            </Box> */}

                            {isOpenDropdown && (
                                <ul className="dropdown-menu">
                                    <div style={{width: '100%', height: '3.9px', backgroundColor: '#373737', position: 'absolute', top: '0'}}></div>
                                {typeData?.data?.map((item, index) => (
                                    <li key={index} className="dropdown-item">
                                    {item.typeName}
                                    </li>
                                ))}
                                </ul>
                            )}
                            <Button color='inherit' sx={{ display: { xs: 'none', md: 'flex' }, textTransform: 'none', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                <Typography onClick={() => handleLink("collections")} sx={{
                                    color: "white", 
                                    fontFamily: "Roboto", "&:hover": {
                                        color: "white",
                                    }, fontWeight: 'bold',
                                    fontSize: {md: "0.5rem", lg: "0.6rem"}
                                }}>BỘ SƯU TẬP</Typography>
                            </Button>
                            <Button color='inherit' sx={{
                                display: {
                                    xs: 'none',
                                    md: 'flex'
                                }, textTransform: 'none', fontFamily: "Roboto"
                            }}>
                                <Typography onClick={() => handleLink("projects")} sx={{
                                    color: "white", 
                                    fontFamily: "Roboto", "&:hover": {
                                        color: "white",
                                    }, fontWeight: 'bold',
                                    fontSize: {md: "0.5rem", lg: "0.6rem"}
                                }}>DỰ ÁN</Typography>
                            </Button>
                            <Button color='inherit' sx={{ display: { xs: 'none', md: 'flex' }, textTransform: 'none', fontFamily: "Roboto" }}>
                                <Typography onClick={() => handleLink("about-us")} sx={{
                                    color: "white", 
                                    fontFamily: "Roboto", "&:hover": {
                                        color: "white",
                                    }, fontWeight: 'bold',
                                    fontSize: {md: "0.5rem", lg: "0.6rem"}
                                }}>TIN TỨC</Typography>
                            </Button>
                            <Button color='inherit' sx={{ display: { xs: 'none', md: 'flex' }, textTransform: 'none', fontFamily: "Roboto" }}>
                                <Typography onClick={() => handleLink("about-us")} sx={{
                                    color: "white", 
                                    fontFamily: "Roboto", "&:hover": {
                                        color: "white",
                                    }, fontWeight: 'bold',
                                    fontSize: {md: "0.5rem", lg: "0.6rem"}
                                }}>VỀ CHÚNG TÔI</Typography>
                            </Button>
                        </Box>

                        <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                            
                            <Box className="right-nav" sx={{ position: 'relative', display: {xs: "none", md: "flex"}, right: { xs: "50%", md: "0" } }}>
                                <Box sx={{
                                    display: {
                                        md: 'block'
                                    },
                                        marginLeft: '105px'
                                }}>
                                    {
                                        ((toggleLoginForm === true) ? <Overlay func={handleToggleLogin} /> : "") || ((toggleAccountOption === true) ? <Overlay func={handleToggleAccountOption} /> : "")
                                    }
                                    {(isLoggedIn === false)
                                        ?
                                        <IconButton sx={{ color: opac ? "white" : "white" }} aria-label="cart" onClick={() => handleToggleLogin()} >
                                            <AccountCircleIcon style={{ fontSize: '10px !important', width: '17px' }} />
                                        </IconButton>
                                        : <IconButton aria-label="cart" onClick={() => handleToggleAccountOption()}>
                                            <AccountCircleIcon style={{ fontSize: '10px !important', width: '17px' }} />
                                        </IconButton> 
                                    }

                                    {
                                        (toggleAccountOption === true)
                                            ?
                                            <Box sx={{ position: 'absolute', right: '0', bgcolor: 'white', padding: '10px', width: '200px', borderRadius: '5px', zIndex: "100" }}>
                                                <Typography variant='h6' sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                                                    <AccountCircleIcon style={{ fontSize: '10px !important' }} />
                                                    <span style={{ margin: '5px', marginBottom: '10px' }}>
                                                        {userSelector.name}
                                                    </span>
                                                </Typography>
                                                {
                                                    userSelector.isAdmin === true ?
                                                        <Box onClick={() => handleLink("admin")} sx={{ fontSize: ".8rem", color: "gray", cursor: "pointer", padding: "0 20px", "&:hover": { color: "black", transition: ".5s" } }}>
                                                            <Typography variant="body1">
                                                                Go to admin page
                                                            </Typography>
                                                        </Box>
                                                        : ""
                                                }
                                                <Typography variant="body1" onClick={() => handleLink("follow-your-orders")} sx={{
                                                    color: "gray", padding: "0 20px", paddingBottom: "12px", cursor: "pointer", "&:hover": {
                                                        color: "black", transition: ".5s"
                                                    }
                                                }}>Đơn hàng của bạn</Typography>
                                                <Button onClick={handleLogOut} sx={{ width: '100%', color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: 'white', color: 'black' } }}>Đăng xuất</Button>
                                            </Box>
                                            : ""
                                    }
                                </Box>
                                <LoginForm
                                    userNameValue={userNameValue}
                                    handleUserNameChange={handleUserNameChange}
                                    passwordValue={passwordValue}
                                    handlePasswordChange={handlePasswordChange}
                                    handleSignIn={handleSignIn}
                                    data={data}
                                    toggleLoginForm={toggleLoginForm}
                                    handleToggleLogin={handleToggleLogin}
                                />
                            </Box>
                            <Box className='right-nav' sx={{ position: 'relative', right: { xs: "50%", md: "0" }, display: {xs: "none", md: "flex"}, alignItems: "center", justifyContent: "center" }}>
                              
                                <IconButton sx={{ color: opac ? "white" : "white", marginRight: {xs: '20px', md: '10px'} }} aria-label="cart" onClick={() => handleToggleCart()}>
                                    <StyledBadge badgeContent={orderSelector.orderItems.length} color="error">
                                        <ShoppingCartIcon sx={{ fontSize: {xs:'15px !important', md: '20px !important'} }} />
                                    </StyledBadge>
                                </IconButton>
                                {(toggleCart === true) ? <Overlay func={handleToggleCart} /> : ""}
                                {(toggleCart === true) ? <div className="cart-details">
                                    <Box className='cart-content' sx={{ textAlign: 'center' }}>
                                        {
                                            (orderSelector.orderItems.length > 0) ? <Typography variant='h5'>Giỏ hàng</Typography> : ""
                                        }
                                        {
                                            (orderSelector.orderItems.length > 0) ? orderSelector?.orderItems?.map((item, index) => {
                                                return <div className="item-in-cart-wrapper" key={index}>
                                                    <div className="item-in-cart">
                                                        <div className="left">
                                                            <div className="img-item">
                                                                <img src={item.main_image} alt="this is lamp" />
                                                            </div>
                                                            <Typography variant="body1" className="item-name">
                                                                {item.itemName + " x " + item.quantity}
                                                            </Typography>
                                                        </div>
                                                        <div className="remove-item" onClick={() => handleRemoveItemInCart(item.productDetails)}><CloseIcon /></div>
                                                    </div>
                                                </div>
                                            }) : <Box sx={{ margin: '50px 0' }}>
                                                <div className="img-empty-cart">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="" />
                                                </div>
                                                <Typography style={{ marginTop: '20px' }} variant='body2'>Không có sản phẩm trong giỏ hàng!</Typography>
                                            </Box>
                                        }
                                        {
                                            (orderSelector.orderItems.length > 0) ? <Button onClick={handleLinkToCart} sx={{
                                                color: 'white', background: '#000', width: '100%', "&:hover": {
                                                    background: 'black',
                                                    color: 'white'
                                                }
                                            }} className="to-payment">
                                                Xem chi tiết đơn hàng
                                            </Button> : ""
                                        }
                                    </Box>
                                </div> : ""}
                            </Box>
                            <Box className='right-nav' sx={{ position: 'relative', right: '100%', display: {xs: "none", md: "flex"}, alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
                                <ToggleSideBar />
                            </Box>
                        </div>
                    </Toolbar>
                    
                </AppBar>
                
            </div>
        </>
    )
}
