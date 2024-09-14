import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import FacebookIcon from '@mui/icons-material/Facebook';
import { FaTiktok } from "react-icons/fa";
import MessageIcon from '@mui/icons-material/Message';
import { FcContacts } from "react-icons/fc";

const actions = [
    { icon: <FaTiktok />, name: 'Tiktok' },
    { icon: <FacebookIcon />, name: 'Facebook' },
    { icon: <PhoneIphoneIcon />, name: 'Gọi ngay' },
];

export default function FastContactButton() {
    const handleAction = (actionName) => {
        if (actionName === 'Gọi ngay') {
            window.open('tel:0978116688')
        } else if(actionName === 'Facebook') {
            window.open('https://www.facebook.com/tamanhled')
        } else if(actionName === 'Tiktok') {
            window.open('https://www.tiktok.com/@visionboys92')
        }
    }
    return (
        <Box className="ctf" sx={{ position: 'fixed', zIndex: '400', bottom: '10px', right: '4px', background: "red", height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{
                    position: 'absolute', bottom: 16, right: 16, fontSize: '10px !important', background: "none",
                }}
                icon={<FcContacts style={{ fontSize: '48px', backgroundColor: "#00000000", padding: '8px', borderRadius: '100%' }} />}

            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleAction(action.name)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}