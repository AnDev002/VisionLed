import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AddProductForm from './AddProductForm';
import Overlay from '../../Components/overlay';
import AddCollectionForm from './AddCollectionForm';
import AddProjectForm from './AddProjectForm';
import AddProjectDetailsForm from './AddProjectDetailsForm';

export default function AddProductButton({ type }) {
    const [openForm, setOpenForm] = useState(false);
    const handleSetOpen = () => setOpenForm(!openForm)

    return (
        <>
            {
                type === 'ADD_PRODUCT' ?
                    <>
                        {((openForm === true) ? <AddProductForm func={handleSetOpen} /> : "")}
                        {((openForm === true) ? <Overlay func={handleSetOpen} /> : "")}
                    </>
                    : type === 'ADD_COLLECTION' ?
                        <>
                            {((openForm === true) ? <AddCollectionForm func={handleSetOpen} /> : "")}
                            {((openForm === true) ? <Overlay func={handleSetOpen} /> : "")}
                        </>
                        : type === 'ADD_PROJECT' ?
                            <>
                                {((openForm === true) ? <AddProjectForm func={handleSetOpen} /> : "")}
                                {((openForm === true) ? <Overlay func={handleSetOpen} /> : "")}
                            </>
                            : type === 'ADD_PROJECT_DETAILS' ?
                            <>
                                {((openForm === true) ? <AddProjectDetailsForm func={handleSetOpen} /> : "")}
                                {((openForm === true) ? <Overlay func={handleSetOpen} /> : "")}
                            </>
                            : ""
            }

            <Button sx={{ width: '200px', height: '200px', border: '1px solid #dfdfdff2', background: '#dfdfdf7a', margin: '20px 0' }} onClick={handleSetOpen}>
                <AddIcon sx={{ color: 'black' }} />
            </Button>
        </>
    )
}
