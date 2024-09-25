import React from 'react'
import GlobalFooter from './../../../Components/footer'
import { useNavigate } from 'react-router-dom'

export default function HomeFooter() {
    const navigate = useNavigate()
    const navigateAboutUs = () => {
        navigate("/about-us")
    }
    return (
        <>
           
            <GlobalFooter style={{
                backgroundColor: '#ffffff',
                fontFamily: "Roboto"
            }} />
        </>
    )
}