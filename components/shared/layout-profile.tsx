'use client';

import React from 'react';

import NavbarAdminUser from '@/components/shared/navbar-admin-user';
import SidebarUser from '@/components/shared/sidebar-user';

const LayoutProfile = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <NavbarAdminUser />
      <div className="flex min-h-[100vh] ">
        <SidebarUser />
        <div className="px-6 w-full">{children}</div>
      </div>
    </div>
  );
};

export default LayoutProfile;
