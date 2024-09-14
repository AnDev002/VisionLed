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
import { useSelector } from "react-redux"
import { useQuery } from '@tanstack/react-query';
import imageCompression from 'browser-image-compression';
import { convertToBase64 } from '../../../Ults';

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

export default function EditForm(props) {
    const userSelector = useSelector((state) => state.user)
    const handleRadioChange = (event) => {
        setproductState({
            ...productState,
            [event.target.name]: event.target.value
        })
    };
    const handleRadioDetailsChange = (event) => {
        setProductDetailsState({
            ...productDetailsState,
            [event.target.name]: event.target.value
        })
    };
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
        setIsOpen(!isOpen)
    }
    const [productState, setproductState] = useState({
        id: props?.editingItem?.id,
        name: props?.editingItem?.name,
        image: [props?.editingItem?.image],
        protection_rating: props?.editingItem?.protection_rating,
        product_type: props?.editingItem?.product_type,
        collection: props?.editingItem?.collection,
    });

    const [productDetailsState, setProductDetailsState] = useState({
        countInStock: 0,
        unit_price: 0,
        collection: "",
        size: "",
        color: "",
        power: "",
        voltage: "",
        CRI: "",
        dimension: "",
        hole_dimension: "",
        protection_rating: 0,
        projection_angle: "",
        chip_led: "",
        lumens_color_temperature: "",
        luminous_flux: "",
        image: [""],
        warranty: ""
    })

    const [editDetails, setEditDetails] = useState(false);
    const [editId, setEditId] = useState(null);
    const handleEditDetails = (idDetails, _id) => {
        setEditId(_id)
        setEditDetails(!editDetails);
        setproductState({
            ...productState,
            collection: props?.editingItem?.collection?.name,
        })
        setProductDetailsState({
            idProduct: dataDetails?.data[idDetails]?.idProduct,
            standard: dataDetails?.data[idDetails]?.standard,
            secureLv: dataDetails?.data[idDetails]?.secureLv,
            texture: dataDetails?.data[idDetails]?.texture,
            countInStock: dataDetails?.data[idDetails]?.countInStock,
            unit_price: dataDetails?.data[idDetails]?.unit_price,
            size: dataDetails?.data[idDetails]?.size ? dataDetails?.data[idDetails]?.size._id : undefined,
            color: dataDetails?.data[idDetails]?.color ? dataDetails?.data[idDetails]?.color._id : undefined,
            power: dataDetails?.data[idDetails]?.power ? dataDetails?.data[idDetails]?.power._id : undefined,
            voltage: dataDetails?.data[idDetails]?.voltage,
            CRI: dataDetails?.data[idDetails]?.CRI,
            dimension: dataDetails?.data[idDetails]?.dimension,
            hole_dimension: dataDetails?.data[idDetails]?.hole_dimension,
            projection_angle: dataDetails?.data[idDetails]?.projection_angle,
            chip_led: dataDetails?.data[idDetails]?.chip_led,
            lumens_color_temperature: dataDetails?.data[idDetails]?.lumens_color_temperature,
            luminous_flux: dataDetails?.data[idDetails]?.luminous_flux,
            warranty: dataDetails?.data[idDetails]?.warranty
        })
    }
    const GetProductDetails = async (productId) => {
        let res = {}
        if (productId !== null && productId !== 'null' && productId) {
            res = await ProductServices.GetProductDetails(productId);
        }
        return res;
    }
    const { isLoading: isLoadingDetails, data: dataDetails } = useQuery({ queryKey: ['product-details-inviews'], queryFn: () => GetProductDetails(props.editingItem.id) })
    const onChangeValue = (e) => {
        setproductState({
            ...productState,
            [e.target.name]: e.target.value
        })
    }
    const onChangeDetailsValue = (e) => {
        setProductDetailsState({
            ...productDetailsState,
            [e.target.name]: e.target.value
        })
    }
    const fileInputRef = useRef(null);
    const [listProductImg, setListProductImg] = useState([]);
    useEffect(() => {
        setproductState({
            ...productState,
            image: listProductImg,
        })
    }, [listProductImg])
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const options = {
            maxSizeMB: 1, // Kích thước tối đa sau khi nén (1MB ở đây là ví dụ)
            maxWidthOrHeight: 1920, // Chiều rộng hoặc chiều cao tối đa
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const base64data = await convertToBase64(compressedFile);
            setListProductImg(prevList => [...prevList, base64data]);
        } catch (error) {
            console.error('Error occurred while compressing the image:', error);
        }
    };

    const mutation = UseMutationHooks((data) => {
        const {
            id,
            access_token,
            productState
        } = data
        return ProductServices.UpdateProduct({
            id,
            access_token,
            data: productState
        })
    })
    const mutationDetails = UseMutationHooks((data) => {
        const {
            id,
            access_token,
            productDetailsState
        } = data
        return ProductServices.UpdateProductDetails({
            id,
            access_token,
            data: productDetailsState
        })
    })
    const handleSubmit = () => {
        mutation.mutate({ id: productState?.id, access_token: userSelector?.access_token, productState: productState });
        if (editId) {
            mutationDetails.mutate({
                id: editId,
                access_token: userSelector?.access_token,
                productDetailsState: productDetailsState,
            });
        }
        props.func();
    }
    const [typeAdd, setTypeAdd] = useState("")
    const [isOpenAddType, setIsOpenAddType] = useState(false)
    const handleOpenAddType = () => {
        setIsOpenAddType(!isOpenAddType)
    }
    const mutationType = UseMutationHooks(
        (data) => {
            const {
                typeName
            } = data
            return ProductServices.CreateProductType({
                typeName
            })
        })
    const submitAddType = () => {
        if (typeAdd !== "")
            mutationType.mutate({ typeName: typeAdd })
        setTypeAdd("")
        handleOpenAddType()
    }
    const { isSuccess: typeIsSuccess } = mutationType

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


    const getAllProductType = async () => {
        const res = await ProductServices.getAllProductType();
        return res
    }

    const { isLoading: isLoadingType, data: dataType } = useQuery({ queryKey: ['product-type-in', typeIsSuccess], queryFn: getAllProductType })

    const getProductRefProps = async () => {
        const res = await ProductServices.GetProductRefProps();
        return res
    }

    const { isLoading: isLoadingProps, data: dataProps } = useQuery({ queryKey: ['product-ref', colorIsSuccess, powerIsSuccess], queryFn: getProductRefProps })


    return (
        <>
            {(isOpen === true) ?
                <Box style={{ position: 'fixed', left: '50%', top: "50%", transform: "translate(-50%, -50%)", padding: '30px 20px', backgroundColor: 'white', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                    <Typography variant='h4'>Cập Nhật Sản Phẩm</Typography>
                    {(editDetails === false) ?
                        <div>
                            <Typography variant='h6' sx={{ color: 'gray' }}>Sản Phẩm</Typography>
                            <InputInForm label="*Tên Sản Phẩm" name="name" value={productState.name} onChangeValue={onChangeValue} />
                            <InputInForm label="Lượt đánh giá" name="protection_rating" value={productState.protection_rating} onChangeValue={onChangeValue} />
                            <Box sx={{ bgcolor: 'white', padding: '5px', color: 'black' }}>
                                <FormControl>
                                    <FormLabel sx={{ display: 'flex', alignItems: 'center' }} id="demo-row-radio-buttons-group-label">
                                        <div>
                                            Loại
                                        </div>
                                        <div>
                                            <Box onClick={handleOpenAddType} sx={{ cursor: 'pointer', marginLeft: '10px', color: 'gray !important', bgcolor: '#efefef', borderRadius: '100%', width: '30px', height: '30px', padding: '3px' }}><AddIcon /></Box>
                                        </div>
                                        {
                                            isOpenAddType ?
                                                <div style={{ marginLeft: '20px', display: 'flex' }}>
                                                    <InputInForm label="Type" name="type" value={typeAdd} onChangeValue={(e) => setTypeAdd(e.target.value)} />
                                                    <Button onClick={submitAddType}>
                                                        Thêm
                                                    </Button>
                                                </div>
                                                : ""
                                        }
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="product_type"
                                        value={productState.product_type}
                                        onChange={handleRadioChange}
                                    >
                                        {
                                            dataType?.data ?
                                                dataType?.data?.map((item) => {
                                                    return <FormControlLabel key={item._id} value={item._id} control={<Radio />} label={item.typeName} />
                                                })
                                                : ""
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box sx={{ bgcolor: 'white', padding: '5px', color: 'black' }}>
                                <FormControl>
                                    <FormLabel sx={{ display: 'flex', alignItems: 'center' }} id="demo-row-radio-buttons-group-label">Bộ sưu tập
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="collection"
                                        value={productState.collection}
                                        onChange={handleRadioChange}
                                    >
                                        {
                                            dataProps?.data?.collections?.map(collection => {
                                                return (
                                                    <FormControlLabel value={collection._id} control={<Radio />} label={collection.name} />
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            <div className="group-input-image" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <Button component="label" variant="contained" sx={{ bgcolor: 'black', textTransform: "unset", '&:hover': { bgcolor: 'white !important', color: 'black !important' } }} startIcon={<CloudUploadIcon />}>
                                    Hình Ảnh Sản Phẩm (1000x1000px)
                                    <VisuallyHiddenInput
                                        ref={fileInputRef} onChange={handleFileInputChange} type="file"
                                    />
                                </Button>
                                {productState.image && (
                                    productState.image.map(item => {
                                        return <img src={item} alt="Selected Image" style={{ maxWidth: '60px' }} />
                                    })
                                )}
                            </div>

                            <div style={{}}>
                                {
                                    dataDetails?.data ?
                                        dataDetails?.data?.map((item, index) => {
                                            return <Box onClick={() => handleEditDetails(index, item._id)} sx={{ border: '1px solid gray', margin: "5px 0", borderRadius: '5px', fontWeight: "bold", background: 'black', cursor: 'pointer', color: 'white', padding: '5px 10px' }}>
                                                {(item.product.name ? item.product.name : '') + " " + (item?.power ? item.power.powerValue : '') + " " + (item?.size ? item.size.sizeName : '') + " " + (item?.color ? item?.color?.colorName : '')}
                                            </Box>
                                        })
                                        : ""
                                }
                            </div>
                        </div>
                        : <div>
                            <InputInForm label="*Mã sản phẩm" name="idProduct" value={productDetailsState.idProduct} onChangeValue={onChangeDetailsValue} />
                            <InputInForm label="*Số Lượng Tồn Kho" name="countInStock" value={productDetailsState.countInStock} onChangeValue={onChangeDetailsValue} />
                            <InputInForm label="*Giá Tiền (VND)" name="unit_price" value={productDetailsState.unit_price} onChangeValue={onChangeDetailsValue} />
                            <Typography variant='h6' sx={{ color: 'gray' }}>Thông Số Kĩ Thuật</Typography>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <InputInForm label="Điện Áp" name="voltage" value={productDetailsState.voltage} onChangeValue={onChangeDetailsValue} />
                                <InputInForm label="Chỉ Số Hoàn Màu" name="CRI" value={productDetailsState.CRI} onChangeValue={onChangeDetailsValue} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <InputInForm label="Kích Thước" name="dimension" value={productDetailsState.dimension} onChangeValue={onChangeDetailsValue} />
                                <InputInForm label="Kích Thước Lỗ Khoét" name="hole_dimension" value={productDetailsState.hole_dimension} onChangeValue={onChangeDetailsValue} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <InputInForm label="Chip Led" name="chip_led" value={productDetailsState.chip_led} onChangeValue={onChangeDetailsValue} />
                                <InputInForm label="Góc Chiếu" name="projection_angle" value={productDetailsState.projection_angle} onChangeValue={onChangeDetailsValue} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <InputInForm label="Tiêu Chuẩn" name="standard" value={productDetailsState.standard} onChangeValue={onChangeDetailsValue} />
                                <InputInForm label="Lớp Bảo vệ" name="secureLv" value={productDetailsState.secureLv} onChangeValue={onChangeDetailsValue} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <InputInForm label="Nhiệt Độ Màu" name="lumens_color_temperature" value={productDetailsState.lumens_color_temperature} onChangeValue={onChangeDetailsValue} />
                                <InputInForm label="Quang Thông" name="luminous_flux" value={productDetailsState.luminous_flux} onChangeValue={onChangeDetailsValue} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <InputInForm label="Vật Liệu" name="texture" value={productDetailsState.texture} onChangeValue={onChangeDetailsValue} />
                                <InputInForm label="Thời Gian Bảo Hành" name="warranty" value={productDetailsState.warranty} onChangeValue={onChangeDetailsValue} />
                            </Box>
                            <Box sx={{ bgcolor: 'white', padding: '5px', color: 'black' }}>
                                <FormControl>
                                    <FormLabel sx={{ display: 'flex', alignItems: 'center' }} id="demo-row-radio-buttons-group-label">
                                        Kích Cỡ
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="size"
                                        value={productDetailsState.size}
                                        onChange={handleRadioDetailsChange}
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
                                        value={productDetailsState.color}
                                        onChange={handleRadioDetailsChange}
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
                                        value={productDetailsState.power}
                                        onChange={handleRadioDetailsChange}
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
                        </div>}
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
                            }} onClick={handleSubmit}>Cập nhật Sản Phẩm</Button>
                        </div>
                    </div>
                </Box>
                : ""}
        </>
    )
}
