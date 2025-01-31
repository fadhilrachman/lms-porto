'use client';
import Faq from '@/components/home/faq';
import ChapterSidebar from '@/components/profile/course/chapter-sidebar';
import Content from '@/components/profile/course/content';
import NavbarAdminUser from '@/components/shared/navbar-admin-user';
import React from 'react';

const DetailCourse = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdminUser />
      <div className="w-full pt-16 h-full flex">
        <ChapterSidebar />
        <div className="px-6 py-3 ml-[350px] w-full min-h-screen overflow-y-auto">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
