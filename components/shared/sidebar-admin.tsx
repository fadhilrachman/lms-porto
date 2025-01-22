"use client";
import React from "react";
import { Coins, Home, User, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const SidebarAdmin = () => {
  const router = useRouter();
  const pathName = usePathname();
  const listSidebar = [
    {
      title: "Course",
      url: "/admin/course",
      icon: Home,
    },
    {
      title: "Category",
      url: "/admin/category",
      icon: Home,
    },
    {
      title: "Admin",
      url: "/admin/admin",
      icon: User,
    },
    {
      title: "Customer",
      url: "/admin/customer",
      icon: User2,
    },
    {
      title: "Transaction",
      url: "/admin/transaction",
      icon: Coins,
    },
  ];
  return (
    <div className="border-r min-w-[300px]  min-h-full pr-4 border-neutral-800 space-y-3">
      {listSidebar.map((val, key) => {
        return (
          <div
            className={`${pathName == val.url && "bg-[#27272A]"} hover:bg-neutral-900 flex items-center space-x-2 cursor-pointer py-2.5 px-3 rounded-xl`}
            key={key}
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

export default SidebarAdmin;
