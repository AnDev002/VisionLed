import { Box } from "@mui/material";
import React, { useState } from "react";
import ImageGallery from 'react-image-gallery';
import "./productDetails.css"
export default function SimpleSlider(props) {
  const images = [];
  props?.image?.forEach(element => {
    images.push({ original: element, thumbnail: element })
  });
  const customStyles = {
    gallery: {
      flexDirection: 'column',
    },
    thumbnail: {
      marginTop: '10px', // Adjust the margin as needed
    },
  };

  return (
    <>
      <div className="image-gallery-container">
        <ImageGallery thumbnailPosition={"bottom"} items={images} infinite={true} showFullscreenButton={false} showPlayButton={false} slideDuration={4} useBrowserFullscreen={false} showNav={true} disableThumbnailSwipe={false} originalHeight={'100%'} />
      </div>
    </>
  );
}
