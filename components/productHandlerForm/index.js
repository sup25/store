/**
 * Product Handler Form component for rendering a form with dynamic fields to handle product information.
 * @param {Array} fields - Array of objects containing field details.
 * @param {Function} onSubmit - Function to handle form submission.
 * @param {Object} formData - Object containing form data.
 * @param {Function} onChange - Function to handle input changes.
 * @param {Array} errors - Array of error objects.
 * @param {string} buttonText - Text to display on the submit button.
 * @param {boolean} props.isLoading - Indicates whether the form is in a loading state.
 * @returns {JSX.Element} - Rendered Form component.
 */

import Button from "../button";

const ProductHandlerForm = ({
  fields,
  onSubmit,
  formData,
  onChange,
  errors,
  buttonText,
  isLoading,
  handleFileChange,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-400 py-10 px-10  max-w-[800px] rounded flex flex-col gap-5"
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
                value={formData[field.name]}
                onChange={onChange}
                required={field.required}
                className="py-2 px-2 w-full"
              />
            )}
            {field.type === "file" && (
              <input
                type="file"
                accept="image/*"
                id={field.name}
                name={field.name}
                onChange={handleFileChange}
                required={field.required}
                className="py-2 px-2 w-full"
              />
            )}
            {formData.imagePreview && (
              <img
                src={formData.imagePreview}
                alt="Selected Image"
                className="mt-2 w-20 h-auto"
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

      <Button type="submit" isLoading={isLoading} className="w-[200px]">
        {buttonText}
      </Button>
    </form>
  );
};

export default ProductHandlerForm;
