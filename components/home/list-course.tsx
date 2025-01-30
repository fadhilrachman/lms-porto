import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Star, User } from "lucide-react";
import { useGetCourse } from "@/hooks/course.hook";
import { formatRupiah } from "@/lib/helper";
import { Spinner } from "@nextui-org/spinner";
import SckeletonLoading from "./sckeleton-loading";
const ListCourse = () => {
  const { data, isFetching } = useGetCourse({ page: 1, per_page: 4 });

  return (
    <section className="px-6">
      <div className="grid grid-cols-4 gap-6 ">
        {isFetching
          ? [1, 4, 2, 3].map((val) => <SckeletonLoading key={val} />)
          : data?.result.map((val, key) => {
              return (
                <Card key={key} className="py-4 w-full">
                  <CardHeader className="pb-0 w pt-2 px-4 flex-col items-start">
                    <div className="flex justify-between w-full items-center">
                      <h4 className="font-bold text-large">{val.title}</h4>
                      <Chip size="sm">Tech</Chip>
                    </div>
                    <small className="text-default-500">
                      {formatRupiah(val.price)}
                    </small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <img
                      alt="Card background"
                      className="object-cover w-full rounded-xl"
                      src={val.thumbnail_img}
                      width={270}
                    />
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
