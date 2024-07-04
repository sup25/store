"use client";

import axios from "axios";
import { useState } from "react";
import VerifyPhoneVerificationCode from "../verifyPhoneVerificationCode";
import { useAuth } from "@/context/AuthContext";
import { MdOutlineVerified } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendPhoneVerificationCode = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user } = useAuth();
  const sendVerificationCode = async () => {
    const response = await axios.post(
      "/api/v1/user/auth/phoneverification/sendVerificationCode",
      { phoneNumber },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data.message) {
      toast.success("Verification code sent!");
    } else {
      toast.error("Error sending verification code.");
    }
  };
  if (user && user.verified_phone) {
    return (
      <div className="flex items-center gap-1">
        <div className="text-green-700">
          <MdOutlineVerified />
        </div>
        <p className="text-base font-medium">Phone is verified</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Phone Verification</h1>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendVerificationCode}>Send Verification Code</button>
      <VerifyPhoneVerificationCode phoneNumber={phoneNumber} />
    </div>
  );
};
export default SendPhoneVerificationCode;
