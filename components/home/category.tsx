import { Card, CardBody } from "@nextui-org/card";
import React from "react";
import Marquee from "react-fast-marquee";
import { IoLogoJavascript } from "react-icons/io5";
import Title from "./title";
const Category = () => {
  return (
    <div className="  py-12 space-y-6">
      {" "}
      <Title
        className="text-center"
        title="  Our Recomended"
        subTitle="Learn New Skills According to your interests"
      />
      <Marquee
        className="flex space-x-4 "
        pauseOnHover
        gradient={false}
        speed={50}
      >
        {[1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 1, 3].map((val, key) => {
          return (
            <Card
              key={key}
              className="w-max border shadow-none dark:border-borderColor cursor-pointer group mx-4"
            >
              <CardBody className="">
                <div className="flex items-center space-x-2">
                  <IoLogoJavascript className="text-yellow-500" />
                  <span className="group-hover:underline">Javascript</span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </Marquee>
      <Marquee
        className="flex space-x-4 "
        pauseOnHover
        gradient={false}
        speed={50}
        direction="right"
      >
        {[1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 1, 3].map((val, key) => {
          return (
            <Card
              key={key}
              //   dir="right"
              className="w-max border shadow-none dark:border-borderColor cursor-pointer group mx-4"
            >
              <CardBody className="">
                <div className="flex items-center space-x-2">
                  <IoLogoJavascript className="text-yellow-500" />
                  <span className="group-hover:underline">Javascript</span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Category;
