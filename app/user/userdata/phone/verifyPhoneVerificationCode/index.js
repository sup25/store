"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyPhoneVerificationCode = ({ phoneNumber }) => {
  const { user, updateUserPhone } = useAuth();
  const [code, setCode] = useState("");

  const verifyCode = async () => {
    try {
      const response = await axios.post(
        "/api/v1/user/auth/phoneverification",
        {
          phoneNumber,
          code,
          userId: user.id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.message) {
        toast.success("Phone number verified!");
        updateUserPhone(phoneNumber);
      } else {
        toast.error("Invalid code.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("Error verifying code.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="py-1 px-1"
      />
      <button onClick={verifyCode}>Verify Code</button>
    </div>
  );
};
export default VerifyPhoneVerificationCode;
