import React, { useState, useEffect } from 'react';
import Home from './Pages/Home/home';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProductDetails from './Pages/ProductDetails/productDetails';
import Products from './Pages/Products/products';
import Collections from './Pages/Collections/collections';
import Projects from './Pages/Projects/projects';
import AboutUs from './Pages/AboutUs/aboutUs';
import { ThemeProvider, createTheme } from '@mui/material';
import Payment from './Pages/Payment/payment';
import PaymentForm from './Pages/PaymentForm/paymentForm';
import GoToTop from './Pages/Components/goToTop';
import { isJsonString } from './Ults';
import jwt_decode from "jwt-decode";
import * as UserServices from '../src/Services/UserServices';
import { useDispatch } from 'react-redux';
import { updateUser } from './Redux/Slides/userSlide';
import Admin from './Pages/Adminstrator/Admin';
import LoginSuccess from './Pages/Components/loginSuccess';
import ProjectDetails from './Pages/ProjectDetails/projectDetails';
import CreateOrderSuccess from './Pages/Components/createOrderSuccess';
import FastContactButton from './Pages/Components/fastContactButton';
import ViewOrderPage from './Pages/Components/viewOrderPage';
import { TouchProvider } from './Hooks/TouchProvider';

const theme = createTheme({
  typography: {
    fontFamily: "Roboto", // Thay 'Your-Font-Family' bằng font bạn muốn sử dụng
  },
})

const Loader = () => {
  return (
    <div className="overlay">
      <div className="logo" style={{fontFamily: "'Playfair Display',serif", fontWeight: 500}}>Tam Anh Lighting</div>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, localStorage.getItem('access_token'));
    }
  }, [])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.GetDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    let temp = storageData;
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.stringify(storageData)
      decoded = jwt_decode(storageData)
    }
    storageData = temp;
    return { decoded, storageData }
  }

  UserServices.axiosJwt.interceptors.request.use(async (config) => {
    const currentTime = new Date().getTime();
    const { decoded } = handleDecoded()
    if (decoded?.exp < (currentTime / 1000)) {
      const data = await UserServices.RefreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  })

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Thời gian hiển thị loading (3s)
  }, []);


  return (
    <>
        {loading && <Loader />}

        <div className={`main-content ${loading ? "hidden" : "fade-in"}`} style={{backgroundColor: "#272727"}}>
      <ThemeProvider theme={theme}>
        
          <Router>
            <GoToTop />
            <FastContactButton />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login-success/:provider/:userId' element={<LoginSuccess />} />
              <Route path='/product-details/:productId' element={<ProductDetails />} />
              <Route path='/products' element={<Products />} />
              <Route path='/project-details/:projectId' element={<ProjectDetails />} />
              <Route path='/products/:collectionId' element={<Products />} />
              <Route path='/collections' element={<Collections />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/payment/form/:orderId' element={<PaymentForm />} />
              <Route path='/create-order-success' element={<CreateOrderSuccess />} />
              <Route path='/follow-your-orders' element={<ViewOrderPage />} />
              <Route path='/admin' element={<Admin />} />
              <Route path="*" element={<p>Path not resolved</p>} />
            </Routes>
          </Router>

      </ThemeProvider>
      </div>
    </>
  );
}
export default App;