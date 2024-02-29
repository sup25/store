import React, { useState, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

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
      className={`w-full fixed top-[48px] right-0 h-full bg-gray-300 transition-transform duration-300 ease-in-out transform ${
        isVisible ? "lg:hidden translate-x-0" : "translate-x-full  "
      } `}
    >
      <div className="h-full flex flex-col justify-start">
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
