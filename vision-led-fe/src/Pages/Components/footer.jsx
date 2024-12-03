import { Box, Grid, Typography } from '@mui/material';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import { PiFacebookLogoLight } from "react-icons/pi";
import { PiTiktokLogo } from "react-icons/pi";
import { HiOutlinePhone } from "react-icons/hi";

export default function GlobalFooter() {
    return (
        <>
            <Box sx={{
                backgroundColor: '#272727',
                fontWeight: "300", fontFamily: "'Afacad Flux', sans-serif"
            }}>
                <Grid container sx={{ position: 'relative', padding: '50px'}}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{display: "flex", alignItems:"center", gap:"10px", marginBottom: "15px"}}>
                       <span style={{cursor:"pointer", color: "#3065a1", fontSize: "2rem"}}>
                        <PiFacebookLogoLight/>
                       </span>
                       <span style={{cursor:"pointer", color: "white", fontSize: "1.5rem"}}>
                        <PiTiktokLogo/>
                       </span>
                       <span style={{cursor:"pointer", color: "white", fontSize: "1.5rem"}}>
                        <HiOutlinePhone/>
                       </span>
                    </Grid> 
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="h5" sx={{color: 'white', fontSize: '1rem', textAlign: 'right'}}>Địa chỉ</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'right'}}>Số 22 Thanh Nhàn, phường Thanh Nhàn, Quận Hai Bà Trưng, Hà Nội</Typography>
                        <br />
                        <Typography variant="h5" sx={{color: 'white', fontSize: '1rem', textAlign: 'right'}}>Liên hệ</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'right'}}>0913.201920 – 0978.116688</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'right'}}>tamanhlighting@gmail.com</Typography>
                    </Grid>
                </Grid>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="body3" sx={{color: 'white', fontSize: '0.7rem'}}>Copyright 2023 © Công ty trách nhiệm hữu hạn điện chiếu sáng Tam Anh, thành lập ngày 6/5/2003</Typography>
                </Box>
            </Box>
        </>
    )
}