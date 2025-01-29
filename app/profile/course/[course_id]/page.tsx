"use client";
import Faq from "@/components/home/faq";
import ChapterSidebar from "@/components/profile/course/chapter-sidebar";
import Content from "@/components/profile/course/content";
import NavbarAdminUser from "@/components/shared/navbar-admin-user";
import React from "react";

const DetailCourse = () => {
  return (
    <div className=" px-12 pt-12 space-y-6">
      <NavbarAdminUser />
      {/* <Faq />
       */}
      <div className="flex w-full  space-x-4">
        <ChapterSidebar />
        <Content />
      </div>
    </div>
  );
};

export default DetailCourse;
