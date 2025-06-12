"use client";

import { IoGlobeOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/chip";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { Skeleton } from "@heroui/skeleton";

import { useGetUserCourse } from "@/hooks/course-user.hooks";
import BaseInputSearch from "@/components/shared/base-input-search";
import LayoutProfile from "@/components/shared/layout-profile";
import { Lock, LucideBookMarked } from "lucide-react";
import Image from "next/image";
import BaseIcon from "@/components/shared/base-icon";
import { FaRegFolderOpen } from "react-icons/fa";

const UserCourse = () => {
  const router = useRouter();
  const [modal, setModal] = useState({ create: false, img: false });
  const [params, setPrams] = useState({ search: "" });
  const { data, isFetching, refetch } = useGetUserCourse({
    page: 1,
    per_page: 1000,
  });

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <LayoutProfile>
      <div className="space-y-6">
        <div className=" space-y-3">
          <div className="flex items-center gap-3">
            <LucideBookMarked />
            <h3 className="text-2xl font-bold">My Course</h3>
          </div>
        </div>

        <BaseInputSearch
          placeholder="Search Course"
          onChange={(e) => {
            setPrams((p) => ({ ...p, search: e }));
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isFetching ? (
            [1, 4, 2, 3, 5, 6].map((val) => (
              <Skeleton key={val} className="h-72 w-full rounded-md " />
            ))
          ) : data.result.length < 1 ? (
            <div className="w-full h-full text-lg col-span-3 flex flex-col py-12 justify-center items-center">
              <FaRegFolderOpen size={46} />
              <p>Data not found</p>
            </div>
          ) : (
            data?.result?.map((obj, key) => (
              <Card
                isPressable
                key={key}
                className=" cursor-pointer hover:scale-95"
                onPress={() => {
                  router.push(
                    `/profile/courses/${obj?.course?.id}?content_id=${obj?.course?.content_id_first}`
                  );
                }}
              >
                <CardHeader className="pb-0 w pt-4 px-4 flex-col items-start">
                  <Image
                    alt="Card background"
                    className="object-cover w-full rounded-xl"
                    src={
                      obj.course.thumbnail_img ||
                      "https://nextui.org/images/hero-card-complete.jpeg"
                    }
                    width={270}
                    height={270}
                  />
                </CardHeader>
                {/* //  */}

                <CardBody className="overflow-visible py-4">
                  <div className="flex justify-between w-full items-center">
                    <h4 className="font-bold text-large line-clamp-1">
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
                          : "Category"}
                      </span>
                    </Chip>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="flex w-full justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                      <IoGlobeOutline size={22} />
                      <p>
                        {obj.course.is_free ? "Free course" : "Premium course"}
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
