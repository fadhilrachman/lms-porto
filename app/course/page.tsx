"use client";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Search, Star, User } from "lucide-react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import Title from "@/components/home/title";
import Footer from "@/components/home/footer";
import { Navbar } from "@/components/shared/navbar";

const Course = () => {
  const router = useRouter();

  return (
    <div className="relative space-y-12  ">
      <Navbar />

      <div className="px-16 space-y-4">
        <Title
          subTitle="Course"
          subTitle2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, nisi"
        />
        <div className="flex space-x-2">
          <Input
            className="w-max"
            placeholder="Search Course..."
            size="lg"
            startContent={<Search />}
          />
          <Button color="primary" size="lg">
            Search
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-6 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 89].map((val, key) => {
            return (
              <Card
                key={key}
                className="py-4 w-full cursor-pointer hover:scale-95"
              >
                <CardHeader className="pb-0 w pt-2 px-4 flex-col items-start">
                  <div className="flex justify-between w-full items-center">
                    <h4 className="font-bold text-large">Frontend Course</h4>
                    <Chip size="sm">Tech</Chip>
                  </div>
                  <small className="text-default-500">Rp.12.000.00</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <img
                    alt="Card background"
                    className="object-cover w-full rounded-xl"
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
      </div>
      <Footer />
    </div>
  );
};

export default Course;
