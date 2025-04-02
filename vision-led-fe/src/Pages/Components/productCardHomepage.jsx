import React from 'react'
// import { Link } from "react-router-dom";
import './globalComponents.css';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../Ults';

export default function ProductCardHome(props) {
    const navigate = useNavigate();
    const handleLink = () => {
        navigate(`/product-details/${props.index}`)
    }
    const priceDisplay = (props.minPrice !== props.maxPrice) ? formatPrice(parseInt(props.minPrice)) + " - " + formatPrice(parseInt(props.maxPrice)) : formatPrice(parseInt(props.minPrice))
    const saleRateDisplay = "-" + (props.saleRate * 100) + "%"
    return (
        <>
            <Card sx={{
                cursor: 'pointer',
                // display: 'flex',
                // flexDirection: 'column',
            }} className='card'>
                <span onClick={handleLink} >
                    <CardMedia alt='unsplash image' component="img" image={props.productImg ? props.productImg : ""} />
                    
                </span>
            </Card >
            <div>
                <CardContent sx={{ minHeight: "50px", justifyContent: 'end', textAlign: 'left', display: 'flex', flexDirection: 'column', borderRadius: "0 !important" }}>
                    <Typography gutterBottom variant='h5' sx={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 400, color: 'black', fontSize: '1rem', flex: 'left' }}>{props.productName}</Typography>
                    {/* <Typography variant='body1' sx={{ fontFamily: '"Open Sans", sans-serif', color: 'black', fontWeight: 'bold', fontSize: '1rem' }}>{priceDisplay}</Typography> */}
                </CardContent>
            </div>
        </>
    )
}