import React, { useMemo } from 'react'
import './../home.css'
import { Box, Card, CardMedia, Grid, Typography } from '@mui/material'
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
                                xs: "0 20px",
                                sm: "0 20px",
                                md: "0 50px",
                                lg: "0 50px",
                                xl: "0 50px"
                            }
                        }}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                padding: {
                                    xs: "5px",
                                    md: "80px"
                                },
                                paddingRight: {
                                    xs: "5px",
                                    md: "50px",
                                }
                            }}>
                                {
                                    data?.data.slice(0, Math.floor(totalCollections / 2)).map((item, index) => {

                                        return <Card sx={{
                                            cursor: 'pointer',
                                            width: '100%',
                                            height: 'auto',
                                            backgroundColor: '#ffffff'
                                        }} className="crd crd-collection">
                                            <CardMedia alt='unsplash image' component="img" sx={{ height: randomNums1[index] }} image={item.image} />
                                            <Typography variant='h4' sx={{ textAlign: 'center', margin: '10px 0', fontWeight: "400", fontFamily: "'Afacad Flux', sans-serif", textTransform: "uppercase", fontSize: "1.5rem" }}>{item.name}</Typography>
                                            <BtnSeeMore collectionId={item._id} mgLeft={'50%'} transform='translateX(-50%)' />
                                        </Card>
                                    })
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                padding: {
                                    xs: "5px",
                                    md: "80px",
                                },
                                paddingLeft: {
                                    xs: "5px",
                                    md: "50px",
                                }
                            }}>
                                {
                                    data?.data.slice(Math.floor(totalCollections / 2), totalCollections).map((item, index) => {
                                        return <Card sx={{
                                            cursor: 'pointer',
                                            width: '100%',
                                            height: 'auto',
                                            backgroundColor: '#ffffff'
                                        }} className="crd crd-collection">
                                            <CardMedia alt='unsplash image' sx={{ height: randomNums2[index] }} component="img" image={item.image} />
                                            <Typography variant='h4' sx={{ textAlign: 'center', margin: '10px 0', fontWeight: "400", fontFamily: "'Afacad Flux', sans-serif", textTransform: "uppercase", fontSize: "1.3rem" }}>{item.name}</Typography>
                                            <BtnSeeMore collectionId={item._id} mgLeft={'50%'} transform='translateX(-50%)' />
                                        </Card>
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