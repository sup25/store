import React from "react";
import Link from "next/link";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaUserPlus,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const MobileNavLinks = ({ show }) => {
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const links = [
    user && { icon: <FaUser size={20} />, text: "Profile" },
    user && { icon: <FaHeart size={20} />, text: "Orders" },
    user && { icon: <FaShoppingCart size={20} />, text: "My Cart" },
    user && {
      icon: <FaSignOutAlt size={20} />,
      text: "Logout",
      onclick: handleLogout,
    },
    !user && {
      href: "/login",
      icon: <FaSignInAlt size={20} className="text-black " />,
      text: "Login",
    },
    !user && {
      href: "/register",
      icon: <FaUserPlus size={20} className="text-black " />,
      text: "Register",
    },
  ].filter(Boolean);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`w-full ${
        show ? "lg:hidden transition duration-300 ease-in" : "hidden"
      }`}
    >
      <div className="bg-gray-300 h-[90vh] w-full py-2 flex flex-col absolute top-[45px]  left-0 right-0">
        {links.map((link, index) => (
          <div key={index} onClick={link.onclick}>
            {link.href ? (
              <Link
                href={link.href}
                className="flex items-center gap-2 text-black py-2 hover:bg-gray-200 w-full px-2"
              >
                {link.icon}
                <span className="text-sm">{link.text}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-black py-2 hover:bg-gray-200 w-full px-2">
                {link.icon}
                <span className="text-sm">{link.text}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNavLinks;
