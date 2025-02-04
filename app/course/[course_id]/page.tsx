'use client';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import {
  Check,
  FileVideo,
  Globe,
  ScrollText,
  TableOfContents,
} from 'lucide-react';
import React, { useState } from 'react';
import AboutCourse from '@/components/home/course/detail/about-course';
import Footer from '@/components/home/footer';
import Title from '@/components/home/title';
import { Navbar } from '@/components/shared/navbar';
import VideoRender from '@/components/shared/video-render';
import ListChapter from '@/components/home/course/detail/list-chapter';
import { useParams } from 'next/navigation';
import { useGetDetailCourse } from '@/hooks/course.hook';
import moment from 'moment';
import LoadingFullpage from '@/components/shared/loading-fullpage';
import ModalBuyCourse from '@/components/home/course/detail/buy-course';
import { formatRupiah } from '@/lib/helper';

const CourseDetail = () => {
  const { course_id } = useParams();
  const [modal, setModal] = useState({
    buyCourse: false,
  });
  const { data, isFetching } = useGetDetailCourse(course_id as string, true);
  const [tab, setTab] = useState('About');
  const listTab = [
    {
      title: 'About',
      href: '#aboutCourse',
    },
    {
      title: 'Content',
      href: '#contentCourse',
    },
  ];

  return (
    <div className="relative space-y-12  ">
      {isFetching && <LoadingFullpage />} <Navbar />
      <div className="px-4 sm:px-12 md:px-24 xl:px-36 space-y-12">
        <div className="max-w-[600px] text-center mx-auto">
          <h3 className="text-3xl font-semibold mb-2">Online Course</h3>
          <Title
            className="text-center  mx-auto space-y-2"
            subTitle={data?.result?.title}
            subTitle2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, nisi"
          />
          <div className="flex items-center mt-4 justify-center space-x-2">
            <Globe />
            <p>
              Release Date{' '}
              <span className="text-secondary font-semibold">
                {moment(data?.result?.created_at).format('DD MMMM YYYY')}
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="col-span-4 space-y-4 ">
            <VideoRender url="https://www.youtube.com/watch?v=8NCyvC9OTOA" />

            <div className="space-x-4 border-b pb-3 dark:border-borderColor">
              {listTab.map((val, key) => {
                return (
                  <Button
                    key={key}
                    color={val.title == tab ? 'secondary' : 'default'}
                    size="lg"
                    onPress={() => {
                      setTab(val.title);
                    }}
                  >
                    {val.title}
                  </Button>
                );
              })}
            </div>
            <div className="space-y-8">
              {tab == 'About' ? (
                <AboutCourse description={data?.result?.description} />
              ) : (
                <ListChapter chapter={data?.result?.chapter || []} />
              )}
            </div>
          </div>
          <div className="col-span-2 space-y-4 w-full">
            <Card className="w-full">
              <CardHeader className="pb-0">Benefits for you</CardHeader>
              <CardBody as={'div'} className="space-y-4">
                <div className="border flex justify-between items-center rounded-2xl p-3 dark:border-borderColor">
                  <div className="flex items-center space-x-2">
                    <TableOfContents />
                    <p className="text-sm">
                      {data?.result?.chapter.length || 0} Chapter
                    </p>
                  </div>
                  <Check className="text-green-500" />
                </div>
                <div className="border flex justify-between items-center rounded-2xl p-3 dark:border-borderColor">
                  <div className="flex items-center space-x-2">
                    <FileVideo />
                    <p className="text-sm">27 Video</p>
                  </div>
                  <Check className="text-green-500" />
                </div>{' '}
                <div className="border flex justify-between items-center rounded-2xl p-3 dark:border-borderColor">
                  <div className="flex items-center space-x-2">
                    <ScrollText />
                    <p className="text-sm">Get Certificate</p>
                  </div>
                  <Check className="text-green-500" />
                </div>
              </CardBody>
            </Card>

            <Button
              className="w-full"
              color="primary"
              onPress={() => {
                setModal((p) => ({ ...p, buyCourse: true }));
              }}
            >
              Buy Course {formatRupiah(data?.result?.price)}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      <ModalBuyCourse
        isOpen={modal.buyCourse}
        onOpenChange={() => {
          setModal((p) => ({ ...p, buyCourse: false }));
        }}
      />
    </div>
  );
};

export default CourseDetail;
