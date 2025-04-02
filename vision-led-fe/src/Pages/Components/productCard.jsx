import React, { useEffect, useRef, useState } from 'react'
// import { Link } from "react-router-dom";
import './globalComponents.css';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../Ults';

const FadeUpSection = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const navigate = useNavigate();
    const handleLink = () => {
        navigate(`/product-details/${props.index}`)
    }

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
        <Card sx={{
                // cursor: 'pointer', border: '1px solid #f3f3f3',
                // display: 'flex',
                // flexDirection: 'column',
                // height: '100%'
            }} className='card'>
                <span onClick={handleLink}>
                    <CardMedia alt='unsplash image' component="img" image={props.image} />
                    <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, minHeight: "150px", justifyContent: 'end', textAlign: 'left', display: 'flex', flexDirection: 'column', borderRadius: "0 !important" }}>
                        <Typography gutterBottom variant='h5' sx={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 400, color: 'black', fontSize: '1rem', flex: 'left' }}>{props.productName}</Typography>
                        {/* <Typography variant='body1' sx={{ fontFamily: "Roboto", color: 'black', fontWeight: 'bold', fontSize: '1rem' }}>{props.priceDisplay}</Typography> */}
                    </CardContent>
                </span>
            </Card >
      </div>
    );
  };

export default function ProductCard(props) {
    const priceDisplay = (props.minPrice !== props.maxPrice) ? formatPrice(parseInt(props.minPrice)) + " - " + formatPrice(parseInt(props.maxPrice)) : formatPrice(parseInt(props.minPrice))
    // const saleRateDisplay = "-" + (props.saleRate * 100) + "%"
    return (
        <>
            <FadeUpSection image={props.productImg ? props.productImg : ""} productName={props.productName} priceDisplay={priceDisplay} index={props.index}/>
        </>
    )
}