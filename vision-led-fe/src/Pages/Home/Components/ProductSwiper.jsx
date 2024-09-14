import { Box } from "@mui/material";
import React, { useState } from "react";
import ImageGallery from 'react-image-gallery';
import "../home.css"
export default function SimpleSlider(props) {
  const images = [];
  props?.image?.forEach(element => {
    images.push({ original: element, thumbnail: element })
  });
  return (
    <>
      <div className="image-gallery-container-h" style={{marginTop: '0px'}}>
        <ImageGallery items={images} autoPlay={false} slideDuration={0}  showBullets={true} showThumbnails={false} infinite={true} showFullscreenButton={false} showPlayButton={false} showNav={false} />
      </div>
    </>
  );
}
