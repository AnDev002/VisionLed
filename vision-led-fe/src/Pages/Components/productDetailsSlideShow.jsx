import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Box } from '@mui/material';

export default function ProductDetailsSlideShow(props) {
    return (
        <>
            <Swiper
                slidesPerView={props.productDetails?.length || 1}
                breakpoints={{ 1536: { slidesPerView: 1, }, 900: { slidesPerView: 1, }, 600: { slidesPerView: 1, }, 0: { slidesPerView: 1, } }}
                centeredSlides={true}
                spaceBetween={10}
                pagination={{ type: 'fraction', }}
                initialSlide={2}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="swiper-container">
                {
                    props?.productDetails?.map((item, index) => {
                        return <>
                            <SwiperSlide key={index}><Box sx={{width: '100%', maxWidth: '500px'}}>
                                <img style={{width: '100%', height: 'auto', aspectRatio: '1/1', objectFit: 'cover' }} src={item} alt="dendownlight.jpg" />
                            </Box></SwiperSlide>
                        </>
                    })
                }
            </Swiper>
        </>
    )
}