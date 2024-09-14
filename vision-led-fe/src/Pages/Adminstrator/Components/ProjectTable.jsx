import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as ProjectServices from '../../../Services/ProjectServices'
import { useQuery } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Overlay from '../../Components/overlay';
import { useSelector } from 'react-redux';
import EditUserForm from './EditUserForm';
import AddProjectDetailsForm from './AddProjectDetailsForm';
import { FcAddDatabase } from "react-icons/fc";
import { UseMutationHooks } from '../../../Hooks/UseMutationHook';
import DeleteProjectForm from './DeleteProjectForm';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled'; 

export default function ProjectTable() {
    const userSelector = useSelector((state) => state.user)
    const [reload, setReload] = useState(false)
    const [projects, setProject] = useState(null)
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
                    style={{ maxWidth: '80px', height: 'auto' }} // Tùy chỉnh kích thước hình ảnh
                />
            ),
        },
        { field: 'name', headerName: 'Tên Dự Án', width: 130 },
        { field: 'description', headerName: 'Mô tả dự án', width: 130 },
        {
            field: 'action',
            headerName: '',
            width: 200,
            renderCell: (params) => (
                <div>
                    <FcAddDatabase
                        style={{ cursor: 'pointer', marginRight: '10px', color: '#e5a960', fontSize: '22px' }}
                        onClick={() => handleOpenDetailsForm({ projectId: params.row._id })}
                    />
                    <DeleteIcon
                        style={{ cursor: 'pointer', color: '#f16262' }}
                        onClick={() => handleDeleteProject({ id: params.row._id })}
                    />
                </div>
            ),
        }
    ];
    const getRowId = (row) => row.idDisplay;
    const getAllProject = async () => {
        const res = await ProjectServices.GetAllProject();
        return res;
    }
    const { isLoading, data } = useQuery({
        queryKey: ['all-project', reload], queryFn: getAllProject, onSuccess: (data) => {
            setProject(data?.data)
        }
    })

    let dataIdHandle = []
    if (projects !== null) {
        if (projects.length > 0)
            dataIdHandle = projects?.map((project, index) => (
                {
                    ...project,
                    idDisplay: (index + 1).toString()
                }
            ))
    }

    const [editingItem, setEditingItem] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const handleOpenEdit = () => setIsOpenEdit(!isOpenEdit)
    const [viewDetailsItem, setViewDetailsItem] = useState(null);
    const [isOpenDetails, setIsOpenDetails] = useState(true);
    const handleOpenDetails = () => setIsOpenDetails(!isOpenDetails)
    const [isOpenDetailsForm, setIsOpenDetailsForm] = useState(false);
    const handleOpenDetailsF = () => setIsOpenDetailsForm(!isOpenDetailsForm)
    const [deletingItem, setDeletingItem] = useState(null);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const handleOpenDelete = () => setIsOpenDelete(!isOpenDelete);

    const handleDeleteProject = ({ id }) => {
        setDeletingItem(id);
        handleOpenDelete();
    }
    const handleOpenDetailsForm = (projectId) => {
        setProjectId(projectId)
        handleOpenDetailsF()
    }


    const mutationDelete = UseMutationHooks((data) => {
        const {
            id,
            access_token
        } = data

        return ProjectServices.DeleteProject({
            id,
            access_token
        })
    })

    const deleteHandle = (id) => {
        mutationDelete.mutate({ id: id, access_token: userSelector?.access_token });
    }
    const handleReload = () => {
        setReload(!reload); // Tải lại trang
    };
    return (
        <>
            {/* <AddProjectDetailsForm /> */}
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
                        selected={false}
                    />
                    : ""}
                {(isOpenDelete === true) ? <Overlay func={handleOpenDelete} /> : ""}
                {(isOpenDelete === true) ? <DeleteProjectForm deletingItem={deletingItem} func={handleOpenDelete} /> : ""}
                {(isOpenEdit === true) ? <Overlay func={handleOpenEdit} /> : ""}
                {(isOpenEdit === true) ? <EditUserForm editingItem={editingItem} /> : ""}
                {(isOpenDetailsForm === true) ? <Overlay func={handleOpenDetailsF} /> : ""}
                {(isOpenDetailsForm === true) ? <AddProjectDetailsForm projectId={projectId} func={handleOpenDetailsF} /> : ""}
            </div>
        </>
    );
}