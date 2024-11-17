import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Box } from '@mui/material';
import ProductCardHome from './productCardHomepage';

export default function ProductSlideShow(props) {
    return (
        <>
            <Box sx={{
                padding: {
                    xs: "0 5px",
                    sm: "0 15px",
                    md: "0 15px",
                    lg: "0 15px",
                    xl: "0 15px"
                },
            }}>
                <Swiper
                    slidesPerView={props.products?.length || 5}
                    breakpoints={{ 1536: { slidesPerView: 4, }, 900: { slidesPerView: 4, }, 600: { slidesPerView: 3, }, 0: { slidesPerView: 1, } }}
                    centeredSlides={true}
                    spaceBetween={10}
                    pagination={{ type: 'fraction', }}
                    initialSlide={2}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="swiper-container">
                    {
                        props.products?.map((item, index) => {
                            
                            return <>
                                <SwiperSlide key={index}><Box sx={{border: '1px solid rgb(228 228 228)', overflow: 'hidden'}}>
                                    <ProductCardHome index={item._id} saleRate={item.sale_rate} minPrice={item.min_price} maxPrice={item.max_price} productName={item.name} productImg={item.image[0]} />
                                </Box></SwiperSlide>
                            </>
                        })
                    }
                </Swiper >
            </Box>
        </>
    )
}