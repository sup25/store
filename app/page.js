"use client";
import React from "react";

import Hero from "@/components/hero";

import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/utils/axiosClient";

export default function Home() {
  const { user } = useAuth();

  const privateReq = async (user) => {
    const res = await axiosClient.get(`/api/v1/user/auth/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(res);
  };
  return (
    <div className="md:flex md:flex-row flex-col flex items-center justify-center ">
      <Hero />
      <div onClick={() => privateReq(user)}>Test</div>
    </div>
  );
}
