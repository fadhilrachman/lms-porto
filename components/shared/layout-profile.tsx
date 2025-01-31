'use client';

import React from 'react';

import NavbarAdminUser from '@/components/shared/navbar-admin-user';
import SidebarUser from '@/components/shared/sidebar-user';

const LayoutProfile = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdminUser />
      <div className="w-full pt-16 h-full flex">
        <SidebarUser />
        <div className="px-6 py-3 ml-[300px] w-full min-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutProfile;
