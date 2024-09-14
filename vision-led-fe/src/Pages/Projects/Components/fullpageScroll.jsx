import { Box, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import React from 'react'
import BtnSeeMore from '../../Components/btnSeeMore'
import * as ProjectServices from "../../../Services/ProjectServices"
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
export default function FullpageScroll() {
    const navigate = useNavigate();
    const getAllProject = async () => {
        const res = await ProjectServices.GetAllProject();
        return res;
    }
    const { isLoading, data } = useQuery({ queryKey: ['projects'], queryFn: getAllProject })
    const handleNavLink = (projectId) => {
        navigate(`/project-details/${projectId}`);
    }
    return (
        <>
            <div className="container" style={{ marginTop: '62px' }}>
                {
                    isLoading === false ?
                        data?.data.length === 0 ?
                            <div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                <Typography variant="h5">
                                    Hiện tại chưa có dự án nào
                                </Typography>
                            </div>
                            :
                            data?.data.map((item, index) => {
                                if (index % 2 === 0) {
                                    return <section className='fp'>
                                        <Grid container sx={{
                                            padding: {
                                                xs: "5px",
                                                md: "20px"
                                            },
                                            alignItems: 'center'
                                        }}>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ borderRadius: '20px', objectFit: 'cover', overflow: 'hidden', maxHeight: "50vh" }} >
                                                <img style={{ width: '100%', height: '100%', }} src={item.image} alt="none" />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{}}>
                                                <Box sx={{
                                                    padding: {
                                                        xs: "5px",
                                                        md: "50px"
                                                    },
                                                    fontSize: {
                                                        xs: ".8rem",
                                                        md: "1rem"
                                                    },
                                                    alignItems: 'center',
                                                      fontFamily: "'Times New Roman', Times, serif"
                                                }}>
                                                    <Typography variant='h3' sx={{ textAlign: 'center', fontSize: { xs: "1.5rem", sm: "2rem" },
                                      fontFamily: "'Times New Roman', Times, serif" }}>{item.name}</Typography>
                                                    <Typography sx={{ margin: '20px 0',
                                      fontFamily: "'Times New Roman', Times, serif" }}>{item.description}</Typography>
                                                    <BtnSeeMore onClick={() => handleNavLink(item._id)} style={{ mgLeft: '0', transform: 'none' }} />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </section>
                                } else {
                                    return <section className='fp'>
                                        <Grid container sx={{
                                            padding: '20px',
                                            alignItems: 'center'
                                        }}>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ order: { xs: 2, md: 2, lg: 1 } }}>
                                                <Box sx={{
                                                    padding: {
                                                        xs: "5px",
                                                        md: "50px"
                                                    },
                                                    fontSize: {
                                                        xs: ".8rem",
                                                        md: "1rem"
                                                    },
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography variant='h3' sx={{ textAlign: 'center', fontSize: { xs: "1.5rem", sm: "2rem" } }}>{item.name}</Typography>
                                                    <Typography sx={{ margin: '20px 0' }}>{item.description}</Typography>
                                                    <BtnSeeMore onClick={() => handleNavLink(item._id)} style={{ mgLeft: '0', transform: 'none' }} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ order: { xs: 1, md: 1, lg: 2 }, borderRadius: '20px', objectFit: 'cover', overflow: 'hidden', maxHeight: "50vh" }} >
                                                <img style={{ width: '100%', height: '100%', }} src={item.image} alt="none" />
                                            </Grid>
                                        </Grid>
                                    </section>
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
