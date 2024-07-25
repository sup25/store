import React, { useState } from "react";
import { FaArrowsAltH } from "react-icons/fa";

const ResizableHeader = ({ width, onResize, children }) => {
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    startResizing(e.clientX);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    startResizing(e.touches[0].clientX);
  };

  const startResizing = (startX) => {
    setIsResizing(true);
    const startWidth = width;
    const minWidth = 50;

    const handleMouseMove = (moveEvent) => {
      moveEvent.preventDefault();
      let newWidth = startWidth + moveEvent.clientX - startX;
      if (newWidth < minWidth) {
        newWidth = minWidth;
      }
      onResize(newWidth);
    };

    const handleTouchMove = (moveEvent) => {
      moveEvent.preventDefault();
      let newWidth = startWidth + moveEvent.touches[0].clientX - startX;
      if (newWidth < minWidth) {
        newWidth = minWidth;
      }
      onResize(newWidth);
    };

    const stopResizing = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", stopResizing);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", stopResizing);
  };

  return (
    <div
      style={{
        display: "inline-block",
        width,
        position: "relative",
        touchAction: "none",
      }}
    >
      {children}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          display: "inline-block",
          width: "30px",
          cursor: "col-resize",
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 999,
          backgroundColor: "transparent",
          textAlign: "center",
          lineHeight: "100%",
        }}
      >
        <FaArrowsAltH
          style={{
            color: isResizing ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.2)",
            fontSize: "14px",
          }}
        />
      </div>
    </div>
  );
};

export default ResizableHeader;
