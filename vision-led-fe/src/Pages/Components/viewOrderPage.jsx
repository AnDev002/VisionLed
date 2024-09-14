import { Navigate, useParams } from 'react-router-dom';
import * as UserServices from '../../Services/UserServices'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Redux/Slides/userSlide';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { updateUser } from '../../Redux/Slides/userSlide';
import StickyNav from './stickyNav';
import GlobalFooter from './footer';
import { Box, Typography } from '@mui/material';
import * as OrderServices from "../../Services/OrderServices"
import { formatPrice } from '../../Ults';

export default function ViewOrderPage() {
    const userSelector = useSelector(state => state.user);
    const getLastestOrder = async () => {
        if (userSelector.userId != "") {
            const res = await OrderServices.GetLastestOrder(userSelector.userId);
            return res;
        }
        return {};
    }

    const { isLoading, data } = useQuery(['last-order'], getLastestOrder);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState("");
    const calculateTotalPrice = (order) => {
        let sum = 0
        order?.orderItems?.map(item => {
            sum += item?.productDetails?.sale_price * item?.quantity
        })

        return sum;
    }
    const viewOrderDetails = (orderId) => {
        if (selectedOrder?.orderId === orderId) {
            setSelectedOrder(null);
            setSelectedOrderId("");
        } else {
            data?.data?.map((order) => {
                if (order.orderId === orderId) {
                    setSelectedOrder(order);
                    setSelectedOrderId(orderId);
                }
            })
        }
    }
    return (
        <>
            {
                isLoading === false ?

                    <Box sx={{ padding: '8px' }}>
                        <StickyNav />
                        <Box sx={{ background: "white", padding: "5px" }}>

                            {
                                data?.data?.length > 0 ?
                                    <Box sx={{ background: 'white', color: "black", borderRadius: '10px', padding: "10px", marginTop: "80px" }}>
                                        {data?.data?.map((order) => {
                                            return <Box sx={{ background: '#323232', color: "#f3e2aa", marginBottom: "10px", padding: "13px", borderRadius: "15px", color: "white" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div>
                                                        <Typography variant="h6" sx={(order.status === "PENDING" ? { color: "#fff0c6" } : order.status === "CONFIRMED" ? { color: "#fff0c6" } : order.status === "SHIPPING" ? { color: "#d0ffc6" } : order.status === "CANCELED" ? { color: "#f87171" } : {})}>Trạng thái: {order.status === "PENDING" ? "Đang xử lí" : order.status === "SHIPPING" ? "Đang vận chuyển" : order.status === "CANCELED" ? "Đã huỷ" : order.status === "CONFIRMED" ? "Đã xác nhận" : ""}</Typography>
                                                    </div>
                                                    <div>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div></div>
                                                            <Typography variant="h6">{formatPrice(calculateTotalPrice(order))}</Typography>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                                            <div></div>
                                                            <Typography onClick={() => viewOrderDetails(order.orderId)} variant="body1" sx={{
                                                                color: "gray", cursor: "pointer", "&:hover": {
                                                                    color: "white",
                                                                    transition: ".5s",
                                                                }
                                                            }}>Xem chi tiết đơn hàng</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    selectedOrderId === order.orderId ?
                                                        <> <Box sx={{ justifyContent: 'space-between' }}>
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
                                                                        order?.orderItems?.map(item => {
                                                                            return <Typography variant="h6">
                                                                                {item?.productDetails?.product?.name + (item?.productDetails?.power ? " " + item?.productDetails?.power?.powerValue : "") + (item?.productDetails?.size ? " " + item?.productDetails?.size?.sizeName : "") + (item?.productDetails?.color ? " " + item?.productDetails?.color?.colorName : "") + " - " + formatPrice(item?.productDetails?.sale_price) + " x " + item.quantity}
                                                                            </Typography>
                                                                        })
                                                                    }
                                                                </Box>

                                                                <Box >
                                                                    {
                                                                        order?.orderItems?.map(item => {
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
                                                                Tổng: {formatPrice(calculateTotalPrice(order))}
                                                            </Typography></>
                                                        : ""
                                                }
                                            </Box>
                                        })
                                        }

                                    </Box>
                                    : <Typography variant="h5" sx={{ textAlign: "center", marginTop: "250px", marginBottom: "100px" }}>Bạn không có đơn hàng nào</Typography>
                            }
                        </Box>

                        <GlobalFooter />
                    </Box>
                    : ""
            }
        </>
    )
}