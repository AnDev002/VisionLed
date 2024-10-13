import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import * as ProjectServices from "../../../../Services/ProjectServices"
import { useQuery } from '@tanstack/react-query'
import ProjectSlideShow from '../../../Components/projectSlideShow'
export default function ProjectDetailsContent() {
    const { projectId } = useParams()
    
    // const getAllProject = async () => {
    //     const res = await ProjectServices.GetAllProject();
    //     return res;
    // }
    // const { isLoading, data } = useQuery({ queryKey: ['projects'], queryFn: getAllProject })

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
            <Box>
                <img style={{ width: '100vw', height: 'auto', objectFit: 'cover', overflow: 'hidden' }} src={dataDetails?.data[0]?.image} alt="" />
            </Box>
            <Box sx={{ marginTop: '20px', textAlign: 'left', marginLeft: {xs: '10px', md: '80px'} }}>
                <Typography variant='h5' sx={{ 
                                      fontWeight: '400', fontFamily: "'Noto Serif Display', serif" }}>
                    {
                        dataDetails ? (dataDetails?.data[0]?.project?.name).toUpperCase() : ""
                    }
                </Typography>
            </Box>
            <Grid container spacing={"10px"} sx={{
                padding: {
                    xs: "0 5px",
                    sm: "0 15px",
                    md: "0 80px",
                    lg: "0 80px",
                    xl: "0 80px"
                },
            }}>                                
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Box sx={{ margin: '10px 0', textAlign: 'left' }}>
                        <Typography variant='body2' sx={{ 
                                            fontWeight: '700', fontFamily: "'Noto Serif Display', sans-serif" }}>
                            Thông tin chi tiết
                        </Typography>
                    </Box>
                    <Box >
                        {
                            dataDetails ? <>
                                {
                                    dataDetails?.data?.map((item, index) => {
                                        return <>
                                            <Typography variant='body3' sx={{   
                                                fontWeight: "300", fontFamily: "'Afacad Flux', sans-serif"}}>
                                                        {item.description}
                                            </Typography>
                                        </>
                                    })
                                }
                            </> : ""
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Box sx={{ margin: {md:'30px 20px'}, marginBottom: {md: '5px'} }}>
                            <Typography variant='body2' sx={{ 
                                                fontWeight: '700', fontFamily: "'Noto Serif Display', sans-serif" }}>
                                Thông tin dự án
                            </Typography>
                        </Box>
                        <Box>
                        <Typography variant='body3' sx={{ margin: {md:'30px 20px'}, 
                                                fontWeight: "300", fontFamily: "'Afacad Flux', sans-serif" }}>
                                Đơn vị cung cấp: Tam Anh Lighting
                            </Typography>
                        </Box>
                </Grid>
            </Grid>
            <Box sx={{marginTop: {xs: "15px", md: "56px"}, marginBottom: "10px"}}>
                <ProjectSlideShow project={dataDetails?.data} />
            </Box>
        </>
    )
}
