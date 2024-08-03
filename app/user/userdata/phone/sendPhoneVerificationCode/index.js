"use client";
import axios from "axios";
import { useState } from "react";
import VerifyPhoneVerificationCode from "../verifyPhoneVerificationCode";
import { useAuth } from "@/context/AuthContext";
import { MdOutlineVerified } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserBtn } from "../../common";
import appConfig from "@/config";

const SendPhoneVerificationCode = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleInputChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\d+]/g, "");
    setPhoneNumber(sanitizedValue);
  };

  const sendVerificationCode = async () => {
    const strippedPhoneNumber = phoneNumber.replace(/^\+\d{1,3}/, "");

    if (strippedPhoneNumber.length !== 10) {
      toast.error("Add correct phone number");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `/${appConfig.basePath}/user/auth/phoneverification/sendVerificationCode`,
        { phoneNumber },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccess(response.data.message);
      if (response.data.message) {
        toast.success("Verification code sent!");
      } else {
        toast.error("Error sending verification code.");
      }
    } catch (error) {
      toast.error("Error sending verification code.");
    } finally {
      setLoading(false);
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
    <div className="flex flex-col w-full mt-1">
      <h2 className="my-1">Phone Verification</h2>
      <div className="flex flex-col gap-2 w-full">
        <input
          type="text"
          placeholder="+977 "
          className="py-1 px-1"
          value={phoneNumber}
          onChange={handleInputChange}
        />

        <UserBtn
          handler={sendVerificationCode}
          text="Verify Phone"
          loading={loading}
        />
        {success ? (
          <VerifyPhoneVerificationCode phoneNumber={phoneNumber} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SendPhoneVerificationCode;
