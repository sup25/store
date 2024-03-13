"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/loginuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        const { token } = userData.response;
        login(userData.response);
        console.log("current user", userData.response);
        localStorage.setItem("token", token);
        router.push("/");
      } else {
        console.error("Failed to login");
      }
    } catch (error) {
      console.error("Error logging user:", error.message);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="flex w-full flex-col justify-center items-center gap-10 pb-20 ">
          <h2 className="text-2xl uppercase font-bold">Login</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-400 py-10 px-10 md:w-1/2 w-full rounded flex flex-col gap-5  "
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="py-2 px-2 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-lg font-semibold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="py-2 px-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-bold flex items-center justify-center w-fit py-2 px-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
