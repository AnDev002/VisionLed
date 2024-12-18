import { Box, Button, Grid, Typography } from '@mui/material';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import { PiFacebookLogoLight } from "react-icons/pi";
import { PiTiktokLogo } from "react-icons/pi";
import { HiOutlinePhone } from "react-icons/hi";
import { SiZalo } from "react-icons/si";
import BtnSeeMore from './btnSeeMore';
export default function GlobalFooter() {
    return (
        <>
            <Box sx={{
                backgroundColor: '#272727',
                fontWeight: "300", fontFamily: "'Afacad Flux', sans-serif"
            }}>
                <Grid container sx={{ position: 'relative', padding: '50px'}}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Typography variant="h5" sx={{color: 'white', fontSize: '1rem', textAlign: 'left'}}>Địa chỉ</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'left'}}>Số 22 Thanh Nhàn, phường Thanh Nhàn, Quận Hai Bà Trưng, Hà Nội</Typography>
                        <br />
                        <Typography variant="h5" sx={{color: 'white', fontSize: '1rem', textAlign: 'left'}}>Liên hệ</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'left'}}>0913.201920 – 0978.116688</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'left'}}>tamanhlighting@gmail.com</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} sx={{display: "flex", alignItems:"center", gap:"10px", marginBottom: "15px", paddingLeft: {xs:"50vw", md: "55px"}}}>
                       <span style={{cursor:"pointer", color: "#3065a1", fontSize: "2rem"}}>
                        <PiFacebookLogoLight/>
                       </span>
                       <span style={{cursor:"pointer", color: "white", fontSize: "1.5rem"}}>
                        <PiTiktokLogo/>
                       </span>
                       <span style={{cursor:"pointer", color: "white", fontSize: "1.5rem"}}>
                        <SiZalo/>
                       </span>
                       <span style={{cursor:"pointer", color: "white", fontSize: "1.5rem"}}>
                        <HiOutlinePhone/>
                       </span>
                    </Grid> 
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <Box sx={{borderRadius: "20px", overflow: "hidden", cursor: "pointer", position:"relative"}}>
                            <img style={{width: "100%", height: "100%"}} src="hiltongarden.webp" alt="tamanhlighting" />
                                <Box sx={{position:"absolute", top: 0, left: 0, right: 0, top: 0, width: "500px", height: "500px", backgroundColor: "#0000009c", zIndex: "50"}}></Box>
                                <div style={{position: "absolute", top: "35%", left: "42%", transform: "translate(-35%, -42%)", zIndex: "100"}}>
                                    <Typography sx={{color: "white", fontSize: {xs: ".7rem", md: "1.2rem"}, whiteSpace: "nowrap", whiteSpace: "nowrap"}}>Trở thành đối tác của Tam Anh Lighting</Typography>
                                </div>
                                <div style={{position: "absolute", top: "60%", left: "50%", transform: "translate(-60%, -50%)", zIndex: "100"}}>
                                    <Button color='primary' sx={{
                                            transform: `00`,
                                            color: 'white',
                                            padding: '8px 20px',
                                            border: '1px solid white',
                                            backgroundColor: '#27272700',
                                            fontFamily:  "'Afacad Flux', sans-serif",
                                            borderRadius: '20px',
                                            fontSize: {xs: ".5rem", md: ".7rem"},
                                            '&:hover': {
                                                backgroundColor: 'black',
                                                border: '1px solid white',
                                                color: 'white',
                                                borderColor: 'white',
                                                transition: '.3s',
                                            },
                                        }}>Tham gia</Button>
                                </div>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="body3" sx={{color: 'white', fontSize: '0.7rem'}}>Copyright 2023 © Công ty trách nhiệm hữu hạn điện chiếu sáng Tam Anh, thành lập ngày 6/5/2003</Typography>
                </Box>
            </Box>
        </>
    )
}