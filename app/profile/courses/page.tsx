'use client';

import { IoGlobeOutline } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import { Pagination } from '@nextui-org/pagination';
import { Chip } from '@nextui-org/chip';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { useParams, useRouter } from 'next/navigation';
import { Spinner } from '@nextui-org/spinner';

import { useGetUserCourse } from '@/hooks/course-user.hooks';
import BaseInputSearch from '@/components/shared/base-input-search';
import LayoutProfile from '@/components/shared/layout-profile';
import { Lock, LucideBookMarked } from 'lucide-react';
import Image from 'next/image';
import BaseIcon from '@/components/shared/base-icon';

const UserCourse = () => {
  const router = useRouter();
  const [modal, setModal] = useState({ create: false, img: false });
  const [params, setPrams] = useState({ search: '' });
  const { data, isFetching, refetch } = useGetUserCourse({
    page: 1,
    per_page: 10,
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <LayoutProfile>
      <div className="space-y-6">
        <div className=" border-b border-neutral-400 space-y-3">
          <div className="flex items-center gap-3">
            <LucideBookMarked />
            <h3 className="text-2xl font-bold">My Course</h3>
          </div>
          <p className="max-w-96">
            Upgrades continue to knowledge and experience the latest you in the
            field of technology
          </p>
        </div>

        <BaseInputSearch
          placeholder="Search Course"
          onChange={(e) => {
            setPrams((p) => ({ ...p, search: e }));
          }}
        />
        <div className="grid grid-cols-3 gap-4">
          {isFetching ? (
            <Card>
              <CardBody className="w-full min-h-[40vh] flex items-center justify-center">
                <Spinner />
              </CardBody>
            </Card>
          ) : (
            (data?.result || []).map((obj, key) => (
              <Card
                isPressable
                key={key}
                className="py-4 cursor-pointer hover:scale-95"
                onPress={() =>
                  router.push(`/profile/courses/${obj?.course?.id}`)
                }
              >
                <CardHeader className="pb-0 w pt-2 px-4 flex-col items-start">
                  <Image
                    alt="Card background"
                    className="object-cover w-full rounded-xl"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    width={270}
                    height={270}
                  />
                </CardHeader>
                {/* //  */}

                <CardBody className="overflow-visible py-2">
                  <div className="flex justify-between w-full items-center">
                    <h4 className="font-bold text-large">
                      {obj?.course?.title}
                    </h4>
                    <Chip
                      size="sm"
                      variant="flat"
                      avatar={
                        obj?.course?.category?.icon ? (
                          <BaseIcon iconKey={obj?.course?.category?.icon} />
                        ) : (
                          <Lock />
                        )
                      }
                    >
                      <span className="ml-1">
                        {obj.course.category
                          ? obj.course?.category.name
                          : 'Category'}
                      </span>
                    </Chip>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="flex w-full justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                      <IoGlobeOutline size={22} />
                      <p>
                        {obj.course.is_free ? 'Free course' : 'Premium course'}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        {/* {!isFetching && data?.result?.length !== 0 && (
          <div className="flex justify-between items-center">
            <p>
              Show {data?.pagination.total_data} from{' '}
              {data?.pagination.total_page} data
            </p>
            <Pagination
              loop
              showControls
              page={currentPage}
              total={data?.pagination?.total_page || 0}
              onChange={setCurrentPage}
            />
          </div>
        )} */}
      </div>
    </LayoutProfile>
  );
};

export default UserCourse;
