import { Box, Grid, Typography } from "@mui/material";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import React, { useEffect, useRef, useState } from "react";
import "./aboutuscss.css"

const FadeUpSection = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 } 
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
  
    return (
      <div
        ref={sectionRef}
        className={`fade-up ${isVisible ? 'visible' : ''}`}
      >
        <Grid container spacing={2} sx={{
                    padding: {
                        xs: "5px",
                        md: "20px"
                    }, display: "flex", alignItems: "center"
                }}>
                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1}></Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ display: { xs: 'block', sm: 'block' }, borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                <Typography variant="h6" >
                                Tam Anh là đối tác nổi bật trong việc thiết kế các giải pháp chiếu sáng trong nhà và ngoài trời từ những ngôi nhà sang trọng cho đến những công trình trọng điểm lớn. Chúng tôi tự hào mang đến sự sáng tạo độc đáo, chất lượng trong từng sản phẩm và ưu tiên tầm nhìn cũng như sự hài lòng của khách hàng trong mọi dự án chúng tôi thực hiện.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}></Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} sx={{ display: { xs: 'block', sm: 'block' }, aspectRatio: "1 / 1", borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                <img src="hiltongarden.webp" alt="" />
            </Grid>
                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1}></Grid>
        </Grid>
      </div>
    );
  };
  const FadeUpSection2 = (props) => {
      const [isVisible, setIsVisible] = useState(false);
      const sectionRef = useRef(null);
    
      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          },
          { threshold: 0.2 } 
        );
    
        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
    
        return () => {
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        };
      }, []);
    
      return (
        <div
          ref={sectionRef}
          className={`fade-up ${isVisible ? 'visible' : ''}`}
        >
          <Grid container spacing={2} sx={{
                      padding: {
                          xs: "5px",
                          md: "20px"
                      }, display: "flex", alignItems: "center"
                  }}>
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1}></Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ display: { xs: 'none', sm: 'none', md: "block" }, width: "auto", height: "500px", borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                    <img src="hiltongarden.webp" alt="tam anh" />
                </Grid>
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1}></Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ display: { xs: 'block', sm: 'block' }, borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                    <Typography variant="h6" >
                                 Chúng tôi đã tuyển chọn các thiết bị chiếu sáng tốt nhất từ ​​các nhà máy và nhà sản xuất nổi tiếng trên khắp thế giới. Các sản phẩm đa dạng và phong phú từ kiểu dáng, tính năng cho đến giá thành, phù hợp với nhiều tệp khách hàng mà chúng tôi muốn hướng đến.
                                 Công ty TNHH điện chiếu sáng Tam Anh hoạt động trong lĩnh vực mua bán, kinh doanh, tư vấn, sản xuất, nhập khẩu và phân phối các thiết bị đèn, thiết bị chiếu sáng dân dụng và công trình dưới tên thương hiệu Vision Led

                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}></Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ display: { xs: 'block', sm: 'block', md: "none" }, width: "auto", height: "500px", borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                    <img src="hiltongarden.webp" alt="tam anh" />
                </Grid>
          </Grid>
        </div>
      );
    };

    const FadeUpSection3 = (props) => {
        const [isVisible, setIsVisible] = useState(false);
        const sectionRef = useRef(null);
      
        useEffect(() => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
              }
            },
            { threshold: 0.2 } 
          );
      
          if (sectionRef.current) {
            observer.observe(sectionRef.current);
          }
      
          return () => {
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          };
        }, []);
      
        return (
          <div
            ref={sectionRef}
            className={`fade-up ${isVisible ? 'visible' : ''}`}
          >
            <Box sx={{width: "100vw", padding: '20px', bgcolor: "#f6f6f6", marginTop: "50px"}}>
              <Box sx={{display: "flex", justifyContent: "center"}}>
                <Typography variant="h4" sx={{marginBottom: "20px"}}> Tiktok </Typography>
              </Box>
              <Grid container spacing={1} sx={{
                      display: "flex", alignItems: "center", justifyContent: "space-around"
                  }}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{width: "33%", aspectRatio: "1 / 1", overflow: "hidden", cursor: "pointer"}}>
                      <img src="https://americanbazaaronline.com/wp-content/uploads/2025/01/DALL%C2%B7E-2025-01-21-00.01.12-An-illustration-depicting-the-shutdown-of-TikTok.-The-image-shows-a-smartphone-screen-with-the-TikTok-app-icon-fading-or-disappearing.-The-background-.webp" alt="" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{width: "33%", aspectRatio: "1 / 1", overflow: "hidden", cursor: "pointer"}}>
                      <img src="https://americanbazaaronline.com/wp-content/uploads/2025/01/DALL%C2%B7E-2025-01-21-00.01.12-An-illustration-depicting-the-shutdown-of-TikTok.-The-image-shows-a-smartphone-screen-with-the-TikTok-app-icon-fading-or-disappearing.-The-background-.webp" alt="" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{width: "33%", aspectRatio: "1 / 1", overflow: "hidden", cursor: "pointer"}}>
                      <img src="https://americanbazaaronline.com/wp-content/uploads/2025/01/DALL%C2%B7E-2025-01-21-00.01.12-An-illustration-depicting-the-shutdown-of-TikTok.-The-image-shows-a-smartphone-screen-with-the-TikTok-app-icon-fading-or-disappearing.-The-background-.webp" alt="" />
                    </Grid>
                </Grid>
              </Box>
            {/* <Grid container spacing={2} sx={{
                        padding: {
                            xs: "5px",
                            md: "20px"
                        }, display: "flex", alignItems: "center"
                    }}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: { xs: 'none', sm: 'block' }, borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                    <Typography variant="h6" >
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: { xs: 'none', sm: 'block' }, borderRadius: '5px', objectFit: 'cover', overflow: 'hidden' }} >
                    <img src="hiltongarden.webp" alt="" />
                </Grid>
            </Grid> */}
          </div>
        );
      };




export default function AboutUsContent() {
  const images = [
    "https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg",
    "https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1",
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);
    return (
        <>
            <div>
                
                 <div className="parallax-content" style={{ transform: `translateX(${scrollX * 0.2}px)` }}>
                     <div className="parallax-item">
                        <div style={{position: "relative"}}></div>
                        {images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Slide ${index + 1}`}
                            style={{width: "100%", height: "100%"}}
                            className={`slide ${index === currentIndex ? "active" : ""}`}
                          />
                        ))}                     
                      <div  style={{position: "absolute", top: "50%", left: "20%", transform: "translate(-50%, -20%)"}}>
                        <Typography variant="h3" sx={{ fontFamily: "Roboto", fontWeight: "bold", color: "white", fontSize: {xs: "1.2rem", md: "3.5rem"} }}>Về chúng tôi</Typography>
                      </div>
                    </div>
                 </div>
                <FadeUpSection />
                <FadeUpSection2 />
                {/* <FadeUpSection3 /> */}
               
            </div>
        </>
    );
    // const ref = useRef();
  
    // return (
    //     <>
    //      <Parallax pages={4} ref={ref}>
    //   <ParallaxLayer offset={0} speed={2.5}>
    //     <p>Layers can contain anything</p>
    //     <img src="hiltongarden.webp" alt="" srcset="" />
    //   </ParallaxLayer>

    //   <ParallaxLayer offset={1} speed={2.5}>
    //     <p>Layers can contain anything</p>
    //     <img src="hiltongarden.webp" alt="" srcset="" />
    //   </ParallaxLayer>
    //   <ParallaxLayer offset={2} speed={2.5}>
    //     <p>Layers can contain anything</p>
    //     <img src="hiltongarden.webp" alt="" srcset="" />
    //   </ParallaxLayer>
    //   <ParallaxLayer offset={3} speed={-2} factor={1.5} horizontal />

    //   <ParallaxLayer sticky={{ start: 1, end: 4 }} />

    //   <ParallaxLayer offset={4} speed={1}>
    //     <button onClick={() => ref.current.scrollTo(0)}>Scroll to top</button>
    //   </ParallaxLayer>
    // </Parallax>
    //         {/* <Box className="parallax-container" ref={containerRef} sx={{
    //             margin: '100px 0', padding: {
    //                 xs: "0 5px",
    //                 sm: "0 15px",
    //                 md: "0 50px",
    //                 lg: "0 150px",
    //                 xl: "0 250px"
    //             }, textAlign: 'center'
    //         }}>
    //             <div className="parallax-content" style={{ transform: `translateX(${scrollX * 0.2}px)` }}>
    //                 <div className="parallax-item">
    //                 <img src="hiltongarden.webp" alt="Nature" />
    //                 <Typography variant="h4" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
    //                     Lĩnh vực hoạt động
    //                 </Typography>
    //                 </div>
    //             </div>
    //             <div className="parallax-content" style={{ transform: `translateX(${scrollX * 0.2}px)` }}>
    //                 <div className="parallax-item">
    //                 <img src="hiltongarden.webp" alt="Nature" />
    //                 <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
    //                 Công ty TNHH điện chiếu sáng Tam Anh hoạt động trong lĩnh vực mua bán, kinh doanh, tư vấn, sản xuất, nhập khẩu và phân phối các thiết bị đèn, thiết bị chiếu sáng dân dụng và công trình dưới tên thương hiệu Vision Led
    //                 </Typography>
    //                 </div>
    //             </div>
    //             <div className="parallax-content" style={{ transform: `translateX(${scrollX * 0.2}px)` }}>
    //                 <div className="parallax-item">
    //                 <img src="hiltongarden.webp" alt="Nature" />
    //                 <Typography variant="h4" sx={{ marginTop: '100px', fontFamily: "'Cormorant Garamond', serif" }}>
    //                 Về chúng tôi
    //                 </Typography>
    //                 </div>
    //             </div>
                
    //             <div className="parallax-content" style={{ transform: `translateX(${scrollX * 0.2}px)` }}>
    //                 <div className="parallax-item">
    //                 <img src="hiltongarden.webp" alt="Nature" />
    //                 <Typography variant="h6" sx={{ fontFamily: "'Cormorant Garamond', serif" }}>
    //                 Tam Anh là đối tác nổi bật trong việc thiết kế các giải pháp chiếu sáng trong nhà và ngoài trời từ những ngôi nhà sang trọng cho đến những công trình trọng điểm lớn. Chúng tôi tự hào mang đến sự sáng tạo độc đáo, chất lượng trong từng sản phẩm và ưu tiên tầm nhìn cũng như sự hài lòng của khách hàng trong mọi dự án chúng tôi thực hiện.
    //                 Chúng tôi đã tuyển chọn các thiết bị chiếu sáng tốt nhất từ ​​các nhà máy và nhà sản xuất nổi tiếng trên khắp thế giới. Các sản phẩm đa dạng và phong phú từ kiểu dáng, tính năng cho đến giá thành, phù hợp với nhiều tệp khách hàng mà chúng tôi muốn hướng đến.
    //                 </Typography>
    //                 </div>
    //             </div>
                
                
                
    //         </Box> */}
            
    //     </>
    // );
}
