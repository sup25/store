"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  /**
   *
   * @param {Object | null} userData
   * @param {String} accessToken
   * @param {String} refreshToken
   * @param {Boolean} setToLocal
   * @example
   * setUserStore({user}, 'token') //login
   * setUserStore(null, null, false) //logout
   *
   */

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

  return (
    <AuthContext.Provider value={{ setUserStore, user, admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
