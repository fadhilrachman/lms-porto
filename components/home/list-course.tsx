import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { Chip } from "@nextui-org/chip";
import { Star, User } from "lucide-react";
const ListCourse = () => {
  return (
    <section>
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((val, key) => {
          return (
            <Card key={key} className="py-4 w-max">
              <CardHeader className="pb-0 w pt-2 px-4 flex-col items-start">
                <div className="flex justify-between w-full items-center">
                  <h4 className="font-bold text-large">Frontend Course</h4>
                  <Chip size="sm">Tech</Chip>
                </div>
                {/* <p className="text-tiny uppercase font-bold">Daily Mix</p> */}
                <small className="text-default-500">Rp.12.000.00</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <img
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://nextui.org/images/hero-card-complete.jpeg"
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
                    <small>12</small>
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
