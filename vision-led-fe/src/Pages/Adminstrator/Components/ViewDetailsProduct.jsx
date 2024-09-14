import React, { useState } from 'react'
import { UseMutationHooks } from '../../../Hooks/UseMutationHook'
import * as ProductServices from '../../../Services/ProductServices'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
export default function ViewDetailsProduct(props) {
    const [productState, setproductState] = useState({
        id: props?.editingItem?.id,
        name: props?.editingItem?.name,
        image: props?.editingItem?.image,
        protection_rating: props?.editingItem?.protection_rating,
        product_type: props?.editingItem?.product_type,
        collection: props?.editingItem?.collection,
    });
    const GetProductDetails = async (productId) => {
        let res = {}
        if (productId !== null && productId !== 'null' && productId) {
            res = await ProductServices.GetProductDetails(productId);
        }
        return res;
    }
    const [productDetailsState, setProductDetailsState] = useState({});
    const { isLoading: isLoadingDetails, data: dataDetails } = useQuery({ queryKey: ['product-details-views'], queryFn: () => GetProductDetails(props.editingItem.id) })
    const [viewDetails, setviewDetails] = useState(false);
    const [viewId, setviewId] = useState(null);
    const handleviewDetails = (idDetails, _id) => {
        setviewDetails(!viewDetails);
        setProductDetailsState({
            countInStock: dataDetails?.data[idDetails].countInStock,
            unit_price: dataDetails?.data[idDetails].unit_price,
            size: dataDetails?.data[idDetails]?.size ? dataDetails?.data[idDetails]?.size?.sizeName : undefined,
            color: dataDetails?.data[idDetails]?.color ? dataDetails?.data[idDetails]?.color?.colorName : undefined,
            power: dataDetails?.data[idDetails]?.power ? dataDetails?.data[idDetails]?.power?.powerValue : undefined,
            voltage: dataDetails?.data[idDetails].voltage,
            CRI: dataDetails?.data[idDetails].CRI,
            dimension: dataDetails?.data[idDetails].dimension,
            hole_dimension: dataDetails?.data[idDetails].hole_dimension,
            projection_angle: dataDetails?.data[idDetails].projection_angle,
            chip_led: dataDetails?.data[idDetails].chip_led,
            lumens_color_temperature: dataDetails?.data[idDetails].lumens_color_temperature,
            luminous_flux: dataDetails?.data[idDetails].luminous_flux,
            warranty: dataDetails?.data[idDetails].warranty
        })
    }
    return (
        <>
            <Box sx={{ position: 'fixed', bgcolor: 'white', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', padding: '20px', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                {
                    viewDetails === false ?
                        <div className="details-item-wrapper" style={{ display: 'flex' }}>
                            <div style={{ width: '50%' }}>
                                <img style={{ maxWidth: "100%" }} src={productState?.image} alt="pdes" />
                            </div>
                            <div style={{ width: '50%', padding: '20px' }}>
                                <div style={{ fontSize: '1.5em' }}>Sản Phẩm: {productState?.name}</div>
                                <div style={{ fontSize: '1.5em' }}>Loại: {productState?.product_type}</div>
                                <div style={{ fontSize: '1.5em' }}>Lượt Đánh Giá: {productState?.protection_rating}</div>
                                <div style={{}}>
                                    {dataDetails?.data.map((item, index) => {
                                        return <Box onClick={() => handleviewDetails(index, item._id)} sx={{ border: '1px solid gray', margin: "5px 0", borderRadius: '5px', fontWeight: "bold", background: 'black', cursor: 'pointer', color: 'white', padding: '5px 10px' }}>
                                            {(item?.product ? item.product.name : '') + " " + (item?.power ? item?.power?.powerValue : '') + " " + (item?.size ? item?.size?.sizeName : '') + " " + (item?.color ? item?.color?.colorName : '')}
                                        </Box>
                                    })}
                                </div>
                            </div>
                        </div>
                        : <div style={{padding: '10px 50px'}}>
                            <div style={{ fontSize: '1.5em' }}>Số lượng: {productDetailsState?.countInStock}</div>
                            <div style={{ fontSize: '1.5em' }}>Giá: {productDetailsState?.unit_price}</div>
                            <div style={{ fontSize: '1.5em' }}>Size: {productDetailsState?.size}</div>
                            <div style={{ fontSize: '1.5em' }}>Màu Sắc: {productDetailsState?.color}</div>
                            <div style={{ fontSize: '1.5em' }}>Công Xuất: {productDetailsState?.power}</div>
                            <div style={{ fontSize: '1.5em' }}>Điện Áp: {productDetailsState?.voltage}</div>
                            <div style={{ fontSize: '1.5em' }}>Chỉ Số Hoàn Màu: {productDetailsState?.CRI}</div>
                            <div style={{ fontSize: '1.5em' }}>Kích Thước: {productDetailsState?.dimension}</div>
                            <div style={{ fontSize: '1.5em' }}>Kích Thước Lỗ Khoét: {productDetailsState?.hole_dimension}</div>
                            <div style={{ fontSize: '1.5em' }}>Góc Chiếu: {productDetailsState?.projection_angle}</div>
                            <div style={{ fontSize: '1.5em' }}>Chip Led: {productDetailsState?.chip_led}</div>
                            <div style={{ fontSize: '1.5em' }}>Nhiệt Độ Màu: {productDetailsState?.lumens_color_temperature}</div>
                            <div style={{ fontSize: '1.5em' }}>Quang Thông: {productDetailsState?.luminous_flux}</div>
                            <div style={{ fontSize: '1.5em' }}>Bảo Hành: {productDetailsState?.warranty}</div>

                        </div>
                }
            </Box>
        </>
    )
}
