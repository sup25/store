import { useEffect, useState } from "react";
import { handleDeleteImage, handleImageUpload } from "./handler";
import Spinner from "@/common/spinner";

export const ImageUploader = ({ formData, setFormData }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(formData.images || []);
  const [removing, setRemoving] = useState(false);
  const [imageAdded, setImageAdded] = useState(selectedFiles.length > 0);

  useEffect(() => {
    setSelectedFiles(formData.images || []);
    setImageAdded((formData.images || []).length > 0);
  }, [formData.images]);

  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
  const MIN_FILE_SIZE_BYTES = 20 * 1024;
  const MAX_WIDTH = 4000;
  const MAX_HEIGHT = 4000;

  const handleFileValidation = (file) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File size should not exceed ${MAX_FILE_SIZE_MB} MB.`;
    }

    if (file.size < MIN_FILE_SIZE_BYTES) {
      return `File size should be at least ${MIN_FILE_SIZE_BYTES / 1024} KB.`;
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
          resolve(
            `Image dimensions should not exceed ${MAX_WIDTH}x${MAX_HEIGHT} pixels.`
          );
        } else {
          resolve(null);
        }
      };
    });
  };

  const handleFileChange = async (event) => {
    setUploading(true);
    const files = Array.from(event.target.files);
    const validFiles = [];
    const errorMessages = [];

    for (const file of files) {
      const errorMessage = await handleFileValidation(file);
      if (errorMessage) {
        errorMessages.push({ name: file.name, message: errorMessage });
      } else {
        validFiles.push(file);
      }
    }

    if (errorMessages.length > 0) {
      alert(
        errorMessages
          .map((err) => `Error with file ${err.name}: ${err.message}`)
          .join("\n")
      );
    }

    if (validFiles.length > 0) {
      handleImageUpload(
        { target: { files: validFiles } },
        selectedFiles,
        setSelectedFiles,
        setFormData
      ).finally(() => setUploading(false));
    } else {
      setUploading(false);
    }
  };

  const buttonClass = () => {
    if (uploading || selectedFiles.length === 6) {
      return "bg-gray-500 text-sm text-white font-others py-2 px-4 rounded-md transition duration-300 cursor-not-allowed w-[150px] flex items-center justify-center";
    }
    if (imageAdded) {
      return "bg-green-500 cursor-pointer  text-sm text-white font-others py-2 px-4 rounded-md transition duration-300 hover:bg-green-600 w-[150px] flex items-center justify-center";
    }
    return "cursor-pointer font-others text-sm bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 w-[150px] flex items-center justify-center";
  };

  const buttonText = () => {
    if (uploading) {
      return <Spinner />;
    }
    if (imageAdded) {
      return "Add More";
    }
    return "Upload Image";
  };

  return (
    <div className="flex items-center flex-col gap-2">
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 bg-black bg-opacity-10 px-2 py-4 rounded-md">
          {selectedFiles.map((file, index) => (
            <div key={file.id || index} className="relative">
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
                  className="text-white font-others cursor-pointer border py-1 px-1 hover:border-secondary transition ease-in-out duration-300 flex items-center justify-center w-[100px]"
                  disabled={removing}
                >
                  {removing ? <Spinner /> : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <label htmlFor="imageInput" className={buttonClass()}>
        {buttonText()}
      </label>
      <input
        type="file"
        accept="image/*"
        id="imageInput"
        name="imageInput"
        multiple
        onChange={handleFileChange}
        className="hidden"
        disabled={selectedFiles.length === 6 || uploading}
      />
    </div>
  );
};
