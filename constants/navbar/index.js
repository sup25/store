"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarLinks from "@/modules/navbarLinks";

import ToggleNavIcon from "@/modules/toggleNavIcon";
import MobileNavLinks from "@/modules/mobileNavLinks";

export default function Navbar() {
  const router = useRouter();
  const redirectToHome = () => {
    router.push("/");
  };
  const [show, setShow] = useState(false);

  const handleIconClick = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <nav className="w-full  bg-primary ">
      <div className="section">
        <div className="container">
          <div className=" w-full py-2 px-2 flex justify-between items-center">
            <h2
              className="font-bold text-2xl uppercase text-secondary cursor-pointer"
              onClick={redirectToHome}
            >
              store
            </h2>

            <ToggleNavIcon show={show} onClick={handleIconClick} />
            <MobileNavLinks show={show} />

            <div className="hidden lg:block">
              <NavbarLinks />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
