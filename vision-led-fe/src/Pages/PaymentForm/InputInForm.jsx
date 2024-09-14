import { TextField } from '@mui/material'
import React from 'react'

export default function InputInForm({ label, index, value, onChangeValue, ...rests }) {
    return (
        <>
            <TextField sx={{ margin: '10px 0' }} value={value} onChange={onChangeValue} fullWidth label={label} id={index} {...rests} />
        </>
    )
}
