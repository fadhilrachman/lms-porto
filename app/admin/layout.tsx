"use client";
import React from "react";

import NavbarAdmin from "@/components/shared/navbar-admin-user";
import SidebarAdmin from "@/components/shared/sidebar-admin";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-12 pt-4 space-y-6 ">
      <NavbarAdmin />

      <div className="flex space-x-4 min-h-[100vh] !mt-[70px]  ">
        <SidebarAdmin />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
