"use client";

import { IoGlobeOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { Chip } from "@nextui-org/chip";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";

import { useGetUserCourse } from "@/hooks/course-user.hooks";
import BaseInputSearch from "@/components/shared/base-input-search";

const UserCourse = () => {
  const router = useRouter();
  const [modal, setModal] = useState({ create: false, img: false });
  const [params, setPrams] = useState({ search: "" });
  const { data, isFetching, refetch } = useGetUserCourse({
    page: 1,
    per_page: 10,
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-2xl">Course</h3>
      </div>

      <BaseInputSearch
        placeholder="Search Course"
        onChange={(e) => {
          setPrams((p) => ({ ...p, search: e }));
        }}
      />
      <div className="grid-cols-3 gap-4 pt-7 pb-8">
        {isFetching ? (
          <Card>
            <CardBody className="w-full min-h-[40vh] flex items-center justify-center">
              <Spinner />
            </CardBody>
          </Card>
        ) : (
          (data?.result || []).map((obj, key) => (
            <button
              key={key}
              className="w-1/3"
              onClick={() =>
                router.push(`/course/${obj.course.id}/learn/${"dummyId"}`)
              }
            >
              <Card className="py-4 w-full cursor-pointer hover:scale-95">
                <CardHeader className="pb-0 w pt-2 px-4 flex-col items-start">
                  <img
                    alt="Card background"
                    className="object-cover w-full rounded-xl"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    width={270}
                  />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <div className="flex justify-between w-full items-center">
                    <h4 className="font-bold text-large">{obj.course.title}</h4>
                    <Chip size="sm">
                      {obj.course.category
                        ? obj.course?.category.name
                        : "Category"}
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
            </button>
          ))
        )}
      </div>
      {!isFetching && data?.result.length !== 0 && (
        <div className="flex justify-between items-center">
          <p>
            Show {data?.pagination.total_data} data from{" "}
            {data?.pagination.total_page}
          </p>
          <Pagination
            loop
            showControls
            page={currentPage}
            total={data?.pagination?.total_page || 0}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default UserCourse;
