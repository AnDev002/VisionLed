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
import * as ProductServices from '../../../Services/ProductServices'
import { useQuery } from '@tanstack/react-query';
import { convertToBase64 } from '../../../Ults';
import imageCompression from 'browser-image-compression';

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

export default function AddProductDetailsForm(props) {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
        setIsOpen(!isOpen)
    }
    const [productState, setproductState] = useState({
        product: props.productId
    });


    const [colorAdd, setColorAdd] = useState("")
    const [isOpenAddColor, setIsOpenAddColor] = useState(false)
    const handleOpenAddColor = () => {
        setIsOpenAddColor(!isOpenAddColor)
    }
    const mutationColor = UseMutationHooks(
        (data) => {
            const {
                colorName
            } = data
            return ProductServices.CreateProductColor({
                colorName
            })
        })
    const submitAddColor = () => {
        if (colorAdd !== "")
            mutationColor.mutate({ colorName: colorAdd })
        setColorAdd("")
        handleOpenAddColor()
    }
    const { isSuccess: colorIsSuccess } = mutationColor

    const [powerAdd, setPowerAdd] = useState("")
    const [isOpenAddPower, setIsOpenAddPower] = useState(false)
    const handleOpenAddPower = () => {
        setIsOpenAddPower(!isOpenAddPower)
    }
    const mutationPower = UseMutationHooks(
        (data) => {
            const {
                powerValue
            } = data
            return ProductServices.CreateProductPower({
                powerValue
            })
        })
    const submitAddPower = () => {
        if (powerAdd !== "")
            mutationPower.mutate({ powerValue: powerAdd + "W" })
        setPowerAdd("")
        handleOpenAddPower()
    }
    const { isSuccess: powerIsSuccess } = mutationPower


    const getProductRefProps = async () => {
        const res = await ProductServices.GetProductRefProps();
        return res
    }

    const { isLoading: isLoadingProps, data: dataProps } = useQuery({ queryKey: ['product-ref', powerIsSuccess, colorIsSuccess], queryFn: getProductRefProps })

    const onChangeValue = (e) => {
        setproductState({
            ...productState,
            [e.target.name]: e.target.value
        })
    }
    const handleRadioChange = (event) => {
        setproductState({
            ...productState,
            [event.target.name]: event.target.value
        })
    };
    const handleSubmit = () => {
        mutation.mutate(productState);
        props.func();
    }
    const mutation = UseMutationHooks(
        (data) => {
            const {
                product,
                standard,
                secureLv,
                texture,
                power,
                idProduct,
                size,
                color,
                voltage,
                CRI,
                dimension,
                hole_dimension,
                chip_led,
                projection_angle,
                lumens_color_temperature,
                warranty,
                luminous_flux,
                unit_price,
                image,
                countInStock: countInStock,
            } = data
            return ProductServices.CreateProductDetails({
                product,
                standard,
                secureLv,
                texture,
                countInStock,
                unit_price,
                size,
                color,
                power,
                idProduct,
                voltage,
                CRI,
                dimension,
                hole_dimension,
                projection_angle,
                chip_led,
                lumens_color_temperature,
                luminous_flux,
                image,
                warranty,
            })
        })

    const { data, isSuccess } = mutation
    useEffect(() => {
        if (isSuccess)
            props.addProductSuccess();
    }, [isSuccess])
    return (
        <>
            {(isOpen === true) ?
                <Box style={{ position: 'fixed', left: '50%', top: "50%", transform: "translate(-50%, -50%)", padding: '30px 20px', backgroundColor: 'white', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                    <Typography variant='h4'>Thêm Chi Tiết Sản Phẩm</Typography>
                    <InputInForm label="*Mã sản phẩm" name="idProduct" value={productState.idProduct} onChangeValue={onChangeValue} />
                    <InputInForm label="*Số Lượng Tồn Kho" name="countInStock" value={productState.countInStock} onChangeValue={onChangeValue} />
                    <InputInForm label="*Giá Tiền (VND)" name="unit_price" value={productState.unit_price} onChangeValue={onChangeValue} />

                    <Typography variant='h6' sx={{ color: 'gray' }}>Thông Số Kĩ Thuật</Typography>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <InputInForm label="Điện Áp" name="voltage" value={productState.voltage} onChangeValue={onChangeValue} />
                        <InputInForm label="Chỉ Số Hoàn Màu" name="CRI" value={productState.CRI} onChangeValue={onChangeValue} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <InputInForm label="Kích Thước" name="dimension" value={productState.dimension} onChangeValue={onChangeValue} />
                        <InputInForm label="Kích Thước Lỗ Khoét" name="hole_dimension" value={productState.hole_dimension} onChangeValue={onChangeValue} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <InputInForm label="Chip Led" name="chip_led" value={productState.chip_led} onChangeValue={onChangeValue} />
                        <InputInForm label="Góc Chiếu" name="projection_angle" value={productState.projection_angle} onChangeValue={onChangeValue} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <InputInForm label="Tiêu chuẩn" name="standard" value={productState.standard} onChangeValue={onChangeValue} />
                        <InputInForm label="Lớp Bảo Vệ" name="secureLv" value={productState.secureLv} onChangeValue={onChangeValue} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <InputInForm label="Nhiệt Độ Màu" name="lumens_color_temperature" value={productState.lumens_color_temperature} onChangeValue={onChangeValue} />
                        <InputInForm label="Quang Thông" name="luminous_flux" value={productState.luminous_flux} onChangeValue={onChangeValue} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <InputInForm label="Vật Liệu" name="texture" value={productState.texture} onChangeValue={onChangeValue} />
                        <InputInForm label="Thời Gian Bảo Hành" name="warranty" value={productState.warranty} onChangeValue={onChangeValue} />
                    </Box>
                    <Box sx={{ bgcolor: 'white', padding: '5px', color: 'black' }}>
                        <FormControl>
                            <FormLabel sx={{ display: 'flex', alignItems: 'center' }} id="demo-row-radio-buttons-group-label">Kích Thước
                                <Box sx={{ cursor: 'pointer', marginLeft: '10px', color: 'gray !important', bgcolor: '#efefef', borderRadius: '100%', width: '30px', height: '30px', padding: '3px' }}><AddIcon /></Box></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="size"
                                value={productState.size}
                                onChange={handleRadioChange}
                            >
                                {
                                    dataProps?.data?.sizes?.map(size => {
                                        return (
                                            <FormControlLabel value={size._id} control={<Radio />} label={size.sizeName} />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box sx={{ bgcolor: 'white', padding: '5px', color: 'black' }}>
                        <FormControl>
                            <FormLabel sx={{ display: 'flex', alignItems: 'center' }} id="demo-row-radio-buttons-group-label">
                                <div>
                                    Màu Sắc
                                </div>
                                <div>
                                    <Box onClick={handleOpenAddColor} sx={{ cursor: 'pointer', marginLeft: '10px', color: 'gray !important', bgcolor: '#efefef', borderRadius: '100%', width: '30px', height: '30px', padding: '3px' }}><AddIcon /></Box>
                                </div>

                                {
                                    isOpenAddColor ?
                                        <div style={{ marginLeft: '20px', display: 'flex' }}>
                                            <InputInForm label="Color" name="color" value={colorAdd} onChangeValue={(e) => setColorAdd(e.target.value)} />
                                            <Button onClick={submitAddColor}>
                                                Thêm
                                            </Button>
                                        </div>
                                        : ""
                                }
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="color"
                                value={productState.color}
                                onChange={handleRadioChange}
                            >
                                {
                                    dataProps?.data?.colors?.map(color => {
                                        return (
                                            <FormControlLabel value={color._id} control={<Radio />} label={color.colorName} />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box sx={{ bgcolor: 'white', padding: '5px', color: 'black' }}>
                        <FormControl>
                            <FormLabel sx={{ display: 'flex', alignItems: 'center' }} id="demo-row-radio-buttons-group-label">
                                <div>
                                    Công Xuất
                                </div>
                                <div>
                                    <Box onClick={handleOpenAddPower} sx={{ cursor: 'pointer', marginLeft: '10px', color: 'gray !important', bgcolor: '#efefef', borderRadius: '100%', width: '30px', height: '30px', padding: '3px' }}><AddIcon /></Box>
                                </div>
                                {
                                    isOpenAddPower ?
                                        <div style={{ marginLeft: '20px', display: 'flex' }}>
                                            <InputInForm label="Công suất" name="power" value={powerAdd} onChangeValue={(e) => setPowerAdd(e.target.value)} />
                                            <Button onClick={submitAddPower}>
                                                Thêm
                                            </Button>
                                        </div>
                                        : ""
                                }
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="power"
                                value={productState.power}
                                onChange={handleRadioChange}
                            >
                                {
                                    dataProps?.data?.powers?.map(power => {
                                        return (
                                            <FormControlLabel value={power._id} control={<Radio />} label={power.powerValue} />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <div className="group-button" style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <div></div>
                        <div>
                            <Button onClick={props.func} sx={{
                                background: 'black', margin: '5px', color: 'white', "&:hover": {
                                    background: 'white',
                                    color: 'black',
                                    transition: '.5s'
                                }
                            }}>Huỷ</Button>
                            <Button sx={{
                                background: 'black', margin: '5px', color: 'white', "&:hover": {
                                    background: 'white',
                                    color: 'black',
                                    transition: '.5s'
                                }
                            }} onClick={handleSubmit}>Thêm Chi Tiết Sản Phẩm</Button>
                        </div>
                    </div>
                </Box>
                : ""}
        </>
    )
}
