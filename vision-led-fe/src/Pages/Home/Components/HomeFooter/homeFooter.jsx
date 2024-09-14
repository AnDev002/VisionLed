import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import GlobalFooter from './../../../Components/footer'
import { useNavigate } from 'react-router-dom'
import TextWithReadMore from '../../../Components/textWithReadMore'

export default function HomeFooter() {
    const navigate = useNavigate()
    const navigateAboutUs = () => {
        navigate("/about-us")
    }
    return (
        <>
           
            <GlobalFooter style={{
                backgroundColor: '#ffffff',
            }} />
        </>
    )
}