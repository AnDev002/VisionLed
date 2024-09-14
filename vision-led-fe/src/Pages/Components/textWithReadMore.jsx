import { Typography } from '@mui/material';
import React, { useState } from 'react';

function TextWithReadMore({ text, maxLength }) {
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);

    const toggleTextVisibility = () => {
        setIsFullTextVisible(!isFullTextVisible);
    };

    const displayText = isFullTextVisible ? text : text.slice(0, maxLength) + '...';

    return (
        <div>
            <Typography variant="h5" sx={{
                padding: {
                    xs: "0 5px",
                    sm: "0 15px",
                    md: "0 50px",
                    lg: "0 150px",
                    xl: "0 250px"
                }, color: 'black', fontFamily: "'Times New Roman', Times, serif",
                fontSize: '1.0rem'
            }}>{displayText}
            
            {!isFullTextVisible && text.length > maxLength && (
                <span onClick={toggleTextVisibility} style={{fontSize: '.9rem', color: 'gray', cursor: 'pointer'}}>Xem thêm</span>
            )}
            </Typography>
        </div>
    );
}

export default TextWithReadMore;