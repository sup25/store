"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const getUserFromStorage = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  const getAdminFromStorage = () => {
    const storedAdmin = sessionStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      setAdmin(null);
    }
  };

  useEffect(() => {
    getUserFromStorage();
    getAdminFromStorage();
    setIsInitializing(false);
  }, []);

  const setUserStore = (
    userData,
    accessToken,
    refreshToken,
    setToLocal = true,
    isAdmin = false
  ) => {
    if (isAdmin) {
      if (userData) {
        setAdmin(userData);
      } else {
        setAdmin(null);
      }
      if (setToLocal) {
        sessionStorage.setItem("adminAccessToken", accessToken);
        sessionStorage.setItem("admin", JSON.stringify(userData));
      } else {
        sessionStorage.removeItem("adminAccessToken");
      }
    } else {
      setUser(userData);
      if (setToLocal) {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
      }
    }
  };

  const updateUserAddress = (newAddress) => {
    const updatedAddresses = [...(user.addresses || []), newAddress];
    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const verifiedUserEmail = () => {
    const updatedUser = { ...user, verified_email: true };
    setUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const updateUserPhone = (phoneNumber) => {
    const updatedUser = { ...user, phone: phoneNumber, verified_phone: true };
    setUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isInitializing,
        setUserStore,
        updateUserPhone,
        updateUserAddress,
        verifiedUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
