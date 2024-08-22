import { useState } from "react";
import Button from "@/common/button";
import { fields } from "./productFields";
import { handleSubmit } from "../../createproduct/handler";
import { ImageUploader } from "./ImageUploader";
import uploadImageInCloudinary from "./ImageUploader/uploadImageInCloudinary";

const CreateProductForm = ({
  resetForm,
  formData,
  setFormData,
  onChange,
  buttonText,
  adminId,
  isUpdating,
}) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const uploadedImages = [];
      for (const image of formData.images) {
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
      }

      const updatedFormData = {
        ...formData,
        images: uploadedImages,
      };
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      await handleSubmit(
        updatedFormData,
        isUpdating,
        adminId,
        setIsLoading,
        setErrors,
        resetForm
      );
    } catch (error) {
      console.error("Error uploading images:", error);
      setErrors([{ field: "images", message: "Failed to upload images" }]);
    } finally {
      setIsLoading(false);
    }
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
                className={`py-2 px-2 w-full font-others ${
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
                className="py-2 px-2 font-others w-full"
                rows="4"
              />
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
      <ImageUploader formData={formData} setFormData={setFormData} />
      <Button type="submit" isLoading={isLoading}>
        {buttonText}
      </Button>
    </form>
  );
};

export default CreateProductForm;
