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
import * as UserServices from '../../../Services/UserServices'
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

export default function EditUserForm(props) {
    const userSelector = useSelector((state) => state.user)

    const [isOpen, setIsOpen] = useState(true);

    const [userState, setUserState] = useState({
        id: props?.editingItem?.id,
        name: props?.editingItem?.name,
        phone: props?.editingItem?.phone,
        isAdmin: props?.editingItem?.isAdmin,
    });

    const handleRadioChange = (event) => {
        setUserState({
            ...userState,
            [event.target.name]: event.target.value
        })
    };

    const onChangeValue = (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        })
    }

    const mutation = UseMutationHooks((data) => {
        const {
            id,
            access_token,
            userState
        } = data
        return UserServices.UpdateUser({
            id,
            access_token,
            data: userState
        })
    })
    const handleSubmit = () => {
        mutation.mutate({ id: userState?.id, access_token: userSelector?.access_token, userState: userState });
        props.func();
    }
    return (
        <>
            {(isOpen === true) ?
                <Box style={{ position: 'fixed', left: '50%', top: "50%", transform: "translate(-50%, -50%)", padding: '30px 20px', backgroundColor: 'white', zIndex: '100', border: '1px solid gray', height: "400px", overflowY: "auto" }}>
                    <Typography variant='h4'>Cập Nhật Người Dùng</Typography>
                    <div>
                        <InputInForm label="*Tên" name="name" value={userState.name} onChangeValue={onChangeValue} />
                        <InputInForm label="*Số Điện Thoại" name="phone" value={userState.phone} onChangeValue={onChangeValue} />
                        <Box sx={{ bgcolor: 'white', padding: '5px', color: 'black' }}>
                            <FormControl>
                                <FormLabel sx={{ display: 'flex', alignItems: 'center' }} id="demo-row-radio-buttons-group-label">Loại Tài Khoản</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="isAdmin"
                                    value={userState.isAdmin}
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel value={false} control={<Radio />} label="Người Dùng" />
                                    <FormControlLabel value={true} control={<Radio />} label="Admin" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
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
                            }} onClick={handleSubmit}>Cập nhật</Button>
                        </div>
                    </div>
                </Box>
                : ""}
        </>
    )
}
