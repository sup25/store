"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, isInitializing } = useAuth();

  const fetchCartData = async () => {
    if (!user) return;

    try {
      const response = await axios.get(`/api/v1/user/products/${user.id}`);
      const data = response.data.returnedData;

      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (!isInitializing && user) {
      fetchCartData();
    }
  }, [isInitializing, user]);

  const updateCartItems = (updatedItems) => {
    setCartItems(updatedItems);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider
      value={{ cartItems, updateCartItems, getCartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
