"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";

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
   */
  const setUserStore = (
    userData,
    accessToken,
    refreshToken,
    setToLocal = true,
    isAdmin = false
  ) => {
    if (isAdmin) {
      setAdmin(userData);
      if (setToLocal) {
        sessionStorage.setItem("adminAccessToken", accessToken);
      } else {
        sessionStorage.removeItem("adminAccessToken");
      }
    } else {
      setUser(userData);
      if (setToLocal) {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
      } else {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
      }
    }
  };

  const privateReq = async () => {
    try {
      const res = await axiosClient.get(`/api/v1/user/auth/user`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log(res);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("User is not logged in");
        setUserStore(null, null, false);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    privateReq();
  }, []);

  return (
    <AuthContext.Provider value={{ setUserStore, user, admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
