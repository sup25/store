import React, { useState } from "react";
import axios from "axios";
import crypto from "crypto";
import { useAuth } from "@/context/AuthContext";
import { MdOutlineVerified } from "react-icons/md";
import { CgSpinnerTwo } from "react-icons/cg";

const SendVerificationEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const generateToken = () => {
    console.log(user);
    const token = crypto.randomBytes(32).toString("hex");
    return token;
  };

  const handleSendVerificationEmail = async () => {
    setLoading(true);
    try {
      const token = generateToken();

      const response = await axios.post("/api/v1/user/auth/emailverification", {
        token,
        user: user,
      });

      console.log(response);

      if (response.status === 200) {
        setVerificationStatus("Verification email sent");
      } else {
        setVerificationStatus("Failed to send verification email");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      setVerificationStatus("Failed to send verification email");
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user.email) {
    return <h1>Loading...</h1>;
  }

  if (user.verified_email) {
    return (
      <div className="flex items-center gap-1">
        <div className="text-green-700">
          <MdOutlineVerified />
        </div>
        <p className="text-base font-medium">Email is verified</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <div className="text-gray-700">
          <MdOutlineVerified />
        </div>
        <h1 className="text-base font-medium">Email Is Not Verified</h1>
      </div>
      <p className="text-sm font-medium">
        Click the button below to send a verification email:
      </p>
      <button
        className="px-1 py-1 outline hover:bg-tertiary flex items-center justify-center"
        onClick={handleSendVerificationEmail}
        disabled={loading}
      >
        {loading ? (
          <CgSpinnerTwo size={30} className="animate-spin" />
        ) : (
          "Verify Email"
        )}
      </button>
      {verificationStatus && <p>{verificationStatus}</p>}
    </div>
  );
};

export default SendVerificationEmail;
