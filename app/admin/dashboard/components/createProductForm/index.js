"use client";
import { useEffect, useState } from "react";
import Button from "@/common/button";
import { fields } from "./productFields";
import { handleSubmit } from "../../createproduct/handler";
import { ImageUploader } from "./ImageUploader";
import uploadImageInCloudinary from "./ImageUploader/uploadImageInCloudinary";
import { useRouter } from "next/navigation";
import withAuthAdmin from "@/app/admin/utils/adminHoc/page";

const CreateProductForm = ({
  resetForm,
  formData,
  setFormData,
  onChange,
  buttonText,
  adminId,
  isUpdating,
  searchParams,
}) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handle = searchParams.get("handle");
    if (!handle) {
      resetForm();
    }
  }, [searchParams, resetForm]);
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const uploadedImages = [];
      for (const image of formData.images) {
        if (image.file) {
          const uploadFormData = new FormData();
          const uploadResult = await uploadImageInCloudinary(
            image.file,
            uploadFormData
          );
          if (uploadResult) {
            uploadedImages.push({
              ...image,
              original_url: uploadResult.secure_url,
              public_id: uploadResult.public_id,
              thumbnail: uploadResult.secure_url,
            });
          }
        } else {
          uploadedImages.push(image);
        }
      }

      const updatedFormData = {
        ...formData,
        images: uploadedImages,
      };

      await handleSubmit(
        updatedFormData,
        isUpdating,
        adminId,
        setIsLoading,
        setErrors,
        resetForm,
        router
      );
    } catch (error) {
      console.error("Error uploading images:", error);
      setErrors([{ field: "images", message: "Failed to upload images" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearImages = () => {
    alert("All uploaded images will be cleared.");
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [],
    }));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-slate-400 py-10 px-10 max-w-[800px] w-full rounded flex flex-col gap-5"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <label
            htmlFor={field.name}
            className="text-lg font-others font-semibold"
          >
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
                className="py-2 px-2 font-others w-full"
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
                className="py-2 px-2 font-others w-full"
                rows="4"
              />
            )}
          </div>

          {errors.map(
            (error) =>
              error.field === field.name && (
                <div
                  key={error.message}
                  className="text-red-700 font-others font-bold "
                >
                  {error.message}
                </div>
              )
          )}
        </div>
      ))}

      {isUpdating && formData.images.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-lg font-others font-semibold">
            Uploaded Images:
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.images.map((image) => (
              <div key={image.public_id} className="relative">
                <img
                  src={image.original_url || image.thumbnail}
                  alt={`Uploaded ${image.public_id}`}
                  className="w-[225px] h-[200px] object-cover"
                />
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={handleClearImages}
            className="mt-2 bg-red-500 text-others hover:bg-red-600 w-fit text-white"
          >
            Clear All Images
          </Button>
        </div>
      )}

      <ImageUploader formData={formData} setFormData={setFormData} />
      {errors.map(
        (error) =>
          error.field === "images" && (
            <div
              key={error.message}
              className="text-red-700 font-others font-bold"
            >
              {error.message}
            </div>
          )
      )}

      <Button type="submit" isLoading={isLoading}>
        {buttonText}
      </Button>
    </form>
  );
};

export default withAuthAdmin(CreateProductForm);
