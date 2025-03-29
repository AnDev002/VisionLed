import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function EmailForm() {

    return (
        <>
            <Box sx={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "20px 30px", bgcolor: "white", border: "1px solid black", borderRadius: "5px", alignItems: "center"}}>
                <Box sx={{display: 'flex', justifyContent: "center"}}>
                    <Typography variant='h5' sx={{fontFamily:'"Open Sans", sans-serif' }}>Thông Tin Liên Hệ</Typography>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='h6' sx={{fontFamily:'"Open Sans", sans-serif' }}>Tên</Typography>
                    </Box>
                    <input type="text" placeholder='Nhập tên ở đây!' style={{border: "none", outline: "none", fontFamily: '"Open Sans", sans-serif'}}/>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='h6' sx={{fontFamily:'"Open Sans", sans-serif' }}>Email</Typography>
                    </Box>
                    <input type="text" placeholder='Nhập email ở đây!' style={{border: "none", outline: "none", fontFamily: '"Open Sans", sans-serif'}}/>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='h6' sx={{fontFamily:'"Open Sans", sans-serif' }}>Số điện thoại</Typography>
                    </Box>
                    <input type="text" placeholder='Nhập số điện thoại ở đây!' style={{border: "none", outline: "none", fontFamily: '"Open Sans", sans-serif'}}/>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='h6' sx={{fontFamily:'"Open Sans", sans-serif' }}>Ghi chú thêm</Typography>
                    </Box>
                    <input type="text" placeholder='Nhập số ghi chú ở đây!' style={{border: "none", outline: "none", fontFamily: '"Open Sans", sans-serif'}}/>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0"}}>
                    <Box>
                        <Typography variant='body2' sx={{fontFamily:'"Open Sans", sans-serif', color: "gray" }}>*Chúng tôi sẽ liên hệ lại cho bạn trong thời gian sớm nhất!</Typography>
                    </Box>
                </Box>
                <Box sx={{display: "flex", gap: "10px", margin: "15px 0", float: "right"}}>
                    <Button>
                        <Typography variant='body2' sx={{fontFamily:'"Open Sans", sans-serif', color: "black" }}>Gửi</Typography>
                    </Button>
                </Box>
            </Box>
        </>
    )
}
