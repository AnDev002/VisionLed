import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextareaAutosize, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import InputInForm from '../InputInForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPrice, updatePaymentMethod } from '../../../Redux/Slides/orderSlide';
import { UseMutationHooks } from '../../../Hooks/UseMutationHook';
import * as OrderServices from '../../../Services/OrderServices'
import { resetOrder } from '../../../Redux/Slides/orderSlide';
import { formatPrice } from '../../../Ults';
import { updateInOrder } from '../../../Redux/Slides/userSlide';

export default function PaymentFormContent() {
    const orderSelector = useSelector((state) => state.order);
    const userSelector = useSelector((state) => state.user);
    const { orderId } = useParams()
    const dispatch = useDispatch();
    const [deliveryState, setDeliveryState] = useState({
        paymentMethod: "COD",
        description: "",
        email: userSelector.email !== "" ? userSelector.email : "",
        address: userSelector.address !== "" ? userSelector.address : "",
        customerName: userSelector.name !== "" ? userSelector.name : "",
        phoneNumber: userSelector.phone !== "" ? userSelector.phone : ""
    });
    const randomOrderId = orderId
    const handleGoogleLogin = () => {
        window.open("https://vision-led-be.onrender.com/api/auth/google", "_self")
    }
    const handleFacebookLogin = () => {
        window.open("https://vision-led-be.onrender.com/api/auth/facebook", "_self")
    }
    const [isCod, setIsCod] = useState(true)
    const handleCod = () => {
        setIsCod(!isCod)
    }

    const onChangeValue = (e) => {
        setDeliveryState({
            ...deliveryState,
            [e.target.name]: e.target.value
        })
    }

    const handleRadioChange = (event) => {
        if (event.target.value === "BANKING") {
            setIsCod(false)
        } else if (event.target.value === "COD") {
            setIsCod(true)
        }
        setDeliveryState({
            ...deliveryState,
            [event.target.name]: event.target.value
        })
    };

    useEffect(() => {
        dispatch(getTotalPrice())
    }, [])



    const [selectedProvinceId, setSelectedProvinceId] = useState(null)
    const handleChangeProvinceId = (event) => {
        setSelectedProvinceId(event.target.value);
    }
    const [selectedDistrictId, setSelectedDistrictId] = useState(null)
    const handleChangeDistrictId = (event) => {
        setSelectedDistrictId(event.target.value);
    }
    const [selectedWardId, setSelectedWardId] = useState(null)
    const handleChangeWardId = (event) => {
        setSelectedWardId(event.target.value);
    }
    const [receiveProduct, setReceiveProduct] = useState("nhận hàng tại nhà")
    const handleChangeModel = (e) => {
        setReceiveProduct(e.target.value)
    }


    useEffect(() => {
        if (receiveProduct === "nhận tại cửa hàng") {
            setDeliveryState({
                ...deliveryState,
                address: "nhận tại cửa hàng"
            })
        } else {
            if (userSelector.address === "") {
                setDeliveryState({
                    ...deliveryState,
                    address: ""
                })
            } else if (isDisabled === false) {
                setDeliveryState({
                    ...deliveryState,
                    address: ""
                })
            } else {
                setDeliveryState({
                    ...deliveryState,
                    address: userSelector.address
                })
            }

        }
    }, [receiveProduct])
    const fetchProvinces = async () => {
        const response = await fetch('https://vapi.vnappmob.com/api/province');
        if (!response.ok) {
            throw new Error('Lỗi khi lấy dữ liệu từ API');
        }
        return response.json();
    };
    const { isLoading, data } = useQuery(['provinces'], fetchProvinces);
    const fetchDistricts = async (provinceId) => {
        let response = null
        if (provinceId) {
            response = await fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
        }
        return response.json();
    };
    const { isLoading: districtsLoading, data: districtsData } = useQuery(['districts', selectedProvinceId], () => fetchDistricts(selectedProvinceId));
    const fetchWards = async (districtId) => {
        let response = null
        if (districtId) {
            response = await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
        }
        return response.json();
    };
    const [isDisabled, setIsDisabled] = useState(true);

    // Sử dụng React Query để gọi API và quản lý dữ liệu
    const { isLoading: isWardsLoading, data: wardsData } = useQuery(['wards', selectedDistrictId], () => fetchWards(selectedDistrictId));
    const getAddressName = () => {
        let addressName = "";

        // Lấy Phường/Xã dựa trên selectedWardId
        const selectedWard = wardsData?.results?.find(item => item.ward_id === selectedWardId);
        if (selectedWard) {
            addressName += `${selectedWard.ward_name}, `;
        }

        // Lấy Quận/Huyện dựa trên selectedDistrictId
        const selectedDistrict = districtsData?.results?.find(item => item.district_id === selectedDistrictId);
        if (selectedDistrict) {
            addressName += `${selectedDistrict.district_name}, `;
        }

        // Lấy Tỉnh/Thành phố dựa trên selectedProvinceId
        const selectedProvince = data?.results?.find(item => item.province_id === selectedProvinceId);
        if (selectedProvince) {
            addressName += `${selectedProvince.province_name}.`;
        }

        return addressName;
    };

    const mutation = UseMutationHooks(
        (data) => {
            const {
                orderItems,
                address,
                description,
                customerName,
                paymentMethod,
                phoneNumber,
                orderId,
                customerId,
                email,
            } = data
            return OrderServices.CreateOrder({
                orderItems,
                address,
                description,
                customerName,
                paymentMethod,
                phoneNumber,
                orderId: randomOrderId,
                customerId,
                email
            })
        })
    const navigate = useNavigate()
    const [errValid, setErrValid] = useState(false)
    const handleSubmit = () => {
        if (deliveryState.address === '' || deliveryState.customerName === '' || deliveryState.phoneNumber === "") {
            setErrValid(true)
            window.scrollTo(0, 0);
        } else {
            setErrValid(false)
            const orderItems = orderSelector?.orderItems?.map(item => ({
                quantity: item.quantity,
                productDetails: item.productDetails
            }))
            mutation.mutate({
                orderItems,
                address: deliveryState.address + " " + getAddressName(),
                description: deliveryState.description,
                customerName: deliveryState.customerName,
                paymentMethod: deliveryState.paymentMethod,
                phoneNumber: deliveryState.phoneNumber,
                orderId: randomOrderId,
                customerId: userSelector.userId !== "" ? userSelector.userId : "",
                email: deliveryState.email
            });
            dispatch(updatePaymentMethod({ paymentMethod: deliveryState.paymentMethod, orderId: randomOrderId }))
            navigate('/create-order-success')
        }
    }
    const [checkedLog, setCheckedLog] = useState(false);

    const handleChangeLoginOps = (event) => {
        setCheckedLog(event.target.checked);
        dispatch(updateInOrder({ inOrder: true }));
    };

    const { dataM, isSuccessM } = mutation
    return (
        <>
            <Box sx={{ marginTop: '160px', padding: '25px' }}>
                <Typography variant='h3'>ĐẶT HÀNG</Typography>
            </Box>
            <Grid container spacing={2} sx={{
                padding: {
                    xs: "5px",
                    md: "20px"
                },
            }}>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                    <Box>
                        <Box sx={{ background: "white", padding: '20px' }}>
                            <Typography variant='h5'>THÔNG TIN KHÁCH HÀNG</Typography>
                            {
                                errValid === true ? <>
                                    <Typography variant='body1' sx={{ color: 'red' }}>*Vui lòng nhập đủ thông tin cần thiết để tạo đơn hàng</Typography>
                                </>
                                    : ""
                            }
                            {
                                userSelector.name !== ""
                                    ?
                                    <InputInForm label="*Tên Khách Hàng" name="customerName" disabled={isDisabled} value={deliveryState.customerName} onChangeValue={onChangeValue} />
                                    :
                                    <InputInForm label="*Tên Khách Hàng" name="customerName" value={deliveryState.customerName} onChangeValue={onChangeValue} />
                            }
                            {
                                userSelector.phone !== ""
                                    ?
                                    <InputInForm label="*Số Điện Thoại" name="phoneNumber" disabled={isDisabled} value={deliveryState.phoneNumber} onChangeValue={onChangeValue} />
                                    :
                                    <InputInForm label="*Số Điện Thoại" name="phoneNumber" value={deliveryState.phoneNumber} onChangeValue={onChangeValue} />
                            }
                            {
                                userSelector.email !== ""
                                    ?
                                    <InputInForm label="Email" name="email" disabled={isDisabled} value={deliveryState.email} onChangeValue={onChangeValue} />
                                    :
                                    <InputInForm label="Email" name="email" value={deliveryState.email} onChangeValue={onChangeValue} />
                            }
                            {
                                userSelector.userId === ""
                                    ?
                                    <div>
                                        <FormControlLabel control={<Checkbox onChange={handleChangeLoginOps} />} label="Đăng nhập để theo dõi trạng thái đơn hàng" />
                                    </div>
                                    : ""
                            }
                            {
                                checkedLog ?
                                    <div className="group-sign-in" style={{ display: "flex", gap: '10px', marginBottom: "20px", width: "100%" }}>
                                        <div className="ggBtn" onClick={handleGoogleLogin} style={{ cursor: "pointer", padding: '5px 10px', background: 'white', border: '1px solid gray', color: 'black', borderRadius: '5px' }}><div><img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" /></div> Đăng nhập bằng google</div>
                                        <div className="fbBtn" onClick={handleFacebookLogin} style={{ cursor: "pointer", padding: '5px 10px', background: 'rgb(77 141 237)', color: 'white', borderRadius: '5px' }}><div><img src="https://tmpfiles.nohat.cc/full-m2H7N4N4b1K9b1Z5.png" alt="" /></div> Đăng nhập bằng facebook</div>
                                    </div>
                                    : ""
                            }

                            <Typography variant='h5'>PHƯƠNG THỨC NHẬN HÀNG</Typography>
                            <ToggleButtonGroup
                                color="primary"
                                value={receiveProduct}
                                exclusive
                                onChange={handleChangeModel}
                                aria-label="Platform"
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                }}
                            >
                                <ToggleButton sx={{ background: "none", border: "none", borderRadius: '5px !important', margin: "10px 0", width: "50%" }} value="nhận hàng tại nhà" key={0}>Giao hàng tận nhà</ToggleButton>
                                <ToggleButton sx={{ background: "none", border: "none", borderRadius: '5px !important', margin: "10px 0", width: "50%" }} value="nhận tại cửa hàng" key={1}>Nhận hàng tại cửa hàng</ToggleButton>
                            </ToggleButtonGroup>
                            {
                                receiveProduct === "nhận hàng tại nhà" ?
                                    (userSelector.address === "") || isDisabled === false ?
                                        <Box sx={{ padding: '10px', backgroundColor: "#fcfcfc" }}>
                                            <Box sx={{ minWidth: 120, marginTop: '10px' }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">*Tỉnh/Thành phố</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedProvinceId}
                                                        label="*Tỉnh/thành phố"
                                                        onChange={handleChangeProvinceId}
                                                    >
                                                        {
                                                            data?.results?.map((item) => {
                                                                return <MenuItem value={item.province_id}>{item.province_name}</MenuItem>
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            {
                                                selectedProvinceId && districtsData ?
                                                    <Box sx={{ minWidth: 120, margin: "20px 0" }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">*Quận/Huyện</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedDistrictId}
                                                                label="*Quận/Huyện"
                                                                onChange={handleChangeDistrictId}
                                                            >
                                                                {
                                                                    districtsData?.results?.map((item) => {
                                                                        return <MenuItem value={item.district_id}>{item.district_name}</MenuItem>
                                                                    })
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Box> : ""
                                            }
                                            {
                                                selectedDistrictId !== null ?
                                                    <Box sx={{ minWidth: 120 }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">*Phường/Xã</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedWardId}
                                                                label="*Phường/Xã"
                                                                onChange={handleChangeWardId}
                                                            >
                                                                {
                                                                    wardsData?.results?.map((item) => {
                                                                        return <MenuItem value={item.ward_id}>{item.ward_name}</MenuItem>
                                                                    })
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                        <InputInForm
                                                            label="*Địa Chỉ"
                                                            name="address"
                                                            value={deliveryState.address} onChangeValue={onChangeValue}
                                                        />
                                                    </Box>
                                                    : ""
                                            }
                                        </Box>
                                        :
                                        <InputInForm label="Địa chỉ" name="address" disabled={isDisabled} value={deliveryState.address} />
                                    : ""
                            }
                            {
                                isDisabled === true ?
                                    <Typography onClick={() => setIsDisabled(!isDisabled)} variant="body1" sx={{
                                        textAlign: 'center', color: "gray", cursor: "pointer", "&:hover": {
                                            color: "black", transition: ".5s"
                                        }
                                    }}>Chỉnh sửa thông tin giao hàng</Typography>
                                    :
                                    ""
                            }

                            <Typography variant='h6'>Ghi chú</Typography>
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="vd: đơn vị vận chuyển, hoá đơn..."
                                label="Ghi chú"
                                name="description"
                                value={deliveryState.description} onChange={onChangeValue}
                                style={{ maxWidth: "500px", maxHeight: "500px", padding: '10px', fontSize: "1.5rem" }}
                            />
                        </Box>
                    </Box>
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
                        <Typography style={{ float: 'right' }} variant='body1'>(Đã bao gồm VAT)</Typography>
                        <Typography style={{ float: 'right' }} variant='body1'>Chưa bao gồm phí vận chuyển</Typography>
                        <div>
                            <hr style={{ marginTop: '60px', width: '100%' }}></hr>
                            <FormControl>
                                <FormLabel sx={{ display: 'flex', alignItems: 'center' }} id="demo-row-radio-buttons-group-label"></FormLabel>
                                <RadioGroup
                                    col
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="paymentMethod"
                                    value={deliveryState.paymentMethod}
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel value="COD" control={<Radio />} label="Thanh toán khi nhận hàng" />
                                    {
                                        isCod === true ?
                                            <Typography variant="body1">
                                                Trả tiền mặt khi nhận hàng
                                            </Typography>
                                            : ""
                                    }
                                    <FormControlLabel value="BANKING" control={<Radio />} label="Chuyển khoản ngân hàng" />
                                    {
                                        isCod === false ?
                                            <Typography variant="body1">
                                                Hãy điền mã đơn hàng của bạn vào nội dung chuyển khoản, chúng tôi sẽ kiểm tra và gửi hàng ngay sau khi nhận được bill chuyển khoản
                                            </Typography>
                                            : ""
                                    }
                                    <hr />
                                    <Typography variant="body1">
                                        Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng và tăng trải nghiệm sử dụng website.
                                    </Typography>
                                </RadioGroup>
                            </FormControl>

                        </div>
                    </Box>
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
                    }} onClick={handleSubmit}>
                        Đặt Hàng
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
