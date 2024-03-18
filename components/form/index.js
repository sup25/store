// Form.js
import React from "react";

/**
 * Form component for rendering a generic form with dynamic fields.
 * @param {Array} fields - Array of objects containing field details.
 * @param {Function} onSubmit - Function to handle form submission.
 * @param {Object} formData - Object containing form data.
 * @param {Function} onChange - Function to handle input changes.
 * @param {Array} errors - Array of error objects.
 * @param {string} buttonText - Text to display on the submit button.
 * @returns {JSX.Element} - Rendered Form component.
 */
const Form = ({ fields, onSubmit, formData, onChange, errors, buttonText }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-400 py-10 px-10 md:w-1/2 w-full rounded flex flex-col gap-5"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <label htmlFor={field.name} className="text-lg font-semibold">
            {field.label}:
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={onChange}
            required={field.required}
            className="py-2 px-2 w-full"
          />

          {errors.map(
            (error) =>
              error.field === field.name && (
                <div key={error.message}>{error.message}</div>
              )
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-primary text-white font-bold flex items-center justify-center w-fit py-2 px-2"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
