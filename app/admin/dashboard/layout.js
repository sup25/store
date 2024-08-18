"use client";

import SideBar from "./components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex md:gap-32  gap-4 md:pl-8 pl-4">
      <SideBar />
      {children}
    </section>
  );
}
