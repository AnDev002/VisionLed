import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as UserServices from '../../../Services/UserServices'
import { useQuery } from '@tanstack/react-query';
import { UseMutationHooks } from '../../../Hooks/UseMutationHook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import EditForm from './EditProductForm';
import Overlay from '../../Components/overlay';
import ViewDetailsProduct from './ViewDetailsProduct';
import { useSelector } from 'react-redux';
import EditCollectionForm from './EditCollectionForm';
import ViewDetailsCollection from './ViewDetailsCollection';
import EditUserForm from './EditUserForm';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled'; 

export default function UserTable() {
    const userSelector = useSelector((state) => state.user)
    const [reload, setReload] = useState(false);
    const columns = [
        { field: 'idDisplay', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Tên', width: 130 },
        { field: 'phone', headerName: 'Số Điện Thoại', width: 130 },
        {
            field: 'email',
            headerName: 'Email',
            width: 260
        },
        {
            field: 'isAdmin',
            headerName: 'Loại Tài Khoản',
            width: 130,
            renderCell: (params) => (
                (params.row.isAdmin === false) ? <>
                    <h4>Khách hàng</h4>
                </> : <>
                    <h4>Admin</h4>
                </>
            )
        },
        {
            field: 'action',
            headerName: '',
            width: 200,
            renderCell: (params) => (
                <div>
                    <EditIcon
                        style={{ cursor: 'pointer', marginRight: '10px', color: '#e5a960' }}
                        onClick={() => handleUpdate({ id: params.row._id, name: params.row.name, phone: params.row.phone, isAdmin: params.row.isAdmin })}
                    />
                </div>
            ),
        }
    ];
    const getRowId = (row) => row.idDisplay;
    const getAllUser = async () => {
        const res = await UserServices.GetAllUser(userSelector?.access_token);
        return res;
    }
    const { isLoading, data } = useQuery({ queryKey: ['all-user', reload], queryFn: getAllUser })

    let dataIdHandle = []
    if (data?.data.length > 0) {
        dataIdHandle = data?.data.map((product, index) => (
            {
                ...product,
                idDisplay: (index + 1).toString()
            }
        ))
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

    const handleReload = () => {
        setReload(!reload);
    }

    return (
        <>
            <div style={{ display: "flex", cursor: "pointer", justifyContent: "space-between" }}>
                <div></div>
                <div onClick={handleReload} style={{}}><ReplayCircleFilledIcon /></div>
            </div>
            <div style={{ height: "40vh", width: '80vw' }}>
                {(data?.data) ?
                    <DataGrid
                        rows={dataIdHandle}
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
                {(isOpenEdit === true) ? <EditUserForm editingItem={editingItem} func={handleOpenEdit} /> : ""}
            </div>
        </>
    );
}