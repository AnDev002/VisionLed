import React, { useState } from 'react'
import { Box } from '@mui/material'
export default function ViewDetailsCollection(props) {
    const [collectionState, setCollectionState] = useState({
        id: props?.editingItem?.id,
        name: props?.editingItem?.name,
        image: props?.editingItem?.image,
        description: props?.editingItem?.description,
    });

    return (
        <>
            <Box sx={{ position: 'fixed', bgcolor: 'white', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', padding: '20px', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                <div className="details-item-wrapper" style={{ display: 'flex' }}>
                    <div style={{ width: '50%' }}>
                        <img style={{ maxWidth: "100%" }} src={collectionState.image} alt="pdes" />
                    </div>
                    <div style={{ width: '50%', padding: '20px' }}>
                        <div style={{ fontSize: '1.5em' }}>Bộ Sưu Tập: {collectionState.name}</div>
                        <div style={{ fontSize: '1.5em' }}>Mô Tả: {collectionState.description}</div>
                     
                    </div>
                </div>
            </Box>
        </>
    )
}
