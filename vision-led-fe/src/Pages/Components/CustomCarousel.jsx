import React, { useState, useRef, useEffect } from 'react';
import './globalComponents.css';
import BtnSeeMore from './btnSeeMore';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VerticalCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef(0);
  const currentX = useRef(0);
  const threshold = 50; // Minimum swipe distance for horizontal movement
  const containerRef = useRef(null);

  // Handle swipe (mobile and pointer devices)
  const handlePointerDown = (e) => {
    startX.current = e.clientX || e.touches[0].clientX;
  };

  const handlePointerMove = (e) => {
    currentX.current = e.clientX || (e.touches && e.touches[0]?.clientX);
  };

  const handlePointerUp = () => {
    const diffX = currentX.current - startX.current;

    if (diffX > threshold) {
      // Swipe right
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (diffX < -threshold) {
      // Swipe left
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
    }
  };

  // Handle mouse wheel (PC)
  const handleWheel = (e) => {
    e.preventDefault(); // Ngăn cuộn trang khi sử dụng con lăn trong vùng carousel
    if (e.deltaY > 0) {
      // Scroll down
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
    } else {
      // Scroll up
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const navigate = useNavigate();
  const handleNavLink = (collectionId) => {
    navigate(`/products/${collectionId}`);
  };

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
    <div
      className="carousel-container"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {items ? items?.map((item, index) => (
        <div
          key={index}
          className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
          style={{
            transform: `translateY(${(index - activeIndex) * 100}%)`,
            transition: 'transform 0.5s ease',
          }}
        >
          <div style={{}}>
            <img src={item.image} alt={item.title} draggable="false" />
            <div style={{ height: "100vh" }}>
              <div style={insideStyles}>
                <Typography variant="h4" sx={{fontFamily: "'Times New Roman', Times, serif", color: "black"}}>{item.name}</Typography>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <BtnSeeMore onClick={() => handleNavLink(index)} styles={{
                    fontFamily: "'Times New Roman', Times, serif"
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )) : ""}

      {/* Dot Navigation */}
      <div className="dots-container">
        {items.map((_, index) => (
          <div
            key={index}
            className={`dot ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)} // Chuyển đến hình ảnh tương ứng khi click vào dot
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
