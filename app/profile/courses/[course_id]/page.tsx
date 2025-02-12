'use client';
import ChapterSidebar, {
  contentNav,
} from '@/components/profile/course/chapter-sidebar';
import Content from '@/components/profile/course/content';
import NavbarAdminUser from '@/components/shared/navbar-admin-user';
import { useGetDetailUserCourse } from '@/hooks/course-user.hooks';
import useIsMobile from '@/hooks/useIsMobile';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { ArrowLeft, CheckCheck, VideoIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import React, { useState } from 'react';

const DetailCourse = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { course_id } = useParams();
  const [_, setContent_id] = useQueryState('content_id');
  const { data, isLoading, refetch } = useGetDetailUserCourse(
    course_id as string,
  );

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {!isMobile ? (
        <NavbarAdminUser />
      ) : (
        <Navbar
          className="border-b border-neutral-800 fixed top-0 left-0 right-0"
          maxWidth="full"
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent justify="start">
            <Button variant="light" onPress={() => router.back()}>
              <ArrowLeft />
              <span className="!font-semibold text-lg">My Courses</span>
            </Button>
          </NavbarContent>

          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="h-10"
          />
          <NavbarMenu className="justify-between py-6">
            <NavbarMenuItem>
              <Accordion
                variant="splitted"
                defaultExpandedKeys={'1'}
                className="max-w-full"
              >
                {data?.result?.chapter?.map((item: any, i: number) => (
                  <AccordionItem
                    key={i + 1}
                    aria-label={item?.title}
                    title={<p className="font-semibold">{item?.title}</p>}
                  >
                    <div
                      className="space-y-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item?.content.map((res, i) => (
                        <div
                          key={i}
                          className="cursor-pointer flex justify-between rounded-xl bg-neutral-800  px-4 py-3"
                          onClick={() => setContent_id(res?.id)}
                        >
                          <div className="space-x-3 flex items-center">
                            <VideoIcon />
                            <span>{res?.title}</span>
                          </div>
                          {res?.content_progress?.length > 0 && (
                            <CheckCheck className="text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      )}
      <div className="w-full pt-16 h-full flex">
        <ChapterSidebar chapter={data?.result?.chapter || []} />
        <div className="px-6 py-3 lg:ml-[350px] w-full min-h-screen overflow-y-auto">
          {!isLoading ? <Content /> : null}
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
