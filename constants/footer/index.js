"use client";
import React, { useState } from "react";
import Image from "next/image";

import { FooterLInks } from "./components/links";
import { ComplaintForm } from "./components/form";
import { SocialMedia } from "./components/socialMedia";
import Line from "@/common/line";

const Footer = () => {
  return (
    <footer className="bg-primary section text-white py-16">
      <div className="container px-4">
        <div className="text-start flex flex-wrap gap-5 justify-between  mb-20 w-full">
          <Image
            priority
            src="/logo-white.svg"
            alt="Store Logo"
            width={120}
            height={100}
          />
          <p className="mt-4 text-lg font-others text-white font-light max-w-lg ">
            Welcome to store! We deliver premium products with the best quality
            and customer service.
          </p>
        </div>

        <div className="flex  justify-between flex-wrap mb-20 gap-8 ">
          <FooterLInks />
          <ComplaintForm />
        </div>
        <Line />

        <SocialMedia />
      </div>
    </footer>
  );
};
export default Footer;
