"use client";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Login from "@/app/login/page";

const VerifyEmailContent = () => {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const verifyEmail = async () => {
    setLoading(true);
    if (!token) {
      setMessage("Invalid verification link.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `/api/v1/user/auth/confirmtoken?token=${token}`
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Email verification failed. Please try again.");
      console.error("Error verifying email:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      verifyEmail();
    }
  }, [token, user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <p>You need to be logged in to verify your email.</p>
        <Login isPopup={true} redirectToVerification={true} />
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container items-center justify-center gap-2 ">
        <p className="text-lg font-medium text-center">Email Verification</p>
        <p className="text-base font-medium text-center">
          {loading ? "Loading..." : message}
        </p>
      </div>
    </div>
  );
};

const VerifyEmail = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmail;
