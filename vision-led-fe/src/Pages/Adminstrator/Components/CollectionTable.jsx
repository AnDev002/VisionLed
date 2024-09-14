import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as CollectionServices from '../../../Services/CollectionServices'
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
import DeleteCollectionForm from './DeleteCollectionForm';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled'; 

export default function CollectionTable() {
    const userSelector = useSelector((state) => state.user)
    const [reload, setReload] = useState(false);
    const columns = [
        { field: 'idDisplay', headerName: 'ID', width: 70 },
        {
            field: 'image', // Tên cột chứa URL hình ảnh
            headerName: '',
            width: 150,
            renderCell: (params) => (
                <img
                    src={params.value} // Truy cập URL hình ảnh từ dữ liệu của hàng
                    alt="Product"
                    style={{ maxWidth: '95px', height: 'auto' }} // Tùy chỉnh kích thước hình ảnh
                />
            ),
        },
        { field: 'name', headerName: 'Tên Bộ Sưu Tập', width: 130 },
        { field: 'description', headerName: 'Mô tả', width: 130 },
        {
            field: 'action',
            headerName: '',
            width: 200,
            renderCell: (params) => (
                <div>
                    <VisibilityIcon
                        style={{ cursor: 'pointer', marginRight: '10px', color: 'gray' }}
                        onClick={() => viewDetailsHandle({ id: params.row._id, name: params.row.name, image: params.row.image, description: params.row.description })}
                    />
                    <EditIcon
                        style={{ cursor: 'pointer', marginRight: '10px', color: '#e5a960' }}
                        onClick={() => handleUpdate({ id: params.row._id, name: params.row.name, image: params.row.image, description: params.row.description })}
                    />
                    <DeleteIcon
                        style={{ cursor: 'pointer', color: '#f16262' }}
                        onClick={() => handleDelete({ id: params.row._id })}
                    />
                </div>
            ),
        }
    ];
    const getRowId = (row) => row.idDisplay;
    const getAllCollection = async () => {
        const res = await CollectionServices.GetAllCollection();
        return res;
    }
    const { isLoading, data } = useQuery({ queryKey: ['collections', reload], queryFn: getAllCollection })

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
    const [deletingItem, setDeletingItem] = useState(null);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const handleOpenDelete = () => setIsOpenDelete(!isOpenDelete);

    const handleDelete = ({ id }) => {
        setDeletingItem(id);
        handleOpenDelete();
    }
    const handleUpdate = (...rest) => {
        let result = { ...rest }
        setEditingItem(result[0])
        handleOpenEdit();
    }

    const mutationDelete = UseMutationHooks((data) => {
        const {
            id,
            access_token
        } = data

        return CollectionServices.DeleteCollection({
            id,
            access_token
        })
    })



    const deleteHandle = (id) => {
        mutationDelete.mutate({ id: id, access_token: userSelector?.access_token });
    }

    const viewDetailsHandle = (...rest) => {
        let result = { ...rest }
        setEditingItem(result[0])
        handleOpenDetails()
    }
    const handleReload = () => {
        setReload(!reload)
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
                {(isOpenDelete === true) ? <Overlay func={handleOpenDelete} /> : ""}
                {(isOpenDelete === true) ? <DeleteCollectionForm deletingItem={deletingItem} func={handleOpenDelete} /> : ""}
                {(isOpenEdit === true) ? <Overlay func={handleOpenEdit} /> : ""}
                {(isOpenEdit === true) ? <EditCollectionForm editingItem={editingItem} func={handleOpenEdit} /> : ""}
                {(isOpenDetails === true) ? <Overlay func={handleOpenDetails} /> : ""}
                {(isOpenDetails === true) ? <ViewDetailsCollection editingItem={editingItem} /> : ""}
            </div>
        </>
    );
}