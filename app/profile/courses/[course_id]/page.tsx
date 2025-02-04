'use client';
import Faq from '@/components/home/faq';
import ChapterSidebar from '@/components/profile/course/chapter-sidebar';
import Content from '@/components/profile/course/content';
import NavbarAdminUser from '@/components/shared/navbar-admin-user';
import { useGetDetailUserCourse } from '@/hooks/course-user.hooks';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';

const DetailCourse = () => {
  const { course_id } = useParams();
  const { data, isLoading, refetch } = useGetDetailUserCourse(
    course_id as string,
  );
  const [_, setContentId] = useQueryState('content');

  // useEffect(() => {
  //   if (data?.result?.chapter.length > 0) {
  //     setContentId(data?.result?.chapter[0].id);
  //   }
  // }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdminUser />
      <div className="w-full pt-16 h-full flex">
        <ChapterSidebar chapter={data?.result?.chapter || []} />
        <div className="px-6 py-3 ml-[350px] w-full min-h-screen overflow-y-auto">
          {!isLoading ? <Content /> : null}
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
