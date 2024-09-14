import React from 'react'
// import { Link } from "react-router-dom";
import './globalComponents.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BtnSeeMore(props) {
    const navigate = useNavigate()
    const handleNavLink = (collectionId) => {
        navigate(`/products/${collectionId}`);
    }
    return (
        <>
            {
                props.collectionId ?
                    <div className='btn-dir2'>
                        <div className="arrow-container2">
                            <div className="arrow2"></div>
                        </div>
                        <Button onClick={() => handleNavLink(props.collectionId)} color='primary' {...props} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '5px 10px',
                            paddingRight: '20px',
                            margin: '5px 0px',
                            marginBottom: '50px',
                            marginLeft: `${props.mgLeft}`,
                            transform: `${props.transform}`,
                            color: 'white',
                            padding: '8px 20px',
                            border: '1px solid white',
                            backgroundColor: 'rgba(50, 50, 50, 100%)',
                            borderRadius: '0',
                            '&:hover': {
                                backgroundColor: 'rgba(256, 256, 256, 100%)',
                                border: '1px solid white',
                                color: 'black',
                                borderColor: 'black',
                                transition: '.3s',
                            },

                        }}>Xem Thêm</Button>
                    </div>
                    :
                    <div className='btn-dir2'>
                        <div className="arrow-container2">
                            <div className="arrow2"></div>
                        </div>
                        <Button color='primary' {...props} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '5px 0px',
                            marginBottom: '50px',
                            marginLeft: `${props.mgLeft}`,
                            transform: `${props.transform}`,
                            color: 'white',
                            padding: '8px 20px',
                            border: '1px solid white',
                            backgroundColor: 'rgba(50, 50, 50, 100%)',
                            borderRadius: '0',
                            '&:hover': {
                                backgroundColor: 'rgba(256, 256, 256, 100%)',
                                border: '1px solid white',
                                color: 'black',
                                borderColor: 'black',
                                transition: '.3s',
                            },

                        }}>Xem Thêm</Button>
                    </div>
            }
        </>
    )
}