import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'
import * as ProjectServices from "../../../../Services/ProjectServices"
import { useQuery } from '@tanstack/react-query'
import "../projects.css"
export default function ProjectsContent() {
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

  const navigate = useNavigate();
  const getAllProject = async () => {
      const res = await ProjectServices.GetAllProject();
      return res;
  }
  const { isLoading, data } = useQuery({ queryKey: ['projects'], queryFn: getAllProject })
  const handleNavLink = (projectId) => {
    
      navigate(`/project-details/${projectId}`);
  }

const ProjectCard = ({ onClickEvent, title, image, description, projectId }) => (
//   <Card 
//   sx={{
//     display: {
//       xs: "block",
//       md: 'flex'
//     }
//   }}
//   onClick={onClickEvent} 
//   >
//   <CardMedia
//     component="img"
//     alt={title}
//     image={image}
//     title={title}
//     sx={{
//       userSelect: 'none', width: { xs:"100%", md: "33%"}, aspectRatio: "1 / 1", overflow: "hidden", cursor: "pointer",
//     }}
//   />
//   <CardContent sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: {
//           xs: '95vw',
//           md: '70vw'
//         }, 
//   }}>
//     <br />
//     <Typography variant="h2" component="div" sx={{fontFamily: "Roboto", textAlign: 'center', fontSize: {
//       xs: '15px',
//       sm: '20px',
//       md: '25px'
//     }}}>
//       {title}
//     </Typography>
//     <br /><br />
//     <Typography variant="h4" color="text.secondary" sx={{
//       padding: '0px 50px',
//       overflow: 'hidden', 
//       textOverflow: 'ellipsis', 
//       display: '-webkit-box',
//       '-webkit-line-clamp': 3, 
//       '-webkit-box-orient': 'vertical',
//       wordWrap: 'break-word',
//       fontFamily: "Roboto",
//       fontSize: {
//         xs: '13px',
//         sm: '18px',
//         md: '23px'
//       }
//     }}>
//       {description}
//     </Typography>
//     <br />
//     <Button onClick={() => handleNavLink(projectId)} color='primary' sx={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             margin: '5px 0px',
//                             marginBottom: '50px',
//                             marginLeft: `10px`,
//                             color: 'white',
//                             padding: '3px 12px',
//                             border: '1px solid white',
//                             backgroundColor: 'rgba(50, 50, 50, 100%)',
//                             borderRadius: '0',
//                             '&:hover': {
//                                 backgroundColor: 'rgba(256, 256, 256, 100%)',
//                                 border: '1px solid white',
//                                 color: 'black',
//                                 borderColor: 'black',
//                                 transition: '.3s',
//                             },

//                         }}>
//                           <Typography variant='body2' sx={{fontSize: "9px", fontFamily: "Roboto"}}>
//                             Xem Chi Tiết Dự Án
//                           </Typography>
//                           </Button>
//   </CardContent>
// </Card>
<Box sx={{padding: "0 100px", marginBottom: "20px"}}>
  <Box sx={{width: "100%", height: "80vh"}} className="image-box">
    <div className="image-overlay"></div>
    <img src={image} alt="tam anh lighting" className="image-effect" />
    <Button className='image-button' onClick={() => handleNavLink(projectId)} color='primary' sx={{
      position: "absolute",
      left: "50%",
      top: "90%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      color: "white",
  }}>
    <Typography variant='body2' sx={{fontSize: "1.5rem", fontFamily: '"Open Sans", sans-serif'}}>
      {title}
    </Typography>
      </Button>
  </Box>
  <Box sx={{display: "flex", justifyContent: "space-between", gap: "10px"}}>
    <Box sx={{marginTop: "10px"}} className="image-box2">
      <div className="image-overlay2"></div>
      <img src={image} alt="tam anh lighting" className="image-effect2"  />
    </Box>
    <Box sx={{marginTop: "10px"}} className="image-box2">
      <div className="image-overlay2"></div>
      <img src={image} alt="tam anh lighting" className="image-effect2"  />
    </Box> 
    <Box sx={{marginTop: "10px"}} className="image-box2">
      <div className="image-overlay2"></div>
      <img src={image} alt="tam anh lighting" className="image-effect2"  />
    </Box> 
    <Box sx={{marginTop: "10px"}} className="image-box2">
      <div className="image-overlay2"></div>
      <img src={image} alt="tam anh lighting" className="image-effect2" />
    </Box>
  </Box>
</Box>
);


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
      className={`fade-up ${isVisible ? 'visible' : 'visible'}`}
    >
      <ProjectCard projectId={props.projectId} style={{ mgLeft: '0', transform: 'none' }} title={props.title} image={props.itemImage} description={props.itemDesc} />
    </div>
  );
};
  return (
    <>
        <div className="layer" style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0'}}></div>
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
                                <Typography variant="h3" sx={{ fontFamily: "Roboto", fontWeight: "bold", color: "white", fontSize: {xs: "1.2rem", md: "3.5rem"} }}>Dự Án</Typography>
                              </div>
                            </div>
                         </div>
        <Box sx={{
                    marginTop: {
                        xs: "65px",
                        sm: "70px",
                        md: "75px",
                        lg: "80px",
                    },
                    position: 'relative',
                    zIndex: 80,
                    display: 'flex',
                    flexDirection: {
                      xs: 'column',
                      sm: 'column',
                      md: 'row',
                    },
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    gap: '20px'}}>
                      <Grid container spacing={1}>
                      {
                        isLoading === false && data?.data.length > 0 &&
                        data.data.map((item, index) => (
                          <Grid item key={index} xs={12} sm={12} md={12}>
                            <FadeUpSection projectId={item._id} title={item.name} itemImage={item.image} itemDesc={item.description} />
                          </Grid>
                        ))
                      }
                      </Grid>
                    </Box>
    </>
  )
}
