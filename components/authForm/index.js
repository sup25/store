import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "../button";

/**
 * Auth Form component for rendering a generic form with dynamic fields.
 * @param {Array} fields - Array of objects containing field details.
 * @param {Function} onSubmit - Function to handle form submission.
 * @param {Object} formData - Object containing form data.
 * @param {Function} onChange - Function to handle input changes.
 * @param {Array} errors - Array of error objects.
 * @param {string} buttonText - Text to display on the submit button.
 * @param {boolean} props.isLoading - Indicates whether the form is in a loading state.
 * @returns {JSX.Element} - Rendered Form component.
 */
const AuthForm = ({
  fields,
  onSubmit,
  formData,
  onChange,
  errors,
  buttonText,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-400 py-10 px-10 md:w-[600px] w-full rounded flex flex-col gap-5"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <label htmlFor={field.name} className="text-lg font-semibold">
            {field.label}:
          </label>
          <div className="relative">
            <input
              type={
                field.type === "password" && showPassword ? "text" : field.type
              }
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={onChange}
              required={field.required}
              className="py-2 px-2 w-full"
            />
            {field.type === "password" && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
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

      <Button
        type="submit"
        isLoading={isLoading}
        className="bg-primary text-white font-bold flex items-center justify-center w-fit py-2 px-2"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default AuthForm;
