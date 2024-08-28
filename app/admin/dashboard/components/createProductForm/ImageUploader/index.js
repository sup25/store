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
        onChange={(event) => {
          setUploading(true);
          setImageAdded(true);
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
    </div>
  );
};
