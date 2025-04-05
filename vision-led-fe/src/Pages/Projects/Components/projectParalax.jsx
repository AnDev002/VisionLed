import { Typography } from '@mui/material';
import React from 'react'
import { Parallax, Background } from "react-parallax";
import BtnSeeMore from '../../Components/btnSeeMore';
import { useNavigate } from 'react-router-dom';


export default function ProjectParallaxCollections({ img, name, index }) {
    const navigate = useNavigate();
    const handleNavLink = (collectionId) => {
        navigate(`/project-details/${collectionId}`);
    }
    const insideStyles = {
        color: "white",
        padding: 10,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        textAlign: 'center',
        alignItems: 'center',
        zIndex: '300',
    };
    return (
        <>
            <Parallax bgImage={img} strength={100}>
                <div style={{ height: "100vh" }}>
                    <div style={insideStyles}>
                        <Typography variant="h4" sx={{fontFamily: "'Times New Roman', Times, serif"}}>{name}</Typography>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <BtnSeeMore onClick={() => handleNavLink(index)} styles={{
                                fontFamily: "'Times New Roman', Times, serif"
                            }} />
                        </div>
                    </div>
                </div>
            </Parallax>

            {/* <FullpageScroll /> */}
        </>
    )
}
