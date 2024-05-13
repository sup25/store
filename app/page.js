"use client";
import React from "react";
import Hero from "./hero/page";

export default function Home() {
  return (
    <div className="md:flex md:flex-row flex-col flex items-center justify-center ">
      <Hero />
    </div>
  );
}
