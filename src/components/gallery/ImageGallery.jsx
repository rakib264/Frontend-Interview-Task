// Gallery.js
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import GalleryItem from "./GalleryItem";

const Gallery = ({ images, setImages }) => {
  // State for selected images
  const [selectedImages, setSelectedImages] = useState([]);
  const [firstPositionFilled, setFirstPositionFilled] = useState(false);

  // Handle image selection
  const handleImageSelect = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(
        selectedImages.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  // Handle image drop
  const handleDrop = (event) => {
    // Check if the first position is already filled
    if (!firstPositionFilled) {
      setFirstPositionFilled(true);
    }

    // Handle the drop event as needed
    const { oldIndex, newIndex } = event;
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(oldIndex, 1);
    updatedImages.splice(newIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-2">Image Gallery</h1>
      <div className="w-full flex items-center justify-between mx-auto my-3">
        <div className="flex items-center gap-4">
          <input
            className="w-6 h-6"
            type="checkbox"
            checked={selectedImages.length > 0}
          />
          <span className="text-2xl font-bold">
            {selectedImages.length} Files Selected
          </span>
        </div>
        <button
          className="text-red-500 text-2xl mx-2"
          onClick={() => {
            setImages(
              images.filter((image) => !selectedImages.includes(image.id))
            );
            setSelectedImages([]);
          }}
        >
          Delete Files
        </button>
      </div>

      <ReactSortable
        list={images}
        setList={setImages}
        animation={150}
        className="mx-auto grid gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gridAutoRows: "150px",
        }}
        onEnd={handleDrop}
      >
        {images.map((image, index) => (
          <GalleryItem
            key={image.id}
            index={index}
            image={image}
            isSelected={selectedImages.includes(image.id)}
            handleImageSelect={handleImageSelect}
          />
        ))}
      </ReactSortable>
    </div>
  );
};

export default Gallery;
