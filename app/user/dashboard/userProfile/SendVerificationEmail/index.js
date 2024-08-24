import React, { useEffect, useState } from "react";
import axios from "axios";
import crypto from "crypto";
import { useAuth } from "@/context/AuthContext";
import { MdOutlineVerified } from "react-icons/md";
import { UserBtn } from "../common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appConfig from "@/config";

const SendVerificationEmail = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const generateToken = () => {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
  };

  const handleSendVerificationEmail = async () => {
    setLoading(true);
    try {
      const token = generateToken();

      const response = await axios.post(
        `/${appConfig.basePath}/user/auth/emailverification`,
        {
          token,
          user: user,
        }
      );

      if (response.status === 200) {
        toast.success("Verification email sent");
        setEmailSent(true);
      } else {
        toast.error("Failed to send verification email");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, [user]);

  if (!user || !user.email) {
    return <h1>Loading...</h1>;
  }

  if (user.verified_email) {
    return (
      <div className="user-details flex-row items-center complete ">
        <div className="text-green-700">
          <MdOutlineVerified />
        </div>
        <p className="text-base font-medium">Email is verified</p>
      </div>
    );
  }

  return (
    <div className="user-details incomplete">
      <div className="flex items-center gap-1 w-full">
        <div className="text-gray-700">
          <MdOutlineVerified />
        </div>
        <h1 className="text-base font-others font-bold">
          Email Is Not Verified
        </h1>
      </div>

      <UserBtn
        handler={handleSendVerificationEmail}
        text=" Verify Email"
        loading={loading}
        disabled={loading || emailSent}
      />
    </div>
  );
};

export default SendVerificationEmail;
