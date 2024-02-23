import Link from "next/link";
import React from "react";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

const links = [
  {
    href: "/register",
    icon: <FaUser size={20} className="text-white " />,
    text: "Profile",
  },
  {
    href: "/",
    icon: <FaHeart size={20} className="text-white " />,
    text: "Orders",
  },
  {
    href: "/",
    icon: <FaShoppingCart size={20} className="text-white " />,
    text: "My Cart",
  },
];

const NavbarLinks = () => {
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
    </div>
  );
};

export default NavbarLinks;
