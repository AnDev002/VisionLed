import React, { useState } from 'react'
import VerticalTabs from '../Tabs'
import { Box } from '@mui/material'

export default function AdminContent() {
    const handleRemoveBg = () => {
        window.open("https://pixlr.com/vn/remove-background/")
    }
    const handleConvertJpg = () => {
        window.open("https://convertio.co/png-jpg/")
    }
    const handleCropImg = () => {
        window.open("https://www.img2go.com/vi/crop-image")
    }
    const handleResizeImg = () => {
        window.open("https://imageresizer.com/")
    }
    const [isShow, setIsShow] = useState(true)

    return (
        <>
            <VerticalTabs />
            {
                isShow === true ?
                    <Box sx={{ position: 'fixed', bottom: '10px', left: '15px', borderRadius: '8px', zIndex: '20', background: '#f2f2f2', padding: '10px', paddingRight: '50px' }}>
                        <div onClick={() => setIsShow(false)} style={{ position: 'absolute', top: '5px', right: '5px', zIndex: '100', color: 'gray', fontSize: '.8rem', cursor: 'pointer' }}>đóng</div>
                        <div style={{ fontSize: '1.3rem' }}>Công cụ hỗ trợ chỉnh sửa ảnh</div>
                        <div style={{ fontSize: '1rem', cursor: 'pointer', textDecoration: "underline" }} onClick={handleRemoveBg}>
                            - Trình xoá nền ảnh
                        </div>
                        <div style={{ fontSize: '1rem', cursor: 'pointer', textDecoration: "underline" }} onClick={handleConvertJpg}>
                            - Trình chuyển đổi ảnh sang đuôi jpg
                        </div>
                        <div style={{ fontSize: '1rem', cursor: 'pointer', textDecoration: "underline" }} onClick={handleCropImg}>
                            - Trình cắt ảnh
                        </div>
                        <div style={{ fontSize: '1rem', cursor: 'pointer', textDecoration: "underline" }} onClick={handleResizeImg}>
                            - Trình resize ảnh
                        </div>
                        <div style={{ fontSize: '1.3rem' }}>
                            Lưu ý:
                            <div style={{ fontSize: '1rem' }}>
                                - Ảnh cần có đuôi .jpg hoặc .jpeg trước
                                <br />
                                khi tạo sản phẩm, dự án, bộ sưu tập
                            </div>
                        </div>
                    </Box>
                    : ""
            }
        </>
    )
}
