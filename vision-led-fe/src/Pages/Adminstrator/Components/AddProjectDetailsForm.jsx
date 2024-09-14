import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputInForm from './InputInForm';
import { UseMutationHooks } from '../../../Hooks/UseMutationHook';
import * as ProjectServices from '../../../Services/ProjectServices'
import { useQuery } from '@tanstack/react-query';
import imageCompression from 'browser-image-compression';
import { convertToBase64 } from '../../../Ults';
import Overlay from '../../Components/overlay';

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

export default function AddProjectDetailsForm(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [projectId, setProjectId] = useState(props.projectId)
    const handleClose = () => {
        setIsOpen(!isOpen)
    }
    const [oneProjectDetails, setOneProjectDetails] = useState(
        {
            image: "",
            description: ""
        }
    );
    const [countArr, setCountArr] = useState([0])
    const [projectDetailsState, setProjectDetailsState] = useState([]);
    const [validErr, setValidErr] = useState(false)
    const handleAddOne = () => {
        if (oneProjectDetails.image !== "" || oneProjectDetails.description !== "") {
            setCountArr([...countArr, 0])
            setProjectDetailsState([...projectDetailsState, oneProjectDetails])
            setOneProjectDetails({
                image: "",
                description: ""
            })
            setValidErr(false)
        } else {
            setValidErr(true)
            setProjectDetailsState([...projectDetailsState])
        }
    }

    const onChangeValue = (e) => {
        setOneProjectDetails({
            ...oneProjectDetails,
            [e.target.name]: e.target.value
        })
    }
    const fileInputRef = useRef(null);
    const [projectImg, setProjectImg] = useState('');


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
            setProjectImg(base64data)
            setOneProjectDetails({
                ...oneProjectDetails,
                image: base64data,
            })
        } catch (error) {
            console.error('Error occurred while compressing the image:', error);
        }
    }

    const handleSubmit = () => {
        mutation.mutate({ id: projectId, projectDetailsState: projectDetailsState });
        props.func()
    }
    const mutation = UseMutationHooks(
        (data) => {
            const {
                id: projectId,
                projectDetailsState: projectDetailsState
            } = data
            return ProjectServices.CreateProjectDetails({
                id: projectId,
                projectDetailsState: projectDetailsState
            })
        })
    const { data, isSuccess } = mutation

    
    return (
        <>
            {(isOpen === true) ?
                <Box style={{ position: 'fixed', left: '50%', top: "50%", transform: "translate(-50%, -50%)", padding: '30px 20px', backgroundColor: 'white', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                    <Typography variant="h4">Thêm Chi Tiết Dự Án</Typography>
                    {
                        countArr.map((item) => {
                            return <>
                                <div className="group-input-image" style={{ marginTop: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <Button component="label" variant="contained" sx={{ bgcolor: 'black', textTransform: "unset", '&:hover': { bgcolor: 'white !important', color: 'black !important' } }} startIcon={<CloudUploadIcon />}>
                                        Hình Ảnh Dự Án (kích thước tuỳ chọn)
                                        <VisuallyHiddenInput ref={fileInputRef} onChange={handleFileInputChange} type="file" />
                                    </Button>
                                    {
                                        projectImg ? <img src={projectImg} alt="collection" style={{ maxWidth: '60px' }} /> : ""
                                    }
                                </div>
                                <InputInForm label="*Mô tả" name="description" value={projectDetailsState.description} onChangeValue={onChangeValue} />
                            </>
                        })
                    }
                    <Button sx={{
                        background: 'black', margin: '5px', color: 'white', "&:hover": {
                            background: 'white',
                            color: 'black',
                            transition: '.5s'
                        }
                    }} onClick={handleAddOne}>Thêm +</Button>
                    {validErr === true ?
                        <Typography variant="body1" sx={{ color: 'red' }}>Cần ít nhầt một ảnh hoặc một mô tả</Typography>
                        : ""}
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
                            }} onClick={handleSubmit}>Thêm Dự Án</Button>
                        </div>
                    </div>
                </Box>
                : ""}
        </>
    )
}
