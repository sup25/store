"use client";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Login from "@/app/login/page";
import appConfig from "@/config";
import LinkWithIcon from "@/common/linkWithIcon";
import { FiArrowRight } from "react-icons/fi";

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
        <p className="font-heading text-2xl mb-4 mx-2">
          You need to be logged in to verify your email.
        </p>
        <Login isPopup={true} redirectToVerification={true} />
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container ">
        <div className="flex items-center w-full justify-center gap-5 flex-col">
          <p className="text-lg font-heading text-center">Email Verification</p>
          <p className="text-2xl font-others font-medium text-center">
            {loading ? "Loading..." : message}
          </p>

          <LinkWithIcon
            label="Back to Profile"
            href="/user/dashboard"
            icon={FiArrowRight}
            iconPosition="right"
          />
        </div>
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
