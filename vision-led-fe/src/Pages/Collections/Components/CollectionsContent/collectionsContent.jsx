import React from 'react'
import ParallaxCollections from '../parallax'
import * as CollectionServices from "../../../../Services/CollectionServices"
import { useQuery } from '@tanstack/react-query'
import VerticalCarousel from '../../../Components/CustomCarousel'

export default function CollectionsContent() {
    const getAllCollection = async () => {
        const res = await CollectionServices.GetAllCollection();
        return res;
    }
    const { isLoading, data } = useQuery({ queryKey: ['collections'], queryFn: getAllCollection })
   
    return (
        <>
            {/* <div style={{position: 'fixed', zIndex: '250', top: 0, left: 0, right: 0, bottom: 0, background: '#00000063'}}></div> */}
            {/* {
                data?.data.map((item, index) => {
                    return <>
                        <ParallaxCollections img={item.image} name={item.name.toUpperCase()} index={item._id} />
                    </>
                })
            } */}
            
            <VerticalCarousel items={data?.data}/>
            {/* <FullpageScroll /> */}
        </>
    )
}
