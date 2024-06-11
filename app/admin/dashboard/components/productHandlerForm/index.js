import { useState } from "react";

import { CgSpinnerTwo } from "react-icons/cg";
import { deleteImageFromCloudinary } from "../deleteImageFromCloudinary";
import { handleImageUpload } from "../imageUploadHandler";
import Button from "@/common/button";
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
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

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
                  id={field.name}
                  name={field.name}
                  onChange={(event) => {
                    setUploading(true);
                    handleImageUpload(
                      event,
                      selectedFiles,
                      setSelectedFiles,
                      setFormData
                    ).finally(() => setUploading(false));
                  }}
                  required={field.required}
                  className="hidden"
                  disabled={selectedFiles.length === 6 || uploading}
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
                  onClick={() => {
                    setRemoving(true);
                    deleteImageFromCloudinary(
                      file.public_id,
                      selectedFiles,
                      setSelectedFiles,
                      setFormData
                    ).finally(() => setRemoving(false));
                  }}
                  className="text-white cursor-pointer border py-1 px-1 hover:border-blue-500 transition ease-in-out duration-300 flex items-center justify-center w-[100px]"
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

      <Button type="submit" isLoading={isLoading}>
        {buttonText}
      </Button>
    </form>
  );
};

export default ProductHandlerForm;
