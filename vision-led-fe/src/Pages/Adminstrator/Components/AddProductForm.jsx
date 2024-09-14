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
// <AddProductForm 
export default function AddProductForm(props) {
    const [isOpen, setIsOpen] = useState(true);


    const [productState, setproductState] = useState({});

    const getProductRefProps = async () => {
        const res = await ProductServices.GetProductRefProps();
        return res
    }

    const { isLoading: isLoadingProps, data: dataProps } = useQuery({ queryKey: ['product-ref'], queryFn: getProductRefProps })

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
                name,
                product_type,
                collection,
                protection_rating,
                descriptions,
                sale_rate,
                image,
            } = data
            return ProductServices.CreateProduct({
                name,
                product_type,
                collection,
                protection_rating,
                descriptions,
                sale_rate,
                image,
            })
        })

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

    const fileInputRef = useRef(null);
    const [listProductImg, setListProductImg] = useState([]);

    useEffect(() => {
        setproductState({
            ...productState,
            image: listProductImg,
        });
    }, [listProductImg]);

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
    }

    const { data, isSuccess } = mutation;

    const { isSuccess: typeIsSuccess } = mutationType

    const getAllProductType = async () => {
        const res = await ProductServices.getAllProductType();
        return res
    }

    const { isLoading: isLoadingType, data: dataType } = useQuery({ queryKey: ['product-type-in', typeIsSuccess], queryFn: getAllProductType })

    return (
        <>
            {(isOpen === true) ?
                <Box style={{ position: 'fixed', left: '50%', top: "50%", transform: "translate(-50%, -50%)", padding: '30px 20px', backgroundColor: 'white', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                    <Typography variant='h4'>Thêm Sản Phẩm</Typography>
                    <Typography variant='h6' sx={{ color: 'gray' }}>Sản Phẩm</Typography>
                    <InputInForm label="*Tên Sản Phẩm" name="name" value={productState.name} onChangeValue={onChangeValue} />
                    <InputInForm label="Giảm giá (VD: 0.35 = 35%)" name="sale_rate" value={productState.sale_rate} onChangeValue={onChangeValue} />
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
                    <div className="group-input-image" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <Button component="label" variant="contained" sx={{ bgcolor: 'black', textTransform: "unset", '&:hover': { bgcolor: 'white !important', color: 'black !important' } }} startIcon={<CloudUploadIcon />}>
                            Hình Ảnh Sản Phẩm (1000x1000px)
                            <VisuallyHiddenInput ref={fileInputRef} onChange={handleFileInputChange} type="file" />
                        </Button>
                        {
                            listProductImg.map((item, index) => {
                                return <img src={item} alt="product" style={{ maxWidth: '60px' }} />
                            })
                        }
                    </div>
                    <InputInForm label="Lượt đánh giá" name="protection_rating" value={productState.protection_rating} onChangeValue={onChangeValue} />

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
                                    dataProps?.data?.collections ?
                                        dataProps?.data?.collections?.map(collection => {
                                            return (
                                                <FormControlLabel value={collection._id} control={<Radio />} label={collection.name} />
                                            )
                                        })
                                        : ""
                                }
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <InputInForm label="Mô tả sản phẩm" name="descriptions" value={productState.descriptions} onChangeValue={onChangeValue} />

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
                            }} onClick={handleSubmit}>Thêm Sản Phẩm</Button>
                        </div>
                    </div>
                </Box>
                : ""}
        </>
    )
}
