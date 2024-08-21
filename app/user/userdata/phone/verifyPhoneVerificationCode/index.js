"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserBtn } from "../../common";
import appConfig from "@/config";

const VerifyPhoneVerificationCode = ({ phoneNumber }) => {
  const { user, updateUserPhone } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const verifyCode = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/${appConfig.basePath}/user/auth/phoneverification`,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-1 flex flex-col gap-2 w-full">
      <input
        type="number"
        placeholder="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="py-1 px-1 font-others"
      />

      <UserBtn handler={verifyCode} text="verify Code" loading={loading} />
    </div>
  );
};
export default VerifyPhoneVerificationCode;
