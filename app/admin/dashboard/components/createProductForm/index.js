import { useState } from "react";

import Button from "@/common/button";
import { fields } from "./productFields";
import { handleSubmit } from "../../createproduct/handler";
import { ImageManipulator } from "./ImageManipulator";

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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(
          formData,
          isUpdating,
          adminId,
          setIsLoading,
          setErrors,
          resetForm
        );
      }}
      className="bg-slate-400 py-10 px-10 max-w-[800px] w-full rounded flex flex-col gap-5"
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
          </div>

          {errors.map(
            (error) =>
              error.field === field.name && (
                <div key={error.message}>{error.message}</div>
              )
          )}
        </div>
      ))}
      <ImageManipulator formData={formData} setFormData={setFormData} />
      <Button type="submit" isLoading={isLoading}>
        {buttonText}
      </Button>
    </form>
  );
};

export default CreateProductForm;
