import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputInForm from './InputInForm';
import { UseMutationHooks } from '../../../Hooks/UseMutationHook';
import * as CollectionServices from '../../../Services/CollectionServices'
import imageCompression from 'browser-image-compression';
import { convertToBase64 } from '../../../Ults';

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

export default function AddCollectionForm(props) {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
        setIsOpen(!isOpen)
    }
    const [collectionState, setCollectionState] = useState({});

    const onChangeValue = (e) => {
        setCollectionState({
            ...collectionState,
            [e.target.name]: e.target.value
        })
    }

    const fileInputRef = useRef(null);
    const [collectionImg, setCollectionImg] = useState('');
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
            setCollectionImg(base64data)
            setCollectionState({
                ...collectionState,
                image: base64data,
            })
        } catch (error) {
            console.error('Error occurred while compressing the image:', error);
        }
    }

    



    const handleSubmit = () => {
        mutation.mutate(collectionState);
        props.func();
    }
    const mutation = UseMutationHooks(
        (data) => {
            const {
                name,
                image,
                description
            } = data
            return CollectionServices.CreateCollection({
                name,
                image: collectionImg,
                description
            })
        })

    const { data, isSuccess } = mutation
    return (
        <>
            {(isOpen === true) ?
                <Box style={{ position: 'fixed', left: '50%', top: "50%", width: "40vw", transform: "translate(-50%, -50%)", padding: '30px 20px', backgroundColor: 'white', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                    <Typography variant='h4'>Thêm Bộ Sưu Tập</Typography>
                    <InputInForm label="*Tên bộ sưu tập" name="name" value={collectionState.name} onChangeValue={onChangeValue} />

                    <div className="group-input-image" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <Button component="label" variant="contained" sx={{ bgcolor: 'black', textTransform: "unset", '&:hover': { bgcolor: 'white !important', color: 'black !important' } }} startIcon={<CloudUploadIcon />}>
                            Hình Ảnh Bộ Sưu Tập (1200x675)
                            <VisuallyHiddenInput ref={fileInputRef} onChange={handleFileInputChange} type="file" />
                        </Button>
                        {
                            collectionImg ? <img src={collectionImg} alt="collection" style={{ maxWidth: '60px' }} /> : ""
                        }
                    </div>
                    <InputInForm label="*Mô tả bộ sưu tập" name="description" value={collectionState.description} onChangeValue={onChangeValue} />

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
                            }} onClick={handleSubmit}>Thêm Bộ Sưu Tập</Button>
                        </div>
                    </div>
                </Box>
                : ""}
        </>
    )
}
