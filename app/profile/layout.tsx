"use client";

import NavbarUser from "@/components/shared/navbar-user";
import SidebarUser from "@/components/shared/sidebar-user";
import React from "react";

const LayoutProfile = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-12 pt-4 space-y-6 ">
      <NavbarUser />

      <div className="flex space-x-4 min-h-[100vh]  ">
        <SidebarUser />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default LayoutProfile;
