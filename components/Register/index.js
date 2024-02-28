"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "@/config/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { app } from "@/config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    displayName: "",
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
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
      });

      console.log("User registered:", userCredential.user);
      await signOut(auth);
      await addUserToFirestore(
        userCredential.user.uid,
        formData.displayName,
        formData.email
      );

      toast.success("User registered successfully");

      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error("Error registering user");
    } finally {
    }
  };
  const addUserToFirestore = async (userId, displayName, email) => {
    try {
      const usersCollectionRef = collection(firestore, "users");
      await addDoc(usersCollectionRef, {
        userId,
        displayName,
        email,
      });
      console.log("User added to Firestore");
    } catch (error) {
      console.error("Error adding user to Firestore:", error.message);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="flex w-full flex-col justify-center items-center gap-10 pb-20 ">
          <h2 className="text-2xl uppercase font-bold">Register</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-400 py-10 px-10 md:w-1/2 w-full rounded flex flex-col gap-5  "
          >
            <div className="flex flex-col gap-2  ">
              <label htmlFor="username " className="text-lg font-semibold">
                Username:
              </label>

              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                required
                className="py-2 px-2 w-full"
              />
            </div>
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
