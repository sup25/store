"use client";

import SideBar from "./components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex md:gap-20  gap-4 ">
      <SideBar />
      {children}
    </section>
  );
}
