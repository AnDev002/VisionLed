import React, { useEffect, useMemo, useRef, useState } from 'react'
import './../home.css'
import { Box, Card, Button, CardMedia, Grid, Typography } from '@mui/material'
import BtnSeeMore from '../../Components/btnSeeMore'
import * as CollectionServices from "../../../Services/CollectionServices"
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const generateRandomNumbers = (totalSum, count) => {
    const numbers = [];
    let currentSum = 0;

    for (let i = 0; i < count - 1; i++) {
        const maxRandomNumber = totalSum - currentSum - (count - i - 1) * 300;
        const randomNumber = Math.floor(Math.random() * (maxRandomNumber - 300 + 1)) + 300;
        numbers.push(randomNumber);
        currentSum += randomNumber;
    }

    const lastNumber = totalSum - currentSum;

    if (lastNumber >= 300 && count > 0) {
        numbers.push(lastNumber);
        return numbers;
    } else {
        return [];
    }
}


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
        <Card sx={{
            cursor: 'pointer',
            width: '100%',
            height: 'auto',
            backgroundColor: '#ffffff'
        }} className="crd crd-collection">
            <CardMedia alt='unsplash image' component="img" sx={{ height: props.itemRan[props.itemIndex] }} image={props.itemImage} />
            <Typography variant='h4' sx={{ textAlign: 'center', margin: '10px 0', fontWeight: 400, fontFamily: '"Open Sans", sans-serif', textTransform: "uppercase", fontSize: "1.5rem" }}>{props.itemName}</Typography>
            <BtnSeeMore collectionId={props.itemId} mgLeft={'50%'} transform='translateX(-50%)' />
        </Card>
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
        <Card sx={{
            cursor: 'pointer',
            width: '100%',
            height: 'auto',
            backgroundColor: '#ffffff'
        }} className="crd crd-collection">
            <CardMedia alt='unsplash image' component="img" sx={{ height: props.itemRan[props.itemIndex] }} image={props.itemImage} />
            <Typography variant='h4' sx={{ textAlign: 'center', margin: '10px 0', fontWeight: "bold", fontFamily: '"Open Sans", sans-serif', textTransform: "uppercase", fontSize: "1.5rem" }}>{props.itemName}</Typography>
            <BtnSeeMore collectionId={props.itemId} mgLeft={'50%'} transform='translateX(-50%)' />
        </Card>
      </div>
    );
  };


export default function ProductCollection() {
    const getAllCollection = async () => {
        const res = await CollectionServices.GetAllCollection();
        return res;
    }
    const { isLoading, data } = useQuery({ queryKey: ['collections'], queryFn: getAllCollection })
    const totalCollections = data?.data.length

    const totalSum = 350 * Math.ceil(totalCollections / 2)
    const randomNumber1 = data?.data.slice(0, Math.floor(totalCollections / 2)).length
    const randomNumber2 = data?.data.slice(Math.floor(totalCollections / 2), totalCollections).length
    const randomNums1 = useMemo(() => generateRandomNumbers(totalSum, randomNumber1), [totalSum, randomNumber1]);
    const randomNums2 = useMemo(() => generateRandomNumbers(totalSum, randomNumber2), [totalSum, randomNumber2]);
    return (
        <>
            {
                data?.data ?

                    <Box>
                        <Grid container sx={{
                            padding: {
                                xs: "0 0px",
                                sm: "0 0px",
                                md: "0 0px",
                                lg: "0 0px",
                                xl: "0 0px"
                            }
                        }}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                padding: {
                                    xs: "5px",
                                    md: "16px"
                                },
                                paddingRight: {
                                    xs: "5px",
                                    md: "10px",
                                }
                            }}>
                                {
                                    data?.data.slice(0, Math.floor(totalCollections / 2)).map((item, index) => {
                                        return <FadeUpSection itemId={item._id} itemImage={item.image} itemName={item.name} itemIndex={index} itemRan={randomNums1}/>
                                        // <Card sx={{
                                        //     cursor: 'pointer',
                                        //     width: '100%',
                                        //     height: 'auto',
                                        //     backgroundColor: '#ffffff'
                                        // }} className="crd crd-collection">
                                        //     <CardMedia alt='unsplash image' component="img" sx={{ height: randomNums1[index] }} image={item.image} />
                                        //     <Typography variant='h4' sx={{ textAlign: 'center', margin: '10px 0', fontWeight: "bold", fontFamily: "'Afacad Flux', sans-serif", textTransform: "uppercase", fontSize: "1.5rem" }}>{item.name}</Typography>
                                        //     <BtnSeeMore collectionId={item._id} mgLeft={'50%'} transform='translateX(-50%)' />
                                        // </Card>
                                    })
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                padding: {
                                    xs: "5px",
                                    md: "10px"
                                },
                                paddingRight: {
                                    xs: "5px",
                                    md: "16px",
                                }
                            }}>
                                {
                                    data?.data.slice(Math.floor(totalCollections / 2), totalCollections).map((item, index) => {
                                        return <FadeUpSection itemId={item._id} itemImage={item.image} itemName={item.name} itemIndex={index} itemRan={randomNums2}/>
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Box>
                    : ""
            }
        </>
    )
}