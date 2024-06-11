"use client";

import SideBar from "./components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex gap-32 pl-8">
      <SideBar />
      {children}
    </section>
  );
}
