"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Star, User } from "lucide-react";
import { useGetCourse } from "@/hooks/course.hook";
import { formatRupiah } from "@/lib/helper";
import SckeletonLoading from "./sckeleton-loading";
import { useRouter } from "next/navigation";
import BaseImg from "../shared/base-image";
const ListCourse = () => {
  const router = useRouter();
  const { data, isFetching } = useGetCourse({ page: 1, per_page: 4 });

  return (
    <section className="px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
        {isFetching
          ? [1, 4, 2, 3].map((val) => <SckeletonLoading key={val} />)
          : data?.result.map((val, key) => {
              return (
                <Card
                  key={key}
                  isPressable
                  onPress={() => router.push(`/course/${val.id}`)}
                  className="py-4 w-full"
                >
                  <CardHeader className="w-full block">
                    {val?.thumbnail_img && (
                      <BaseImg
                        src={val?.thumbnail_img}
                        alt="img"
                        // className="object-cover bg-cover w-full rounded-xl"
                      />
                    )}
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <div className="pb-0 w pt-2 px-4 flex-col items-start">
                      <div className="flex justify-between w-full items-center">
                        <p className="font-bold text-large">{val.title}</p>
                        <Chip size="sm">Tech</Chip>
                      </div>
                      <small className="text-default-500">
                        {formatRupiah(val.price)}
                      </small>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="flex w-full justify-between items-center">
                      <div className="flex space-x-1">
                        {[0, 2, 3, 4, 5].map((val) => (
                          <Star key={val} className="text-yellow-500" />
                        ))}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4" />
                        <small>{val._count.transaction}</small>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
      </div>
    </section>
  );
};

export default ListCourse;
