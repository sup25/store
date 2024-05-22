import { useState } from "react";
import Button from "../button";
import axios from "axios";
import { generateSignature } from "@/utils/generateSignature";
import UploadImage from "../uploadImage";

const ProductHandlerForm = ({
  fields,
  onSubmit,
  formData,
  setFormData,
  onChange,
  errors,
  buttonText,
  isLoading,
}) => {
  const [selectedFiles, setSelectedFiles] = useState(formData.images);

  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    const newSelectedFiles = [];

    for (let file of files.slice(0, 6 - selectedFiles.length)) {
      const uploadFormData = new FormData();
      try {
        const uploadResult = await UploadImage(file, uploadFormData);
        console.log(uploadResult);
        if (uploadResult) {
          newSelectedFiles.push({
            file,
            id: Date.now() + Math.random(),
            original_url: uploadResult.secure_url,
            thumbnail: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const updatedSelectedFiles = [...selectedFiles, ...newSelectedFiles];
    setSelectedFiles(updatedSelectedFiles);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: updatedSelectedFiles,
    }));
  };

  const handleRemoveImage = async (public_id) => {
    try {
      const timestamp = Math.floor(Date.now() / 1000);

      const paramsToSign = {
        public_id,
        timestamp,
      };

      const response = await generateSignature(paramsToSign);
      const signature = response.data.returnedData.signature;

      const requestData = {
        params: {
          public_id,
          signature,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          timestamp,
        },
      };

      const deleteResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`,
        null,
        requestData
      );

      console.log("Image deleted successfully from Cloudinary", deleteResponse);
      const updatedSelectedFiles = selectedFiles.filter(
        (file) => file.public_id !== public_id
      );
      setSelectedFiles(updatedSelectedFiles);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: updatedSelectedFiles,
      }));
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-400 py-10 px-10 max-w-[800px] rounded flex flex-col gap-5"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <label htmlFor={field.name} className="text-lg font-semibold">
            {field.label}:
          </label>
          <div className="relative">
            {field.type === "text" && (
              <input
                type="text"
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={onChange}
                required={field.required}
                className={`py-2 px-2 w-full ${
                  errors.some((error) => error.field === field.name)
                    ? "border-red-500"
                    : ""
                }`}
              />
            )}
            {field.type === "textarea" && (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={onChange}
                required={field.required}
                className="py-2 px-2 w-full"
                rows="4"
              />
            )}
            {field.type === "file" && (
              <div className="flex items-center gap-2">
                <label
                  htmlFor={field.name}
                  className={
                    selectedFiles.length === 6
                      ? "bg-gray-500 text-white py-2 px-4 rounded-md transition duration-300 cursor-not-allowed"
                      : "cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
                  }
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id={field.name}
                  name={field.name}
                  onChange={handleFileInputChange}
                  required={field.required}
                  className="hidden"
                  disabled={selectedFiles.length === 6}
                />
              </div>
            )}
          </div>
          {errors.map(
            (error) =>
              error.field === field.name && (
                <div key={error.message}>{error.message}</div>
              )
          )}
        </div>
      ))}

      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 bg-black/10 px-2 py-4 rounded-md">
          {selectedFiles.map((file) => (
            <div key={file.id} className="relative">
              <img
                src={file.original_url}
                alt={`Selected ${file.id}`}
                className="w-[225px] h-[200px] bg-cover mt-2"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(file.public_id)}
                  className="text-white cursor-pointer border py-1 px-1 hover:border-blue-500 transition ease-in-out duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button type="submit" isLoading={isLoading}>
        {buttonText}
      </Button>
    </form>
  );
};

export default ProductHandlerForm;
