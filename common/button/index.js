import React from "react";

/**
 * Button component for rendering a customizable button element.
 * @param {Object} props - The properties of the button component.
 * @param {Function} props.onClick - Function to handle click events.
 * @param {boolean} props.isLoading - Indicates whether the button is in a loading state.
 * @param {boolean} props.disabled - Indicates whether the button is disabled.
 * @param {string} props.type - Type of the button (e.g., "button", "submit", "reset").
 * @param {string} props.className - Extra class names to be added to the button.
 * @param {React.ReactNode} props.children - Content to be displayed inside the button.
 * @returns {JSX.Element} - Rendered button component.
 * @example
 * // Example usage:
 * import React, { useState } from 'react';
 * import Button from './Button';
 *
 * const MyComponent = () => {
 *   const [isLoading, setIsLoading] = useState(false);
 *
 *   const handleClick = () => {
 *     setIsLoading(true);
 *     setTimeout(() => {
 *       setIsLoading(false);
 *     }, 2000);
 *   };
 *
 *   return (
 *     <div>
 *       <Button onClick={handleClick} isLoading={isLoading} className="my-custom-class">
 *         {isLoading ? "Loading..." : "Click Me"}
 *       </Button>
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */

const Button = ({
  onClick,
  isLoading,
  disabled,
  children,
  type,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      type={type}
      className={`py-2 px-4 w-full font-others rounded-md bg-primary min-h-10 hover:bg-secondary transition duration-300 ease-in-out  text-white font-semibold flex items-center justify-center ${
        isLoading || disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-blue-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          ></circle>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
