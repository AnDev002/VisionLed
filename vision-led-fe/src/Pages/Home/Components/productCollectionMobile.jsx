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
  
      const navigate = useNavigate()
      const handleNavLink = (collectionId) => {
          navigate(`/products/${collectionId}`);
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
        style={{}}
      >
        <Card sx={{
            cursor: 'pointer',
            width: '100%',
            height: 'auto',
            backgroundColor: '#ffffff',
            overflow: 'hidden', // Đảm bảo ảnh không tràn ra ngoài
            '&:hover img': {
              transform: 'scale(1.2)', // Scale ảnh khi hover
            },
            '&:hover .overlay': {
              opacity: 0, // Khi hover vào thì layer mờ dần
            },
            padding: "0 0 !important",
        }} className="crd crd-collection">
          <Box
            sx={{
              position: "relative", // Để overlay có thể fit với ảnh
              width: "100%",
              maxWidth: "1000px",
              aspectRatio: "1 / 1",
            }}
          >
            <CardMedia alt='unsplash image' onClick={() => handleNavLink(props.itemId)} component="img" sx={{ width: "100%", 
                                                                  maxWidth: "1000px",
                                                                  aspectRatio: "1 / 1",
                                                                  objectFit: "cover", 
                                                                  transition: "transform 1.2s ease-in-out" }} image={props.itemImage} />
            
            {/* <BtnSeeMore collectionId={props.itemId} mgLeft={'50%'} transform='translateX(-50%)' /> */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.3)", // Màu đen mờ
                transition: "opacity 1.2s ease-in-out",
              }}
            />
            </Box>
            <Typography variant='h5' sx={{ position: "absolute", bottom: '15px', left: "50%", color: "white", transform: "translateX(-50%)", textAlign: 'center', margin: '10px 0', fontWeight: "400", fontFamily: '"Open Sans", sans-serif', textTransform: "uppercase", fontSize: "1rem" }}>{props.itemName}</Typography>
        </Card>
      </div>
    );
  };


export default function ProductCollectionMobile() {
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

                    <Box sx={{marginTop: "30px"}}>
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
                                    xs: "0 ",
                                    md: " 0  "
                                },
                                paddingRight: {
                                    xs: " 0 ",
                                    md: " 0  ",
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
                                        //     <Typography variant='h4' sx={{ textAlign: 'center', margin: '10px 0', fontWeight: "400", fontFamily: "'Afacad Flux', sans-serif", textTransform: "uppercase", fontSize: "1.5rem" }}>{item.name}</Typography>
                                        //     <BtnSeeMore collectionId={item._id} mgLeft={'50%'} transform='translateX(-50%)' />
                                        // </Card>
                                    })
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                padding: {
                                    xs: " 0 ",
                                    md: " 0  "
                                },
                                paddingRight: {
                                    xs: " 0 ",
                                    md: " 0  ",
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