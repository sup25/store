import Link from "next/link";
import React from "react";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

const links = [
  { href: "/", icon: <FaUser size={20} />, text: "Profile" },
  {
    href: "/",
    icon: <FaHeart size={20} />,
    text: "Orders",
  },
  {
    href: "/",
    icon: <FaShoppingCart size={20} />,
    text: "My Cart",
  },
];

const NavbarLinks = () => {
  return (
    <div className="flex text-gray-400 gap-6">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex flex-col hover:text-black cursor-pointer items-center justify-center gap-1 transition duration-250 ease-out hover:ease-in"
        >
          {link.icon}
          <span className="text-sm">{link.text}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
