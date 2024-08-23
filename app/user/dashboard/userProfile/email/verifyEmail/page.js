"use client";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Login from "@/app/login/page";
import appConfig from "@/config";

const VerifyEmailContent = () => {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const { user, verifiedUserEmail } = useAuth();

  const verifyEmail = async () => {
    setLoading(true);
    if (!token) {
      setMessage("Invalid verification link.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `/${appConfig.basePath}/user/auth/confirmtoken?token=${token}`
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        verifiedUserEmail();
      } else {
        setMessage("Email verification failed. Please try again.");
      }
    } catch (error) {
      setMessage("Email verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && !user.verified_email) {
      verifyEmail();
    }
  }, [token, user]);

  useEffect(() => {
    if (user?.verified_email) {
      setMessage("Your email has been verified!");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="font-heading">
          You need to be logged in to verify your email.
        </p>
        <Login isPopup={true} redirectToVerification={true} />
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container items-center justify-center gap-2">
        <p className="text-lg font-heading text-center">Email Verification</p>
        <p className="text-base font-others font-medium text-center">
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
