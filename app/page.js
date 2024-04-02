"use client";
import React from "react";

import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/utils/axiosClient";
import Hero from "./hero/page";

export default function Home() {
  const { user } = useAuth();

  const privateReq = async () => {
    try {
      const res = await axiosClient.get(`/api/v1/user/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(res);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("User is not logged in");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  return (
    <div className="md:flex md:flex-row flex-col flex items-center justify-center ">
      <Hero />
      <div onClick={() => privateReq(user)}>Test</div>
    </div>
  );
}
