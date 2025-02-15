import React from "react";
import Gallery from "../Gallery/Gallery";

const Modal = ({ isOpen, onClose, textContent, images = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-white rounded-lg shadow-lg max-w-lg mx-auto"
        style={{
          width: "90%",
          maxWidth: "920px",
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
      >
        {images.length && (
          <div style={{ width: "100%", height: "35vh" }}>
            <Gallery images={images} />
          </div>
        )}
        <div className="py-12 px-8 md:py-12 md:px-12">
          <button
            onClick={onClose}
            className={`absolute top-2 right-2 focus:outline-none${
              images.length
                ? " text-gray-200 hover:text-gray-300"
                : " text-gray-600 hover:text-gray-800"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="text-md text-gray-800"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {textContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
