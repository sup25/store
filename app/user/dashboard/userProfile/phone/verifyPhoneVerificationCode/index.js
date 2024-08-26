"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserBtn } from "../../common";
import appConfig from "@/config";

const VerifyPhoneVerificationCode = ({ phoneNumber, confirmationResult }) => {
  const { user, updateUserPhone } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyCode = async () => {
    try {
      setLoading(true);

      if (!confirmationResult) {
        toast.error("Confirmation result not found.");
        return;
      }

      const result = await confirmationResult.confirm(code);

      if (result.user) {
        toast.success("Phone number verified!");

        const response = await axios.post(
          `/${appConfig.basePath}/user/auth/phoneverification`,
          {
            phoneNumber,
            userId: user.id,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response);

        if (response.data.returnedData) {
          updateUserPhone(phoneNumber);
        } else {
          toast.error("Failed to update phone number on the server.");
        }
      } else {
        toast.error("Invalid code.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("Error verifying code. Please check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-1 flex flex-col gap-2 w-full">
      <input
        type="text"
        placeholder="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="py-1 px-1 font-others border-2 outline-none hover:border-secondary transition duration-300 ease-in-out"
      />

      <UserBtn handler={verifyCode} text="Verify Code" loading={loading} />
    </div>
  );
};

export default VerifyPhoneVerificationCode;
