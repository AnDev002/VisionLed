import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Box } from '@mui/material';

export default function ProjectSlideShow(props) {
    return (
        <>
            <Swiper
                slidesPerView={props.project?.length || 2}
                breakpoints={{ 1536: { slidesPerView: 4, }, 900: { slidesPerView: 3, }, 600: { slidesPerView: 3, }, 0: { slidesPerView: 1, } }}
                centeredSlides={true}
                spaceBetween={10}
                pagination={{ type: 'fraction', }}
                initialSlide={2}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="swiper-container">
                {
                    props?.project?.map((item, index) => {
                        return <>
                            <SwiperSlide key={index}><Box sx={{height: '300px', overflow: 'hidden'}}>
                                <img style={{width: '100%', height: '100%', objectFit: 'cover' }} src={item?.image} alt="dendownlight.jpg" />
                            </Box></SwiperSlide>
                        </>
                    })
                }
                <SwiperSlide key={65}><Box sx={{height: '300px', overflow: 'hidden'}}>
                         <img style={{width: '100%', height: '100%', objectFit: 'cover' }} src={props?.project[0].image} alt="dendownlight.jpg" />
                     </Box></SwiperSlide>
            </Swiper>
                         
        </>
    )
}