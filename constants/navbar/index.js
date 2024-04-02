"use client";
import { useRouter } from "next/navigation";
import NavLinks from "@/components/navLinks";

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
            <h2
              className="font-bold text-2xl uppercase text-secondary cursor-pointer"
              onClick={redirectToHome}
            >
              store
            </h2>
            <NavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}
