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
                fontWeight: "300", fontFamily: "Roboto"
            }}>
                <Grid container sx={{ position: 'relative', padding: '50px'}}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Typography variant="h3" sx={{color: 'white', fontSize: '1.5rem', fontWeight: "bold", textAlign: 'left', marginBottom: "30px"}}>Liên hệ chúng tôi</Typography>

                        <Typography variant="h5" sx={{color: 'white', fontSize: '1rem', textAlign: 'left'}}>Địa chỉ</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'left'}}>Số 22 Thanh Nhàn, phường Thanh Nhàn, Quận Hai Bà Trưng, Hà Nội</Typography>
                        <br />
                        <Typography variant="h5" sx={{color: 'white', fontSize: '1rem', textAlign: 'left'}}>Liên hệ</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'left'}}>0913.201920 – 0978.116688</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'left'}}>tamanhlighting@gmail.com</Typography>
                    
                        <Box sx={{display: "flex", alignItems: "center", gap: "10px", marginTop: "20px"}}>
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
                        </Box>
                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} sx={{display: "flex", alignItems:"center", gap:"10px", marginBottom: "15px", paddingLeft: {xs:"50vw", md: "55px"}}}>
                       
                    </Grid> 
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <Box sx={{color: "white"}}>
                            <Typography sx={{fontSize: '1.5rem', fontWeight: "bold", fontFamily: "Roboto", marginBottom: "30px"}}>Về Chúng Tôi</Typography>
                            <Typography sx={{fontWeight: "300", fontFamily: "Roboto", fontSize: '0.8rem'}}>Với 20 năm kinh nghiệm, chúng tôi là công ty hàng đầu chuyên sản xuất và thiết kế các giải pháp chiếu sáng cho các công trình lớn. Thành công của chúng tôi trong ngành là nhờ vào khả năng hiểu và đáp ứng mong đợi và nguyện vọng của khách hàng. Bằng cách hợp tác với các đối tác từ khắp nơi trên thế giới, chúng tôi cung cấp cho khách hàng những vật liệu chất lượng hàng đầu và những lợi ích lớn nhất khi sử dụng.</Typography>
                        </Box>
                        <Box sx={{margin: "10px 0", marginTop: "20px"}}>
                            <Button color='primary' sx={{
                                                    transform: `00`,
                                                    color: 'white',
                                                    padding: '8px 20px',
                                                    border: '1px solid white',
                                                    backgroundColor: '#27272700',
                                                    fontFamily:  "Roboto",
                                                    fontSize: {xs: ".5rem", md: ".7rem"},
                                                    '&:hover': {
                                                        backgroundColor: 'black',
                                                        border: '1px solid white',
                                                        color: 'white',
                                                        borderColor: 'white',
                                                        transition: '.3s',
                                                    },
                                                }}>Trở thành đối tác của Tam Anh Lighting</Button>
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