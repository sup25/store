import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
export const SocialMedia = () => {
  return (
    <div className="flex justify-between flex-wrap mt-10">
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Store. All Rights Reserved.
      </p>
      <div className="flex justify-center space-x-6 mb-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF
            className="text-white hover:text-secondary transition-colors"
            size={24}
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            className="text-white hover:text-secondary transition-colors"
            size={24}
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter
            className="text-white hover:text-secondary transition-colors"
            size={24}
          />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn
            className="text-white hover:text-secondary transition-colors"
            size={24}
          />
        </a>
      </div>
    </div>
  );
};
