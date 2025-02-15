import React, { useState, useRef, useEffect } from "react";
import CarouselImage from "./CarouselImage";

const CarouselOnScroll = ({ images }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);

    // Disable text selection while dragging
    document.body.style.userSelect = "none";
    // Stop auto-scrolling when user starts dragging
    clearInterval(autoScrollIntervalRef.current);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjusted for smoother scroll speed
    requestAnimationFrame(() => {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    });
  };

  const stopDragging = () => {
    setIsDragging(false);
    document.body.style.userSelect = "auto";
    startAutoScroll();
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    clearInterval(autoScrollIntervalRef.current);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // Lower multiplier for mobile
    requestAnimationFrame(() => {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    startAutoScroll();
  };

  // Function to start the auto-scroll
  const startAutoScroll = () => {
    clearInterval(autoScrollIntervalRef.current);
    autoScrollIntervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
      }
    }, 10);
  };

  // Function to stop the auto-scroll
  const stopAutoScroll = () => {
    clearInterval(autoScrollIntervalRef.current);
  };

  // Start auto-scrolling when the component mounts
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <div
      ref={carouselRef}
      className="carousel-container"
      style={{
        display: "flex",
        overflowX: "scroll",
        overflowY: "hidden",
        gap: "16px",
        paddingTop: "128px",
        paddingBottom: "128px",
        marginTop: "-128px",
        marginBottom: "-128px",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((image, index) => (
        <CarouselImage key={index} image={image} />
      ))}
    </div>
  );
};

export default CarouselOnScroll;
