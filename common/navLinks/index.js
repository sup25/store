"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/context/cartContext";

const NavLinks = () => {
  const { user, setUserStore, admin } = useAuth();
  const { cartItems } = useCart();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async (isAdmin = false) => {
    if (isAdmin) {
      setUserStore(null, null, false, true, true);
      toast.success("Admin logged out successfully");
    } else if (user) {
      setUserStore(null, null, false, true, false);
      toast.success("User logged out successfully");
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLinkClick = () => {
    closeDrawer();
  };

  let links = [];

  if (user) {
    links = [
      {
        icon: <FaUser size={20} />,
        text: user.first_name,
        private: true,
        href: "/user/dashboard",
      },

      {
        icon: <FaShoppingCart size={20} />,
        text: `My Cart (${cartItems.length})`,
        href: "/user/mycart",

        private: true,
      },
      {
        icon: <FaSignOutAlt size={20} />,
        text: "Logout",
        onClick: () => handleLogout(false),
        private: true,
      },
    ];
  } else if (admin) {
    links = [
      {
        icon: <FaUser size={20} />,
        text: admin.name,
        private: true,
        href: "/admin/dashboard",
      },
      {
        icon: <FaSignOutAlt size={20} />,
        text: "Logout",
        onClick: () => handleLogout(true),
        private: true,
      },
    ];
  } else {
    links = [
      {
        href: "/login",
        icon: <FaUserPlus size={20} />,
        text: "Login",
        private: false,
      },
      {
        href: "/register",
        icon: <FaUserPlus size={20} />,
        text: "Register",
        private: false,
      },
    ];
  }

  return (
    <>
      <div className="md:flex none md:items-center md:space-x-4">
        {links.map((link, index) => {
          const shouldDisplay = link.private ? user || admin : !user && !admin;
          if (shouldDisplay) {
            return (
              <div key={index}>
                {link.href ? (
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 py-2 text-white transition duration-250 ease-in-out hover:bg-slate-400 px-2"
                  >
                    {link.icon}
                    <span className="text-sm">{link.text}</span>
                  </Link>
                ) : (
                  <div
                    onClick={link.onClick}
                    className="flex cursor-pointer items-center gap-2 text-white py-2 transition duration-250 ease-in-out hover:bg-slate-400 px-2"
                  >
                    {link.icon}
                    <span className="text-sm">{link.text}</span>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="md:hidden">
        {!isDrawerOpen ? (
          <div className="cursor-pointer text-white" onClick={toggleDrawer}>
            <FaBars size={24} />
          </div>
        ) : (
          <div className="cursor-pointer text-white" onClick={toggleDrawer}>
            <FaTimes size={24} />
          </div>
        )}

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
            isDrawerOpen ? "block" : "hidden"
          }`}
          onClick={closeDrawer}
        ></div>

        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition duration-300 ease-in-out ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {links.map((link, index) => {
            const shouldDisplay = link.private
              ? user || admin
              : !user && !admin;
            if (shouldDisplay) {
              return (
                <div key={index}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex items-center gap-2 py-2 text-gray-900 hover:bg-gray-100 px-4"
                    >
                      {link.icon}
                      <span className="text-sm">{link.text}</span>
                    </Link>
                  ) : (
                    <div
                      onClick={link.onClick}
                      className="flex cursor-pointer items-center gap-2 text-gray-900 hover:bg-gray-100 px-4"
                    >
                      {link.icon}
                      <span className="text-sm">{link.text}</span>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default NavLinks;
