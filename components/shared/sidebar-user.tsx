'use client';
import React from 'react';
import { Home, LucideBookMarked, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const SidebarUser = () => {
  const router = useRouter();
  const pathName = usePathname();
  const listSidebar = [
    {
      title: 'Profile',
      url: '/profile/profile',
      icon: User,
    },
    {
      title: 'My Courses',
      url: '/profile/courses',
      icon: LucideBookMarked,
    },
    {
      title: 'Transaction',
      url: '/profile/transaction',
      icon: Home,
    },
  ];

  return (
    <div className="border-r fixed min-w-[300px] min-h-full px-6 py-3 border-neutral-800 space-y-3">
      {listSidebar.map((val, key) => {
        return (
          <div
            key={key}
            className={`${pathName == val.url && 'bg-[#27272A]'} hover:bg-neutral-900 flex items-center space-x-2 cursor-pointer py-2.5 px-3 rounded-xl`}
            onClick={() => {
              router.push(val.url);
            }}
          >
            {<val.icon className="h-5 w-5" />}
            <span>{val.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarUser;
