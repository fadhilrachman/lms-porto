"use client";
import { Navbar } from "@/components/shared/navbar";
import NavbarAdmin from "@/components/shared/navbar-admin";
import SidebarAdmin from "@/components/shared/sidebar-admin";
import React from "react";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-12 pt-4 space-y-6 ">
      <NavbarAdmin />

      <div className="flex space-x-4 min-h-[100vh]  ">
        <SidebarAdmin />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
