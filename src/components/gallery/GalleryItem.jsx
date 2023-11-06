// GalleryItem.js
import React from "react";

const GalleryItem = ({ image, isSelected, index, handleImageSelect }) => {
  return (
    <div
      className={`relative ${
        index === 0 && "col-span-2 row-span-2 "
      } border-2 border-gray-400 rounded-sm`}
    >
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => handleImageSelect(image.id)}
      >
        <img
          src={image.src}
          alt={`Image ${image.id}`}
          className={`w-full h-full ${
            isSelected ? "opacity-50" : "hover:opacity-70"
          }`}
        />
      </div>
      <input
        className="absolute w-6 h-6 top-2 left-2"
        type="checkbox"
        checked={isSelected}
        onChange={() => handleImageSelect(image.id)}
      />
    </div>
  );
};

export default GalleryItem;
