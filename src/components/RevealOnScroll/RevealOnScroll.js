import React, { useEffect, useRef, useState } from "react";
import "animate.css/animate.min.css";

const RevealOnScroll = ({ children, delay = 0 }) => {
  const containerRef = useRef(null);
  const [visibleIndices, setVisibleIndices] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setVisibleIndices((prevIndices) => [...prevIndices, index]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const container = containerRef.current;
    if (container) {
      const childrenArray = Array.from(container.children);
      childrenArray.forEach((child, index) => {
        observer.observe(child);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`reveal-item ${
            visibleIndices.includes(index)
              ? `animate__animated animate__fadeInUp animate__delay-${delay}s`
              : ""
          }`}
          style={{ opacity: visibleIndices.includes(index) ? 1 : 0 }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default RevealOnScroll;
