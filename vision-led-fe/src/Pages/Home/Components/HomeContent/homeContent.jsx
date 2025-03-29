import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import ProductSlideShow from '../../../Components/productSlideShow'
import ProductCollection from '../productCollection'
import { Link, useNavigate } from 'react-router-dom'
import TextWithReadMore from '../../../Components/textWithReadMore'
import { useDispatch } from 'react-redux'
import { updateInOrder } from '../../../../Redux/Slides/userSlide'
import * as ProductServices from "../../../../Services/ProductServices"
import { useQuery } from '@tanstack/react-query'
import { width } from '@mui/system'
import BtnSeeMore from '../../../Components/btnSeeMore'
import VerticalCarousel from '../../../Components/CustomCarousel'
import ProductCollectionMobile from '../productCollectionMobile'


const FadeUpSection = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 } 
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
  
    return (
      <div
        ref={sectionRef}
        className={`fade-up ${isVisible ? 'visible' : ''}`}
      >
        <div className="desktop-only">
        <Box className="top-content-title" sx={{ userSelect: 'none', marginBottom: "15px" }}>
          
        <div className="desktop-only">
                <Typography variant='h4' sx={{
                    padding: {
                        xs: "0 5px",
                        sm: "0 5px",
                        md: "0 50px",
                        lg: "0 150px",
                        xl: "0 250px"
                    }, userSelect: 'none', marginBottom: "10px", fontFamily: '"Open Sans", sans-serif', fontSize: '1.5rem'
                }}>Mua sắm với chúng tôi</Typography>
                <Box sx={{
                    display: {
                        xs: 'none',
                        md: 'block'
                    }
                }}>
                    <Typography variant='h6' sx={{
                        padding: {
                            xs: "0 5px",
                            sm: "0 15px",
                            md: "0 50px",
                            lg: "0 150px",
                            xl: "0 250px"
                        }, userSelect: 'none', bgColor: "#ffffff !important", color: 'black', fontWeight: "300", fontFamily: '"Open Sans", sans-serif', fontSize: '1.0rem'
                    }}>
                        Vision Led là một trong những đối tác hàng đầu trong việc thiết kế các giải pháp chiếu sáng cho mọi nhà. Chúng tôi tự hào về việc mang đến sự sáng tạo độc đáo và ưu tiên hàng đầu là sự hài lòng của khách hàng trong mọi dự án chúng tôi thực hiện</Typography>
                </Box>
                <Box sx={{
                    display: {
                        xs: 'block',
                        md: 'none'
                    }
                }}>
                    <TextWithReadMore text="Vision Led là một trong những đối tác hàng đầu trong việc thiết kế các giải pháp chiếu sáng cho mọi nhà. Chúng tôi tự hào về việc mang đến sự sáng tạo độc đáo và ưu tiên hàng đầu là sự hài lòng của khách hàng trong mọi dự án chúng tôi thực hiện" maxLength={100} />
                </Box>
                </div>

            </Box>

            <div className="desktop-only">
              <ProductSlideShow products={props.productsRan} />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "50px" }}>
                <Link to='/products/0' style={{ textDecoration: 'none' }}>
                    <Button color='primary' sx={{
                        display: 'flex',
                        justifyContent: 'center', fontFamily: '"Open Sans", sans-serif',
                        alignItems: 'center',
                        color: 'white',
                        padding: '8px 20px',
                        border: '1px solid black',
                        backgroundColor: 'rgba(50, 50, 50)',
                        borderRadius: '0',
                        '&:hover': {
                            backgroundColor: 'rgba(256, 256, 256)',
                            border: '1px solid black',
                            color: 'black',
                            transition: '.3s',
                        },
                    }}>
                        Mua Ngay
                    </Button>
                </Link>
            </Box>
            </div>
        </div>
      </div>
    );
  };
  
const FadeUpSection2 = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 } 
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
  
    return (
      <div
        ref={sectionRef}
        className={`fade-up ${isVisible ? 'visible' : ''}`}
      >
        <Box className="top-content-title" sx={{ userSelect: 'none' }}>
                <Typography variant='h4' sx={{
                    padding: {
                        xs: "0 5px",
                        sm: "0 5px",
                        md: "0 5px",
                        lg: "0 150px",
                        xl: "0 250px"
                    }, userSelect: 'none', marginBottom: "10px", fontFamily: '"Open Sans", sans-serif', fontSize: '1.5rem'
                }}>Khám phá bộ sưu tập của chúng tôi</Typography>

                <Box sx={{
                    display: {
                        xs: 'none',
                        md: 'block'
                    }
                }}>
                    <Typography variant='h6' sx={{
                        padding: {
                            xs: "0 5px",
                            sm: "0 15px",
                            md: "0 50px",
                            lg: "0 150px",
                            xl: "0 250px"
                        }, userSelect: 'none', color: 'black', fontWeight: "300", fontFamily: '"Open Sans", sans-serif', fontSize: '1.0rem'
                    }}>Chúng tôi đã tuyển chọn các thiết bị chiếu sáng tốt nhất từ ​​các nhà thiết kế và nhà sản xuất nổi tiếng trên khắp thế giới. Bộ sưu tập của chúng tôi có nhiều mẫu mã, từ kiểu dáng đẹp và hiện đại đến cổ điển và trang trí tinh tế, tất cả đều được chế tác từ những vật liệu chất lượng cao nhất và hoàn thiện đến từng chi tiết nhỏ nhất.
                    </Typography>
                </Box>
                <Box sx={{
                    display: {
                        xs: 'block',
                        md: 'none'
                    }
                }}>
                    <TextWithReadMore text="Chúng tôi đã tuyển chọn các thiết bị chiếu sáng tốt nhất từ ​​các nhà thiết kế và nhà sản xuất nổi tiếng trên khắp thế giới. Bộ sưu tập của chúng tôi có nhiều mẫu mã, từ kiểu dáng đẹp và hiện đại đến cổ điển và trang trí tinh tế, tất cả đều được chế tác từ những vật liệu chất lượng cao nhất và hoàn thiện đến từng chi tiết nhỏ nhất." maxLength={100} />
                </Box>
            </Box>
      </div>
    );
  };

  
const FadeUpSection3 = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 } 
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
  
    return (
      <div
        ref={sectionRef}
        className={`fade-up ${isVisible ? 'visible' : ''}`}
      >
        <Box sx={{backgroundColor: '#333333', padding: {xs: '7px 5px', sm: '8px 6px', md: '10px 8px'}}}>
              <Box sx={{backgroundColor: 'white', display: {
                xs: "block",
                md: "flex"
              }, borderRadius: '12px', overflow: 'hidden'
              }}>
                <Box sx={{width: {xs: "100%", md: '75vw'}, height: 'auto', overflow: 'hidden'}}>
                    <Box sx={{}}>
                        <Typography sx={{fontSize: '2.6rem', fontWeight: "bold", fontFamily: '"Open Sans", sans-serif'}}>Về Chúng Tôi</Typography>
                        <Typography sx={{fontWeight: "300", fontFamily: '"Open Sans", sans-serif', fontSize: '1.5rem'}}>Với 20 năm kinh nghiệm, chúng tôi là công ty hàng đầu chuyên sản xuất và thiết kế các giải pháp chiếu sáng cho các công trình lớn. Thành công của chúng tôi trong ngành là nhờ vào khả năng hiểu và đáp ứng mong đợi và nguyện vọng của khách hàng. Bằng cách hợp tác với các đối tác từ khắp nơi trên thế giới, chúng tôi cung cấp cho khách hàng những vật liệu chất lượng hàng đầu và những lợi ích lớn nhất khi sử dụng.</Typography>
                    
                    <Button color='primary' sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: {xs: '10px 0', md: '50px 0'},
                    marginBottom: '50px',
                    marginLeft: `5px`,
                    transform: `5px`,
                    color: 'white',
                    padding: '8px 20px',
                    border: '1px solid white',
                    backgroundColor: 'rgba(50, 50, 50, 100%)',
                    borderRadius: '20px',
                    '&:hover': {
                        backgroundColor: 'rgba(256, 256, 256, 100%)',
                        border: '1px solid white',
                        color: 'black',
                        borderColor: 'black',
                        transition: '.3s',
                    },
                    fontFamily: '"Open Sans", sans-serif'
                    }}>Xem Thêm</Button>
                    </Box>
                </Box>
                <Box sx={{width: {xs: "100%", md: "530px"}, height: 'auto', overflow: 'hidden', display: {xs: 'none', md: 'block'}}}>
                    <img style={{width: '100%', height: '100%'}} src="https://storage.googleapis.com/visionled/hilton.jpg" alt="" />
                </Box>
              </Box>
            </Box>
      </div>
    );
  };

export default function HomeContent() {
    const dispatch = useDispatch();
    dispatch(updateInOrder({ inOrder: false }));
    const getRandomProducts = async () => {
        const res = await ProductServices.GetRandomProducts();
        return res;
    }
    const [productsRan, setProductsRan] = useState(null)

    const { isLoading: isLoadingRan, data: dataRan } = useQuery(['products-ran'], getRandomProducts, {
        onSuccess: (responseData) => {
            if (responseData) {
                setProductsRan(responseData.data);
            }
        },
    });

    const navigate = useNavigate()
    const handleNavLink = () => {
        navigate(`/projects`);
    }
    return (
        <>
            <Box className="full-height-img">
                <Box sx={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '100', flexWrap: 'wrap' }}>
                    <Box className="home-content-s" sx={{
                        width: '100vw', padding: '0 20px', color: "white",
                        display: 'flex', justifyContent: 'center'
                    }}>
                        <Typography variant="h2" sx={{
                            fontSize: {
                                xs: '1.8rem',
                                sm: '2.5rem',
                                md: '3.5rem'
                            },
                            fontFamily: '"Open Sans", sans-serif',
                            fontWeight: "200"
                        }}>Chọn đèn, chọn sự hoàn hảo.</Typography>
                        <br />
                    </Box>
                    <Link className='btn-dir' to='/collections' style={{ textDecoration: 'none' }}>
                        <div className="arrow-container">
                            <div className="arrow"></div>
                        </div>
                        <Button color='primary' sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            padding: '5px 10px',
                            paddingRight: '42px',
                            border: '1px solid black',
                            backgroundColor: 'rgba(50, 50, 50, 0%)',
                            borderRadius: '0',
                            zIndex: '100',
                            borderColor: 'white',
                            fontSize: '1rem',
                            '&:hover': {
                                backgroundColor: 'rgba(256, 256, 256, 0%)',
                                border: '1px solid white',
                                color: 'white',
                                transition: '.3s',
                            },
                            marginTop: '20px', fontWeight: "300", fontFamily: '"Open Sans", sans-serif'
                        }}>
                            bộ sưu tập
                        </Button>
                    </Link>
                </Box>
                <div className="shadow-full-height" style={{ zIndex: '50' }}></div>
                <img src="./imb.png" alt="" />
            </Box>
            <FadeUpSection productsRan={productsRan}/>
            <FadeUpSection2 />
            
            <div className="desktop-only">
              <ProductCollection />
            </div>
            <div className="mobile-only">
              <ProductCollectionMobile />
            </div>
            {/* <FadeUpSection3 /> */}
            
        </>
    )
}