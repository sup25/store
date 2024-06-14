"use client";
import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { handleDeleteImage, handleImageUpload } from "./handler";

export const ImageManipulator = ({ formData, setFormData }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(formData.images);
  const [removing, setRemoving] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="imageInput"
        className={
          uploading || selectedFiles.length === 6
            ? "bg-gray-500 text-white py-2 px-4 rounded-md transition duration-300 cursor-not-allowed w-[150px] flex items-center justify-center"
            : "cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 w-[150px] flex items-center justify-center"
        }
      >
        {uploading ? (
          <CgSpinnerTwo size={30} className="animate-spin" />
        ) : (
          "Upload Image"
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        id="imageInput"
        name="imageInput"
        onChange={(event) => {
          setUploading(true);
          handleImageUpload(
            event,
            selectedFiles,
            setSelectedFiles,
            setFormData
          ).finally(() => setUploading(false));
        }}
        className="hidden"
        disabled={selectedFiles.length === 6 || uploading}
      />

      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 bg-black bg-opacity-10 px-2 py-4 rounded-md">
          {selectedFiles.map((file) => (
            <div key={file.id} className="relative">
              <img
                src={file.original_url}
                alt={`Selected ${file.id}`}
                className="w-[225px] h-[200px] object-cover mt-2"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteImage(
                      file,
                      selectedFiles,
                      setSelectedFiles,
                      setFormData,
                      setRemoving
                    )
                  }
                  className="text-white cursor-pointer border py-1 px-1 hover:border-blue-500 transition ease-in-out duration-300 flex items-center justify-center w-[100px]"
                  disabled={removing}
                >
                  {removing ? (
                    <CgSpinnerTwo size={20} className="animate-spin" />
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
