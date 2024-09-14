import React from 'react'
import AdminContent from './Components/AdminContent/AdminContent'
import AdminHeader from './Components/AdminHeader/AdminHeader'
import "./Components/Admin.css"
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
export default function Admin() {
    const { isAdmin } = useSelector(state => state.user)

    return (
        <>
            {
                isAdmin === true ?
                    <>
                        <Box sx={{
                            display: {
                                xs: "none",
                                md: "block"
                            }
                        }}>
                            <AdminHeader />
                            <AdminContent />
                        </Box>
                        <Box sx={{
                            display: {
                                xs: "block",
                                md: "none"
                            }
                        }}>
                            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                                Không khả dụng trên thiết bị điện thoại, tablet
                            </Typography>
                        </Box>
                    </>
                    : <p>Page not found</p>
            }
        </>
    )
}
