"use client";
import { useRouter } from "next/navigation";
import NavLinks from "@/common/navLinks";
import Logo from "@/common/Logo";

export default function Navbar() {
  const router = useRouter();
  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <nav className="w-full  bg-primary ">
      <div className="section">
        <div className="container">
          <div className=" w-full py-2 px-2 flex justify-between items-center">
            <div className=" cursor-pointer" onClick={redirectToHome}>
              <Logo />
            </div>
            <NavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}
