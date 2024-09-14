import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as ProductServices from '../../../Services/ProductServices'
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
import { FcAddDatabase } from "react-icons/fc";
import AddProductDetailsForm from './AddProductDetailsForm';
import DeleteProductForm from './DeleteProductForm';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

export default function ProductTable() {
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
          style={{ width: '50px', height: '50px' }} // Tùy chỉnh kích thước hình ảnh
        />
      ),
    },
    { field: 'name', headerName: 'Tên Sản Phẩm', width: 130 },
    { field: 'product_type', headerName: 'Loại', width: 130 },
    { field: 'protection_rating', headerName: 'Đánh giá', width: 130 },
    {
      field: 'action',
      headerName: '',
      width: 200,
      renderCell: (params) => (
        <div>
          <VisibilityIcon
            style={{ cursor: 'pointer', marginRight: '10px', color: 'gray' }}
            onClick={() => viewDetailsHandle({ id: params.row._id, name: params.row.name, image: params.row.image, product_type: params.row.product_type, collection: params.row.collection, protection_rating: params.row.protection_rating })}
          />
          <FcAddDatabase
            style={{ cursor: 'pointer', marginRight: '10px', color: 'gray', fontSize: "22px" }}
            onClick={() => addDetailsHandle({ id: params.row._id })}
          />
          <EditIcon
            style={{ cursor: 'pointer', marginRight: '10px', color: '#e5a960' }}
            onClick={() => handleUpdate({ id: params.row._id, name: params.row.name, image: params.row.image, product_type: params.row.product_type, collection: params.row.collection, protection_rating: params.row.protection_rating })}
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

  const getAllProducts = async () => {
    const res = await ProductServices.GetAllProduct(null, null, null, null, null, null, null, null, null, 1000);
    return res;
  }

  const { isLoading, data } = useQuery({ queryKey: ['products', reload], queryFn: getAllProducts })
  let dataIdHandle = []
  if (data?.data.length > 0) {
    dataIdHandle = data?.data.map((product, index) => (
      {
        ...product,
        image: product.image[0],
        product_type: product.product_type.typeName,
        idDisplay: (index + 1).toString()
      }
    ))
  }

  const [editingItem, setEditingItem] = useState(null);
  const [addDetailsId, setAddDetailsId] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleOpenEdit = () => setIsOpenEdit(!isOpenEdit)
  const [isOpenAddDetails, setIsOpenAddDetails] = useState(false);
  const handleOpenAddDetails = () => setIsOpenAddDetails(!isOpenAddDetails)
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

  const addDetailsHandle = ({ id }) => {
    setAddDetailsId(id)
    handleOpenAddDetails();
  }


  const viewDetailsHandle = (...rest) => {
    let result = { ...rest }
    setEditingItem(result[0])
    handleOpenDetails()
  }

  const handleReload = () => {
    setReload(!reload); // Tải lại trang
  };
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
        {(isOpenDelete === true) ? <DeleteProductForm deletingItem={deletingItem} func={handleOpenDelete} /> : ""}
        {(isOpenEdit === true) ? <Overlay func={handleOpenEdit} /> : ""}
        {(isOpenEdit === true) ? <EditForm editingItem={editingItem} func={handleOpenEdit} /> : ""}
        {(isOpenDetails === true) ? <Overlay func={handleOpenDetails} /> : ""}
        {(isOpenDetails === true) ? <ViewDetailsProduct editingItem={editingItem} /> : ""}
        {(isOpenAddDetails === true) ? <Overlay func={handleOpenAddDetails} /> : ""}
        {(isOpenAddDetails === true) ? <AddProductDetailsForm productId={addDetailsId} func={handleOpenAddDetails} addProductSuccess={() => { }} /> : ""}

      </div>
    </>
  );
}