import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputInForm from './InputInForm';
import { UseMutationHooks } from '../../../Hooks/UseMutationHook';
import * as OrderServices from '../../../Services/OrderServices'
import { useSelector } from "react-redux"
import { useQuery } from '@tanstack/react-query';
import imageCompression from 'browser-image-compression';
import { convertToBase64, formatPrice } from '../../../Ults';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function OrderHandleForm(props) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [isOpen, setIsOpen] = useState(true);

    const calculateTotalPrice = () => {
        let sum = 0
        props?.order?.orderItems?.map(item => {
            sum += item?.productDetails?.sale_price * item?.quantity
        })
        setTotalPrice(sum)
    }
    useEffect(() => {
        calculateTotalPrice()
    }, [])

    const mutation = UseMutationHooks((data) => {
        const {
            id,
            orderState
        } = data
        return OrderServices.UpdateOrder({
            id,
            orderState
        })
    })
    const handleSubmitConfirm = () => {
        mutation.mutate({ id: props.order.id, orderState: { status: "CONFIRMED" } });
        props.func()
        props.reload()
    }
    const handleSubmitComplete = () => {
        mutation.mutate({ id: props.order.id, orderState: { status: "COMPLETED" } });
        props.func()
        props.reload()
    }
    const handleSubmitShipping = () => {
        mutation.mutate({ id: props.order.id, orderState: { status: "SHIPPING" } });
        props.func()
        props.reload()
    }
    // id, createAt, customer, orderId, status, paymentMethod, orderItems, description, deliveryAt
    return (
        <>
            {(isOpen === true) ?
                <Box style={{ position: 'fixed', left: '50%', top: "50%", width: '50vw', transform: "translate(-50%, -50%)", padding: '30px 20px', backgroundColor: 'white', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>Mã đơn hàng: {props.order.orderId}</Typography>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>Tạo lúc: {props.order.createAt}</Typography>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>Trạng thái: {props.order.status === "PENDING" ? "Chờ xử lí" : (props.order.status === "CONFIRMED" ? "Đã xác nhận" : (props.order.status === "DELIVERING" ? "Đang giao hàng" : (props.order.status === "COMPLETED" ? "Đã hoàn thành" : "")))}</Typography>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Khách hàng</Typography>
                    <Typography variant='h6'>Tên: {props.order.customer.name}</Typography>
                    <Typography variant='h6'>Số điện thoại: {props.order.customer.phone}</Typography>
                    <Typography variant='h6'>Địa chỉ giao hàng: {props.order.customer.address}</Typography>
                    <Typography variant='h6'>Email: {props.order.customer.email}</Typography>
                    <br />
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Phương thức thanh toán: {props.order.paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : "Chuyển khoản"}</Typography>
                    <Box sx={{ background: 'white', borderRadius: '10px' }}>
                        <br />
                        <Typography variant="h5">
                            Chi tiết đơn hàng
                        </Typography>
                        <hr />
                        <Box sx={{ justifyContent: 'space-between' }}>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        Sản phẩm
                                    </Typography>

                                </Box>

                                <Box >
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        Thành tiền
                                    </Typography>

                                </Box>
                            </Box>
                            <hr />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>

                                    {
                                        props?.order?.orderItems?.map(item => {
                                            return <Typography variant="h6">
                                                {item?.productDetails?.product?.name + (item?.productDetails?.power ? " " + item?.productDetails?.power?.powerValue : "") + (item?.productDetails?.size ? " " + item?.productDetails?.size?.sizeName : "") + (item?.productDetails?.color ? " " + item?.productDetails?.color?.colorName : "") + " - " + formatPrice(item?.productDetails?.sale_price) + " x " + item.quantity}
                                            </Typography>
                                        })
                                    }
                                </Box>

                                <Box >
                                    {
                                        props?.order?.orderItems?.map(item => {
                                            return <Typography style={{ display: 'flex', justifyContent: 'flex-end' }} variant="h6">
                                                {formatPrice(item?.productDetails?.sale_price * item?.quantity)}
                                            </Typography>
                                        })
                                    }
                                </Box>
                            </Box>

                        </Box>
                        <hr />
                        <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}>
                            Tổng: {formatPrice(totalPrice)}
                        </Typography>
                    </Box>
                    <div className="group-button" style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <div></div>
                        <div style={{ marginTop: '20px' }}>
                            <Button sx={{
                                background: 'black', margin: '5px', color: 'white', "&:hover": {
                                    background: 'white',
                                    color: 'black',
                                    transition: '.5s'
                                }
                            }} onClick={props.func}>Huỷ</Button>
                            {
                                props.order.status === "PENDING" ?
                                    <Button sx={{
                                        background: 'black', margin: '5px', color: 'white', "&:hover": {
                                            background: 'white',
                                            color: 'black',
                                            transition: '.5s'
                                        }
                                    }} onClick={handleSubmitConfirm}>Xác nhận đơn hàng</Button>
                                    : props.order.status === "CONFIRMED" && props.order?.customer?.address?.length <= 20 || props.order?.status === "SHIPPING" ?
                                        <Button sx={{
                                            background: 'black', margin: '5px', color: 'white', "&:hover": {
                                                background: 'white',
                                                color: 'black',
                                                transition: '.5s'
                                            }
                                        }} onClick={handleSubmitComplete}>Khách đã nhận hàng</Button>
                                        :
                                        props.order.status === "CONFIRMED" && props.order?.customer?.address?.length > 20 ?
                                            <>
                                                <Button sx={{
                                                    background: 'black', margin: '5px', color: 'white', "&:hover": {
                                                        background: 'white',
                                                        color: 'black',
                                                        transition: '.5s'
                                                    }
                                                }} onClick={handleSubmitShipping}>Shipper đã nhận hàng</Button>
                                            </>
                                            : ""
                            }
                        </div>
                    </div>
                </Box>
                : ""}
        </>
    )
}
