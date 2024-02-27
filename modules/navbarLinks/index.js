import Link from "next/link";
import React from "react";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaUserPlus,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const NavbarLinks = () => {
  const { user, loading, logout } = useAuth();

  const links = [
    !user && {
      href: "/login",
      icon: <FaSignInAlt size={20} className="text-white " />,
      text: "Login",
    },
    !user && {
      href: "/register",
      icon: <FaUserPlus size={20} className="text-white " />,
      text: "Register",
    },
    user && {
      href: "/profile",
      icon: <FaUser size={20} className="text-white " />,
      text: user.displayName,
    },

    user && {
      href: "/",
      icon: <FaHeart size={20} className="text-white " />,
      text: "Orders",
    },
    user && {
      href: "/",
      icon: <FaShoppingCart size={20} className="text-white " />,
      text: "My Cart",
    },
  ].filter(Boolean);

  const handleLogout = async () => {
    await logout();
    toast.success("User Logged out successfully");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex text-gray-400 gap-6">
      {links.map((link, index) => (
        <Link key={index} href={link.href} passHref>
          <div className="flex flex-col items-center justify-center gap-1 transition duration-250 ease-out  hover:text-tertiary">
            {link.icon}
            <span className="text-sm">{link.text}</span>
          </div>
        </Link>
      ))}
      {user && (
        <div
          className="flex flex-col items-center justify-center gap-1 transition duration-250 ease-out  hover:text-tertiary cursor-pointer"
          onClick={handleLogout}
        >
          <FaSignOutAlt size={20} className="text-white " />
          <span className="text-sm">Logout</span>
        </div>
      )}
    </div>
  );
};

export default NavbarLinks;
