import { Box, Typography } from "@mui/material";
import React from "react";
export default function AboutUsContent() {
    return (
        <>
            <Box sx={{
                margin: '100px 0', padding: {
                    xs: "0 5px",
                    sm: "0 15px",
                    md: "0 50px",
                    lg: "0 150px",
                    xl: "0 250px"
                }, textAlign: 'center'
            }}>
                <Typography variant="h4" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Lĩnh vực hoạt động
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Công ty TNHH điện chiếu sáng Tam Anh hoạt động trong lĩnh vực mua bán, kinh doanh, tư vấn, sản xuất, nhập khẩu và phân phối các thiết bị đèn, thiết bị chiếu sáng dân dụng và công trình dưới tên thương hiệu Vision Led
                </Typography>
                <Typography variant="h4" sx={{ marginTop: '100px', fontFamily: "'Cormorant Garamond', serif" }}>
                    Về chúng tôi
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Tam Anh là đối tác nổi bật trong việc thiết kế các giải pháp chiếu sáng trong nhà và ngoài trời từ những ngôi nhà sang trọng cho đến những công trình trọng điểm lớn. Chúng tôi tự hào mang đến sự sáng tạo độc đáo, chất lượng trong từng sản phẩm và ưu tiên tầm nhìn cũng như sự hài lòng của khách hàng trong mọi dự án chúng tôi thực hiện.
                    Chúng tôi đã tuyển chọn các thiết bị chiếu sáng tốt nhất từ ​​các nhà máy và nhà sản xuất nổi tiếng trên khắp thế giới. Các sản phẩm đa dạng và phong phú từ kiểu dáng, tính năng cho đến giá thành, phù hợp với nhiều tệp khách hàng mà chúng tôi muốn hướng đến.
                </Typography>
            </Box>
            
        </>
    );
}
