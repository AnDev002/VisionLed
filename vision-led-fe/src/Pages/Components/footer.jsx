import { Box, Button, Grid, Typography } from '@mui/material';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import { PiFacebookLogoLight } from "react-icons/pi";
import { PiTiktokLogo } from "react-icons/pi";
import { HiOutlinePhone } from "react-icons/hi";
import { SiZalo } from "react-icons/si";
import BtnSeeMore from './btnSeeMore';
import { useState } from 'react';

function EmailForm(props) {

    return (
        <>
            <Box sx={{position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100}} onClick={props?.onClickEv}></Box>
            <Box sx={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 101, padding: "20px 30px", bgcolor: "white", border: "1px solid black", borderRadius: "5px", alignItems: "center"}}>
                <Box sx={{display: 'flex', justifyContent: "center"}}>
                    <Typography variant='h5' sx={{fontFamily:'"Open Sans", sans-serif', fontWeight: 400 }}>Thông Tin Liên Hệ</Typography>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='h6' sx={{fontFamily:'"Open Sans", sans-serif', fontWeight: 400 }}>Tên</Typography>
                    </Box>
                    <input type="text" placeholder='Nhập tên ở đây!' style={{border: "none", outline: "none", fontFamily: '"Open Sans", sans-serif', fontWeight: 400}}/>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='h6' sx={{fontFamily:'"Open Sans", sans-serif', fontWeight: 400 }}>Email</Typography>
                    </Box>
                    <input type="text" placeholder='Nhập email ở đây!' style={{border: "none", outline: "none", fontFamily: '"Open Sans", sans-serif', fontWeight: 400}}/>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='h6' sx={{fontFamily:'"Open Sans", sans-serif', fontWeight: 400 }}>Số điện thoại</Typography>
                    </Box>
                    <input type="text" placeholder='Nhập số điện thoại ở đây!' style={{border: "none", outline: "none", fontFamily: '"Open Sans", sans-serif', fontWeight: 400}}/>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='h6' sx={{fontFamily:'"Open Sans", sans-serif', fontWeight: 400 }}>Ghi chú thêm</Typography>
                    </Box>
                    <input type="text" placeholder='Nhập số ghi chú ở đây!' style={{border: "none", outline: "none", fontFamily: '"Open Sans", sans-serif', fontWeight: 400}}/>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='body2' sx={{fontFamily:'"Open Sans", sans-serif', color: "gray", fontWeight: 400 }}>*Chúng tôi sẽ liên hệ lại cho bạn trong thời gian sớm nhất!</Typography>
                    </Box>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0", float: "right"}}>
                    <Box sx={{display: "flex"}}>
                        <Button onClick={props?.onClickEv}>
                            <Typography variant='body2' sx={{fontFamily:'"Open Sans", sans-serif', color: "black", fontWeight: 400 }}>Hủy</Typography>
                        </Button>
                        <Button onClick={props?.onClickEv}>
                            <Typography variant='body2' sx={{fontFamily:'"Open Sans", sans-serif', color: "black", fontWeight: 400 }}>Gửi</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default function GlobalFooter() {
    let [toggleFooter, setToggleFooter] = useState(false);
    const handleToggleFooter = () => setToggleFooter(!toggleFooter);
    return (
        <>

            <Box sx={{
                backgroundColor: '#272727',
                fontWeight: "400", fontFamily: '"Open Sans", sans-serif'
            }}>
                <Grid container sx={{ position: 'relative', padding: '50px'}}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Typography variant="h3" sx={{color: 'white', fontSize: '1.5rem', fontWeight: "400", textAlign: 'left', marginBottom: "30px", fontFamily: '"Open Sans", sans-serif'}}>Liên hệ chúng tôi</Typography>

                        <Typography variant="h5" sx={{color: 'white', fontSize: '1rem', textAlign: 'left', fontFamily: '"Open Sans", sans-serif', fontWeight: "400"}}>Địa chỉ</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'left', fontFamily: '"Open Sans", sans-serif', fontWeight: "400"}}>Số 22 Thanh Nhàn, phường Thanh Nhàn, Quận Hai Bà Trưng, Hà Nội</Typography>
                        <br />
                        <Typography variant="h5" sx={{color: 'white', fontSize: '1rem', textAlign: 'left', fontFamily: '"Open Sans", sans-serif', fontWeight: "400"}}>Liên hệ</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'left', fontFamily: '"Open Sans", sans-serif', fontWeight: "400"}}>0913.201920 – 0978.116688</Typography>
                        <Typography variant="body1" sx={{color: 'white', fontSize: '0.8rem', textAlign: 'left', fontFamily: '"Open Sans", sans-serif', fontWeight: "400"}}>tamanhlighting@gmail.com</Typography>
                    
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
                            <Typography sx={{fontSize: '1.5rem',  fontFamily: '"Open Sans", sans-serif', fontWeight: "400", marginBottom: "30px"}}>Về Chúng Tôi</Typography>
                            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontWeight: "400", fontSize: '0.8rem'}}>Với 20 năm kinh nghiệm, chúng tôi là công ty hàng đầu chuyên sản xuất và thiết kế các giải pháp chiếu sáng cho các công trình lớn. Thành công của chúng tôi trong ngành là nhờ vào khả năng hiểu và đáp ứng mong đợi và nguyện vọng của khách hàng. Bằng cách hợp tác với các đối tác từ khắp nơi trên thế giới, chúng tôi cung cấp cho khách hàng những vật liệu chất lượng hàng đầu và những lợi ích lớn nhất khi sử dụng.</Typography>
                        </Box>
                        <Box sx={{margin: "10px 0", marginTop: "20px"}}>
                            <Button color='primary' onClick={handleToggleFooter} sx={{
                                                    transform: `00`,
                                                    color: 'white',
                                                    padding: '8px 20px',
                                                    border: '1px solid white',
                                                    backgroundColor: '#27272700',
                                                    fontFamily: '"Open Sans", sans-serif', fontWeight: "400",
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
                        {
                            toggleFooter == true ? <EmailForm onClickEv={handleToggleFooter}/> : ""
                        }
                        
                    </Grid>
                </Grid>
                 
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="body3" sx={{color: 'white', fontSize: '0.7rem', fontFamily: '"Open Sans", sans-serif', fontWeight: "400"}}>Copyright 2023 © Công ty trách nhiệm hữu hạn điện chiếu sáng Tam Anh, thành lập ngày 6/5/2003</Typography>
                </Box>
            </Box>
        </>
    )
}

