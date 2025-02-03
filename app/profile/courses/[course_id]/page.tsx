'use client';
import Faq from '@/components/home/faq';
import ChapterSidebar from '@/components/profile/course/chapter-sidebar';
import Content from '@/components/profile/course/content';
import NavbarAdminUser from '@/components/shared/navbar-admin-user';
import { useGetDetailUserCourse } from '@/hooks/course-user.hooks';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import React from 'react';

const DetailCourse = () => {
  const { course_id } = useParams();
  const { data, isLoading } = useGetDetailUserCourse(course_id as string);
  const [contentId, _] = useQueryState('content');
  const chapterContent = data?.result?.chapter.find((res) => res?.content);
  const content = chapterContent?.content.filter(
    (item) => item.id === contentId,
  );
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdminUser />
      <div className="w-full pt-16 h-full flex">
        <ChapterSidebar chapter={data?.result?.chapter || []} />
        <div className="px-6 py-3 ml-[350px] w-full min-h-screen overflow-y-auto">
          <Content content={content} />
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
