import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import * as ProjectServices from "../../../../Services/ProjectServices"
import { useQuery } from '@tanstack/react-query'
export default function ProjectDetailsContent() {
    const { projectId } = useParams()

    const GetProjectDetails = async (projectId) => {
        if (projectId) {
            const res = await ProjectServices.GetProjectDetails(projectId);
            return res
        }
        return null;
    }
    const { isLoading: isLoadingDetails, data: dataDetails } = useQuery({ queryKey: ['project-details', projectId], queryFn: () => GetProjectDetails(projectId), enable: !!projectId })
    return (
        <>
            <Box sx={{ marginTop: '120px', textAlign: 'center' }}>
                <Typography variant='h3' sx={{ textAlign: 'center',
                                      fontFamily: "'Cormorant Garamond', serif" }}>
                    {
                        dataDetails ? (dataDetails?.data[0]?.project?.name).toUpperCase() : ""
                    }
                </Typography>
            </Box>
            <Grid container sx={{
                padding: {
                    xs: "0 5px",
                    sm: "0 15px",
                    md: "0 20px",
                    lg: "0 20px",
                    xl: "0 20px"
                },
                alignItems: 'center'
            }}>
                {
                    dataDetails ? <>
                        {
                            dataDetails?.data?.map((item, index) => {
                                if (index % 2 === 0 && item.image !== "" && item.description !== "") {
                                    return <>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                            padding: {
                                                xs: "5px",
                                                md: "50px"
                                            },

                                        }}>
                                            <img style={{ maxWidth: "100%", borderRadius: '10px', objectFit: 'cover', overflow: 'hidden' }} src={item.image} alt="" />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                            padding: {
                                                xs: "5px",
                                                md: "50px"
                                            }
                                        }}>
                                            <Typography variant='h5' sx={{
                                      fontFamily: "'Cormorant Garamond', serif"}}>
                                                {item.description}
                                            </Typography>
                                        </Grid>
                                    </>
                                } else if (index % 2 !== 0 && item.image !== "" && item.description !== "") {
                                    return <>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                            padding: {
                                                xs: "5px",
                                                md: "50px"
                                            },
                                            order: { xs: 2, md: 2, lg: 2 }
                                        }}>
                                            <Typography variant='h5' sx={{
                                      fontFamily: "'Cormorant Garamond', serif"}}>
                                                {item.description}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                                            padding: {
                                                xs: "5px",
                                                md: "50px"
                                            },
                                            order: { xs: 1, md: 1, lg: 2 }
                                        }}>
                                            <img style={{ maxWidth: "100%", borderRadius: '10px', objectFit: 'cover', overflow: 'hidden' }} src={item.image} alt="" />
                                        </Grid>
                                    </>
                                } else if (item.image !== "" && item.description === "") {
                                    return <Grid item key={item._id} xs={12} sm={12} md={12} lg={12} xl={12} sx={{
                                        padding: {
                                            xs: "5px",
                                            md: "50px"
                                        }, order: 3
                                    }}>
                                        <img style={{ maxWidth: "100%", borderRadius: '10px', objectFit: 'cover', overflow: 'hidden' }} src={item.image} alt="" />
                                    </Grid>
                                } else if (item.image === "" && item.description !== "") {
                                    return <Grid key={item._id} item xs={12} sm={12} md={12} lg={12} xl={12} sx={{
                                        padding: {
                                            xs: "5px",
                                            md: "50px"
                                        }, order: 3
                                    }}>
                                        <Typography variant='h5' sx={{
                                      fontFamily: "'Cormorant Garamond', serif"}}>
                                            {item.description}
                                        </Typography>
                                    </Grid>
                                }
                            })
                        }
                    </> : ""
                }
            </Grid>
        </>
    )
}
