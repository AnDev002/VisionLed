import React from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
    const navigate = useNavigate();
    const handleNav = () => {
        navigate("/");
    }
    return (
        <>
            <Box sx={{ bgcolor: 'white', display: 'flex', justifyContent: 'space-between', padding: '30px' }}>
                <Typography variant='h5'>
                    Vision Led
                </Typography>
                <Box>

                    Adminstrator
                    <br />
                    <Box onClick={handleNav} sx={{
                        color: "gray", cursor: "pointer", fontSize: ".8rem", "&:hover": {
                            color: "black",
                            transition: ".5s"
                        }
                    }}>
                        Go to home page
                    </Box>
                </Box>
            </Box>
        </>
    )
}
