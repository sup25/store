"use client";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   *
   * @param {Object | null} userData
   * @param {String} token
   * @param {Boolean} setToLocal
   * @example
   * setUserStore({user}, 'token') //login
   * setUserStore(null, null, false) //logout
   */
  const setUserStore = (
    userData,
    accessToken,
    refreshToken,
    setToLocal = true
  ) => {
    setUser(userData);
    if (setToLocal) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      localStorage.removeItem("accessToken", accessToken);
      localStorage.removeItem("refreshToken", refreshToken);
    }
  };

  return (
    <AuthContext.Provider value={{ setUserStore, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
