import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AddProductForm from './AddProductForm';
import Overlay from '../../Components/overlay';
import AddCollectionForm from './AddCollectionForm';
import AddProjectForm from './AddProjectForm';
import AddProjectDetailsForm from './AddProjectDetailsForm';

export default function AddProjectButton({ projectId }) {
    const [openForm, setOpenForm] = useState(false);
    const handleSetOpen = () => setOpenForm(!openForm)

    return (
        <>
            {((openForm === true) ? <AddProjectDetailsForm projectId={projectId} func={handleSetOpen} /> : "")}
            {((openForm === true) ? <Overlay func={handleSetOpen} /> : "")}

            <Button sx={{ width: '100%', background: 'black', color: 'white', padding: '5px 15px', border: '1px solid #dfdfdff2', background: '#dfdfdf7a', margin: '20px 0' }} onClick={handleSetOpen}>
                Thêm chi tiết dự án
                <AddIcon sx={{ color: 'black' }} />
            </Button>
        </>
    )
}
