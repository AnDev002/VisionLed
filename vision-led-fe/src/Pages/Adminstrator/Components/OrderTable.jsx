import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as OrderServices from '../../../Services/OrderServices'
import { useQuery } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Overlay from '../../Components/overlay';
import { useSelector } from 'react-redux';
import EditUserForm from './EditUserForm';
import { FcDataConfiguration } from "react-icons/fc";
import OrderHandleForm from './OrderHandleForm';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled'; 

export default function OrderTable() {
    const userSelector = useSelector((state) => state.user)
    const [reload, setReload] = useState(false);
   
    const columns = [
        { field: 'orderId', headerName: 'Mã đơn hàng', width: 100 },
        {
            field: 'createdAt', headerName: 'Tạo lúc', width: 170,
            renderCell: (params) => (
                <div>
                    {new Date(params.row.createdAt).toLocaleString()}
                </div>
            ),
        },
        {
            field: 'phone',
            headerName: 'Số điện thoại',
            width: 110,
            renderCell: (params) => (
                <div>
                    {params.row?.customer?.phone}
                </div>
            ),
        },
        {
            field: 'address',
            headerName: 'Địa chỉ giao hàng',
            width: 130,
            renderCell: (params) => (
                <div>
                    {params.row?.customer?.address}
                </div>
            ),
        },
        {
            field: 'name',
            headerName: 'Tên khách hàng',
            width: 180,
            renderCell: (params) => (
                <div>
                    {params.row?.customer?.name}
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 160,
            renderCell: (params) => (
                <div>
                    {params.row?.status === "PENDING" ? "pending" : params.row?.status === "CONFIRMED" ? "confirmed" : params.row?.status === "SHIPPING" ? "shipping" : params.row?.status === "COMPLETED" ? "completed" : params.row?.status === "CANCEL" ? "canceled" : ""}
                </div>
            ),
        },
        {
            field: 'paymentMethod',
            headerName: 'Thanh toán',
            width: 260,
            renderCell: (params) => (
                <div>
                    {params.row?.paymentMethod === "COD" ? "COD" : params.row?.paymentMethod === "BANKING" ? "banking" : "419 Err"}
                </div>
            ),
        },
        {
            field: 'action',
            headerName: '',
            width: 200,
            renderCell: (params) => (
                <div>
                    <FcDataConfiguration
                        style={{ cursor: 'pointer', marginRight: '10px', color: '#e5a960', fontSize: "22px" }}
                        onClick={() => handleUpdate({ id: params.row?._id, createAt: new Date(params.row?.createdAt).toLocaleString(), customer: params.row?.customer, orderId: params.row?.orderId, status: params.row?.status, paymentMethod: params.row?.paymentMethod, orderItems: params.row?.orderItems, description: params.row?.description, deliveryAt: params.row?.deliveryAt })}
                    />
                    <DeleteIcon
                        style={{ cursor: 'pointer', color: '#f16262' }}
                        onClick={() => deleteHandle(params.row?._id)}
                    />
                </div>
            ),
        }
    ];
    const getRowId = (row) => row.orderId;
    const getAllOrder = async () => {
        const res = await OrderServices.GetOrders();
        return res;
    }
    const { isLoading, data } = useQuery({ queryKey: ['all-order', reload], queryFn: getAllOrder })
    let dataIdHandle = []
    if (data !== undefined && data !== null) {
        if (data?.data.length > 0) {
            dataIdHandle = data?.data.map((product, index) => (
                {
                    ...product,
                    idDisplay: (index + 1).toString()
                }
            ))
        }
    }

    const [editingItem, setEditingItem] = useState(null);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const handleOpenEdit = () => setIsOpenEdit(!isOpenEdit)
    const [viewDetailsItem, setViewDetailsItem] = useState(null);
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const handleOpenDetails = () => setIsOpenDetails(!isOpenDetails)

    const handleUpdate = (...rest) => {
        let result = { ...rest }
        setEditingItem(result[0])
        handleOpenEdit();
    }
    const handleReload = () => {
        setReload(!reload); // Tải lại trang
    };
    // const mutationDelete = UseMutationHooks((data) => {
    //     const {
    //         id,
    //         access_token
    //     } = data

    //     return UserServices.DeleteUser({
    //         id,
    //         access_token
    //     })
    // })

    const deleteHandle = (id) => {
        // mutationDelete.mutate({ id: id, access_token: userSelector?.access_token });
    }

    const viewDetailsHandle = (...rest) => {
        let result = { ...rest }
        setEditingItem(result[0])
        handleOpenDetails()
    }

    return (
        <>
            {
                isLoading === true ?
                    <p>Loading..</p> :
                    <>
                        <div style={{ display: "flex", cursor: "pointer", justifyContent: "space-between" }}>
                            <div></div>
                            <div onClick={handleReload} style={{}}><ReplayCircleFilledIcon /></div>
                        </div>
                        <div style={{ height: "40vh", width: '80vw' }}>
                            {(data?.data) ?
                                <DataGrid
                                    rows={data?.data}
                                    getRowId={getRowId}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection={false}
                                />
                                : ""}
                            {(isOpenEdit === true) ? <Overlay func={handleOpenEdit} /> : ""}
                            {(isOpenEdit === true) ? <OrderHandleForm order={editingItem} reload={handleReload} func={handleOpenEdit} /> : ""}
                        </div></>
            }
        </>
    );
}