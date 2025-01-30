"use client";

import React from "react";

import NavbarAdminUser from "@/components/shared/navbar-admin-user";
import SidebarUser from "@/components/shared/sidebar-user";

const LayoutProfile = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-12 pt-4 space-y-6 ">
      <NavbarAdminUser />
      <div className="flex space-x-4 min-h-[100vh]  ">
        <SidebarUser />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default LayoutProfile;
