import React from "react";
import Link from "next/link";
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

const MobileNavLinks = ({ show }) => (
  <div className={`fixed w-full ${show ? "lg:hidden" : "hidden "}`}>
    <div className="bg-gray-300 h-[90vh] py-2 flex flex-col absolute top-[25px] items-center left-0 right-10">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex items-center gap-2 text-black py-2 hover:bg-gray-200 w-full px-2"
        >
          {link.icon}
          <span className="text-sm">{link.text}</span>
        </Link>
      ))}
    </div>
  </div>
);

export default MobileNavLinks;
