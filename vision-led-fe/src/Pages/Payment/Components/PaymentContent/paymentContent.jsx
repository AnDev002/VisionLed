import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getTotalPrice, removeProduct } from '../../../../Redux/Slides/orderSlide';
import { formatPrice } from '../../../../Ults';
import QuantityInput from '../../../Components/quantityInput';
import QuantityCustom from '../../../Components/quantityCustom';
import CloseIcon from '@mui/icons-material/Close';
function createData(
    image,
    name,
    type,
    sale_price,
    quantity,
    total_price,
    _id
) {
    return {
        image,
        name,
        type,
        sale_price,
        quantity,
        total_price,
        _id
    };
}


export default function PaymentContent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const backToProductPage = () => {
        navigate("/products/0")
    }
    useEffect(() => {
        dispatch(getTotalPrice())
    }, [])

    const removeFromCart = (id) => {
        dispatch(removeProduct({ productId: id }))
        dispatch(getTotalPrice())

    }

    const orderSelector = useSelector((state) => state.order);
    let rows = [];

    const generateRandomOrderId = () => {
        const length = 8;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    };



    const randomOrderId = generateRandomOrderId();

    const newData = orderSelector.orderItems.map((item) => createData(
        item.main_image,
        item.itemName,
        item.product_type,
        item.sale_price,
        item.quantity,
        item.sale_price * item.quantity,
        item.productDetails)
    );

    rows = [...newData]
    return (
        <>
            <Box sx={{
                padding: {
                    xs: "5px",
                    md: "50px"
                },
                marginTop: '160px'
            }}>
                <Typography variant='h3' sx={{
                    padding: {
                        xs: "5px",
                        md: "20px"
                    },
                }}>Giỏ hàng</Typography>
                <Grid container spacing={2} sx={{
                    padding: {
                        xs: "5px",
                        md: "20px"
                    },
                }}>
                    {
                        orderSelector?.orderItems?.length > 0 ?
                            <>
                                <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ display: { xs: 'none', sm: 'block' }, borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Chi tiết sản phẩm</TableCell>
                                                    <TableCell align="right">Phân loại hàng</TableCell>
                                                    <TableCell align="right">Đơn giá&nbsp;(VND)</TableCell>
                                                    <TableCell align="left">Số lượng</TableCell>
                                                    <TableCell align="right">Thành tiền&nbsp;(VND)</TableCell>
                                                    <TableCell align="right"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows?.map((row) => {
                                                    return <TableRow
                                                        key={row?.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ display: "flex", alignItems: 'center', gap: '20px' }}>
                                                            <img style={{ width: '50px', height: '50px' }} src={row?.image} alt="" />
                                                            {row?.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row?.type}</TableCell>
                                                        <TableCell align="right">{formatPrice(row?.sale_price)}</TableCell>
                                                        <TableCell align="right">
                                                            <QuantityCustom value={row?.quantity} id={row?._id}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">{formatPrice(row?.total_price)}</TableCell>
                                                        <TableCell align="right" onClick={() => removeFromCart(row?._id)}><span style={{ cursor: 'pointer' }}><CloseIcon /></span></TableCell>
                                                    </TableRow>
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ display: { xs: 'block', sm: 'none' }, borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 100 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Chi tiết sản phẩm</TableCell>
                                                    <TableCell align="left">Số lượng</TableCell>
                                                    <TableCell align="right"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows?.map((row) => {
                                                    return <TableRow

                                                        key={row?.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell sx={{ maxWidth: { xs: "250px", sm: "350px" } }} component="th" scope="row" style={{ display: "flex", alignItems: 'center', gap: '20px' }}>
                                                            <img style={{ width: '50px', height: '50px' }} src={row?.image} alt="" />
                                                            {row?.name + ' - ' + formatPrice(row?.sale_price)}
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ position: 'relative' }}>
                                                            <QuantityCustom value={row?.quantity} id={row?._id}
                                                            />
                                                            <Box sx={{ position: 'absolute', top: '10px', right: '-10px' }} align="right" onClick={() => removeFromCart(row?._id)}><span style={{ cursor: 'pointer' }}><CloseIcon /></span></Box>
                                                        </TableCell>
                                                    </TableRow>
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} sx={{}} >
                                    <Box className='continue-to-payment'>
                                        <div className="tam-tinh">
                                            <Typography variant='body2'>Tạm tính</Typography>
                                            <Typography variant='body2'>{formatPrice(orderSelector.totalPrice)}</Typography>
                                        </div>
                                        <Divider sx={{ margin: '10px 0' }} />
                                        <div className="total">
                                            <Typography variant='body1'>Tổng cộng: </Typography>
                                            <Typography variant='body1' style={{ color: '#e95353' }}>{formatPrice(orderSelector.totalPrice)}</Typography>
                                        </div>
                                        <Typography style={{ float: 'right' }} variant='body1'>(Chưa bao gồm VAT)</Typography>
                                        <Typography style={{ float: 'right' }} variant='body1'>Chưa bao gồm phí vận chuyển</Typography>
                                        <br />
                                        <br />
                                    </Box>
                                    <Link style={{ textDecoration: 'none' }} to={`/payment/form/${randomOrderId}`}>
                                        <Button color='primary' sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: '20px 0px',
                                            marginLeft: '50%',
                                            transform: 'translateX(-50%)',
                                            color: 'white',
                                            padding: '8px 20px',
                                            border: '1px solid black',
                                            backgroundColor: 'rgba(50, 50, 50)',
                                            borderRadius: '5px',
                                            '&:hover': {
                                                backgroundColor: 'rgba(256, 256, 256)',
                                                border: '1px solid black',
                                                color: 'black',
                                                transition: '.3s',
                                            },
                                        }}>
                                            Mua Ngay
                                        </Button>
                                    </Link>
                                </Grid>
                            </>
                            :
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', marginBottom: '165px' }}>
                                <div>
                                    <Typography variant="h4" sx={{ color: 'black' }}>Không có sản phẩm nào trong giỏ hàng</Typography>
                                    <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>

                                    <Typography variant="h4" sx={{ color: 'blue', cursor: 'pointer' }} onClick={backToProductPage}>Tiếp tục mua sắm</Typography>
                                    </div>
                                </div>
                            </Box>
                    }

                </Grid>
            </Box>
        </>
    )
}
