import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, FreeMode, Thumbs } from 'swiper/modules';
import { Box } from '@mui/material';
export default function ProductDetailsSlideShow(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="swiper-container "
                >
                {
                    props?.productDetails?.map((item, index) => {
                        return <>
                            <SwiperSlide>
                                <img style={{width: '60%', height: 'auto', aspectRatio: '1/1', objectFit: 'cover' }} src={item} alt="dendownlight.jpg" />
                            </SwiperSlide>
                        </>
                    })
                }
            </Swiper>

      
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    props?.productDetails?.map((item, index) => {
                        return <>
                            <SwiperSlide>
                                <img style={{width: '60%', height: 'auto', aspectRatio: '1/1', objectFit: 'cover' }} src={item} alt="dendownlight.jpg" />
                            </SwiperSlide>
                        </>
                    })
                }
            </Swiper>
        </>
    )
}