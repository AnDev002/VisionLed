import React, { useState } from 'react';
import { SidebarData } from './sideBarData';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { TbAlignJustified } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import Overlay from './overlay';

export default function ToggleSideBar() {
    const [open, openState] = useState(true);
    const toggleSidebar = () => openState(!open);
    const navigate = useNavigate();
    const handleLink = (link) => {
        if (link === "")
            navigate(`/`);
        else
            navigate(`/${link}`);
    }
    return (
        <Box>
            {
                open === false ? <Overlay func={toggleSidebar} /> : ""
            }
            <Box color='inherit' onClick={toggleSidebar} sx={{ display: { xs: 'block', md: 'none', color: 'white', fontSize: '2.3rem' }, textAlign: "center" }}><TbAlignJustified /></Box>
            <div className="sidebar-container">
                <ul className={open ? "sidebar active" : "sidebar"}>
                    <span className='close-side-bar' onClick={toggleSidebar}><AiOutlineClose /></span>
                    {SidebarData.map((item, index) => {
                        return <>
                            <li key={index} className={item.cName} style={{ display: "flex", alignItems: "center", cursor: "pointer", fontFamily: "Roboto" }}>
                                <div style={{ display: "flex", justifyContent: "center", textAlign: 'center' }}>
                                    <Link to={item.path} className='nav-link' sx={{ /*justifyContent: "center", textAlign: 'center'*/ }}><Typography sx={{ fontSize: "1.2rem" }}>{item.title}</Typography></Link>
                                </div>
                            </li>
                        </>
                    })}
                </ul>
            </div>
        </Box>
    )
}