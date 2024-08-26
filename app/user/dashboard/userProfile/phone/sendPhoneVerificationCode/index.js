"use client";

import { useEffect, useRef, useState } from "react";
import VerifyPhoneVerificationCode from "../verifyPhoneVerificationCode";
import { useAuth } from "@/context/AuthContext";
import { MdOutlineVerified } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserBtn } from "../../common";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@/app/config/firebase";
import appConfig from "@/config";
import axios from "axios";

const SendPhoneVerificationCode = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const { user } = useAuth();
  const recaptchaVerifierRef = useRef(null);

  const isPhoneVerified = Boolean(user?.verified_phone);

  useEffect(() => {
    if (!isPhoneVerified && auth && !recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
      } catch (error) {
        console.error("Recaptcha initialization failed:", error);
      }
    }

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, [auth, isPhoneVerified]);

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
        `/${appConfig.basePath}/user/auth/phoneverification/checkPhoneNumberInUse`,
        {
          phoneNumber,
          userId: user.id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      const appVerifier = recaptchaVerifierRef.current;
      if (!appVerifier) {
        toast.error("Recaptcha not initialized. Please try again.");
        return;
      }

      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(result);
      setSuccess(true);
      toast.success("Verification code sent!");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error sending verification code.");
      }
      console.error("Error sending verification code");
    } finally {
      setLoading(false);
    }
  };

  if (user && user.verified_phone) {
    return (
      <div className="user-details complete flex-row items-center">
        <div className="text-green-700">
          <MdOutlineVerified />
        </div>
        <p className="text-base font-medium">Phone is verified</p>
      </div>
    );
  }

  return (
    <div className="user-details incomplete mt-1">
      <h2 className="font-others font-bold">Phone Verification</h2>
      <div className="flex flex-col gap-3 w-full">
        <input
          type="text"
          placeholder="+977 "
          className="py-1 px-1 font-others border-2 outline-none hover:border-secondary transition duration-300 ease-in-out"
          value={phoneNumber}
          onChange={handleInputChange}
        />

        <UserBtn
          handler={sendVerificationCode}
          text="Verify Phone"
          loading={loading}
        />
        {success ? (
          <VerifyPhoneVerificationCode
            phoneNumber={phoneNumber}
            confirmationResult={confirmationResult}
          />
        ) : (
          ""
        )}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SendPhoneVerificationCode;
