import { Box, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import React from 'react'
import BtnSeeMore from '../../Components/btnSeeMore'
import * as CollectionServices from "../../../Services/CollectionServices"
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
export default function FullpageScroll() {
    const navigate = useNavigate();
    const getAllCollection = async () => {
        const res = await CollectionServices.GetAllCollection();
        return res;
    }
    const { isLoading, data } = useQuery({ queryKey: ['collections'], queryFn: getAllCollection })
    const handleNavLink = (collectionId) => {
        navigate(`/products/${collectionId}`);
    }
    return (
        <>
            <div className="container" style={{ marginTop: '62px' }}>
                {
                    isLoading === false ?
                        data?.data.length === 0 ?
                            <div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                <Typography variant="h5">
                                    Hiện tại chưa có bộ sưu tập nào
                                </Typography>
                            </div>
                            :
                            data?.data.map((item, index) => {
                                if (index % 2 === 0) {
                                    return <div className='fp'>
                                        <Grid container sx={{
                                            padding: {
                                                xs: "0px",
                                                md: "20px"
                                            },
                                            alignItems: 'center'
                                        }}>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                                borderRadius: '20px', maxHeight: "50vh",
                                                overflow: 'hidden'
                                            }} >
                                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={item.image} alt="none" />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{}}>
                                                <Box sx={{
                                                    padding: {
                                                        xs: "10px 20px",
                                                        md: "10px 50px"
                                                    },
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography variant='h3' sx={{
                                                        textAlign: 'center',
                                                        fontSize: {
                                                            xs: "1.5rem",
                                                            sm: "2rem"
                                                        },
                                                        textTransform: "uppercase"
                                                    }}>{item.name}</Typography>
                                                    <div style={{ padding: "10px 0", display: 'flex', justifyContent: 'center' }}>

                                                        <BtnSeeMore onClick={() => handleNavLink(item._id)} style={{ mgLeft: '0', transform: 'none' }} />
                                                    </div>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </div>
                                } else {
                                    return <div className='fp'>
                                        <Grid container sx={{
                                            padding: {
                                                xs: "0px",
                                                md: "20px"
                                            },
                                            alignItems: 'center'
                                        }}>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ order: { xs: 2, md: 2, lg: 1 } }}>
                                                <Box sx={{
                                                    padding: {
                                                        xs: "50px",
                                                        md: "50px"
                                                    },
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography variant='h3' sx={{
                                                        textAlign: 'center',
                                                        fontSize: {
                                                            xs: "1.5rem",
                                                            sm: "2rem"
                                                        },
                                                        textTransform: "uppercase"
                                                    }}>{item.name}</Typography>
                                                    <div style={{ padding: "10px 0", display: 'flex', justifyContent: 'center' }}>
                                                        <BtnSeeMore onClick={() => handleNavLink(item._id)} style={{ mgLeft: '0', transform: 'none' }} />
                                                    </div>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                                order: { xs: 1, md: 1, lg: 2 }, maxHeight: "50vh", borderRadius: '20px', overflow: 'hidden'
                                            }} >
                                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={item.image} alt="none" />
                                            </Grid>
                                        </Grid>
                                    </div>
                                }
                            })
                        :
                        <Box sx={{ position: 'fixed', width: '60vw', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                                <LinearProgress color="inherit" style={{ color: 'gray', height: '7px' }} />
                            </Stack>
                        </Box>
                }
            </div>
        </>
    )
}
