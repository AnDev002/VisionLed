import React from "react";
import StickyNav from "../../../Components/stickyNav";
import { Typography } from "@mui/material";
export default function AboutUsHeader() {
    return (
        <>
            <StickyNav />
            <div className="header-img">
                <div className="header-img-title">
                    <Typography sx={{
                        fontSize: {xs: "1.5rem", md:'2rem'}, fontFamily: "'Nunito Sans', sans-serif",
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        Về chúng tôi
                    </Typography>
                </div>
            </div>
        </>
    );
}
