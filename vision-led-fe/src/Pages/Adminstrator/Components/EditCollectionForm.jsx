import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputInForm from './InputInForm';
import { UseMutationHooks } from '../../../Hooks/UseMutationHook';
import * as CollectionServices from '../../../Services/CollectionServices'
import { useSelector } from "react-redux"
import { useQuery } from '@tanstack/react-query';
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

export default function EditCollectionForm(props) {
    const userSelector = useSelector((state) => state.user)

    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
        setIsOpen(!isOpen)
    }
    const [collectionState, setCollectionState] = useState({
        id: props?.editingItem?.id,
        name: props?.editingItem?.name,
        image: props?.editingItem?.image,
        description: props?.editingItem?.description,
    });

    const onChangeValue = (e) => {
        setCollectionState({
            ...collectionState,
            [e.target.name]: e.target.value
        })
    }

    const fileInputRef = useRef(null);
    const [collectionImg, setCollectionImg] = useState("");
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
                image: collectionImg,
            })
        } catch (error) {
            console.error('Error occurred while compressing the image:', error);
        }
    };

    const mutation = UseMutationHooks((data) => {
        const {
            id,
            access_token,
            collectionState
        } = data
        return CollectionServices.updateCollection({
            id,
            access_token,
            data: collectionState
        })
    })
    const handleSubmit = () => {
        mutation.mutate({ id: collectionState?.id, access_token: userSelector?.access_token, collectionState: collectionState });
        props.func();
    }
    return (
        <>
            {(isOpen === true) ?
                <Box style={{ position: 'fixed', left: '50%', top: "50%", transform: "translate(-50%, -50%)", padding: '30px 20px', backgroundColor: 'white', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                    <Typography variant='h4'>Cập Nhật Bộ Sưu Tập</Typography>
                    <div>
                        <Typography variant='h6' sx={{ color: 'gray' }}>Bộ Sưu Tập</Typography>
                        <InputInForm label="*Tên Bộ Sưu Tập" name="name" value={collectionState.name} onChangeValue={onChangeValue} />
                        <div className="group-input-image" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <Button component="label" variant="contained" sx={{ bgcolor: 'black', textTransform: "unset", '&:hover': { bgcolor: 'white !important', color: 'black !important' } }} startIcon={<CloudUploadIcon />}>
                                Hình Ảnh Bộ Sưu Tập (1200x675px)
                                <VisuallyHiddenInput
                                    ref={fileInputRef} onChange={handleFileInputChange} type="file"
                                />
                            </Button>
                            {collectionState.image && (
                                <img src={collectionState.image} alt="Selected Image" style={{ maxWidth: '60px' }} />
                            )}
                        </div>
                        <InputInForm label="*Mô tả" name="description" value={collectionState.description} onChangeValue={onChangeValue} />
                    </div>
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
                            }} onClick={handleSubmit}>Cập nhật Sản Phẩm</Button>
                        </div>
                    </div>
                </Box>
                : ""}
        </>
    )
}
