import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { UseMutationHooks } from '../../../Hooks/UseMutationHook'
import * as ProjectServices from '../../../Services/ProjectServices'
import { useSelector } from 'react-redux'

export default function DeleteProjectForm(props) {
    const userSelector = useSelector((state) => state.user)
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

    const deleteSubmit = () => {
        mutationDelete.mutate({ id: props.deletingItem, access_token: userSelector?.access_token });
        props.func();
    }

    return (
        <>
            <Box sx={{ position: "fixed", background: "white", padding: "20px", borderRadius: "12px", zIndex: "600", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "300px" }}>
                <Typography variant="h6">
                    Bạn có chắc chắn muốn xoá dự án này?
                </Typography>
                <br />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div></div>
                    <div style={{ display: "flex", gap: "5px" }}>
                        <Button onClick={props.func} sx={{
                            textTransform: "unset", background: "black", color: "white", "&:hover": {
                                background: "black", color: "white"
                            }
                        }}>
                            Huỷ
                        </Button>
                        <Button onClick={deleteSubmit} sx={{
                            textTransform: "unset", background: "black", color: "white", "&:hover": {
                                background: "black", color: "white"
                            }
                        }}>
                            Chăc chắn
                        </Button>
                    </div>
                </div>
            </Box>
        </>
    )
}
