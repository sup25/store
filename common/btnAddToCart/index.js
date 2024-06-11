import React from "react";

import axios from "axios";

const BtnAddToCart = ({ product, quantity, showLoginPopup, user }) => {
  const proceedAddToCart = async (e) => {
    e.preventDefault();
  };
  const handleClick = (e) => {
    if (!user) {
      showLoginPopup();
    } else {
      proceedAddToCart(e);
    }
  };

  return (
    <div
      className="w-full cursor-pointer flex items-center justify-center px-2 py-2 bg-btn hover:bg-primary text-white font-bold text-lg transition duration-150 ease-out hover:ease-in"
      onClick={handleClick}
    >
      Add to cart
    </div>
  );
};

export default BtnAddToCart;
