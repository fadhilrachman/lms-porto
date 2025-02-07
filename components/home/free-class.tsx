import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/button";
import Title from "./title";
import kobuAgencyImage from "@/public/images/kobu-agency.jpg";

const FreeClass = () => {
  return (
    <Card className="mx-6 h-48 md:mx-[300px] p-0 rounded-3xl bg-gradient-to-br from-indigo-800 to-backgroundColor text-white">
      <CardBody className="p-0 overflow-hidden">
        <div className="w-full">
          <div className="absolute right-0">
            <Image
              alt="free-class-bg"
              className="h-max opacity-30"
              src={kobuAgencyImage}
              style={{ objectPosition: "0 -100px" }}
            />
          </div>
          <div className="space-y-4 p-6 w-full h-screen absolute">
            <Title
              subTitle="Join Free Classes"
              subTitle2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, excepturi"
            />
            <Button
              color="primary"
              onPress={() => {
                window.open();
              }}
            >
              Join
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FreeClass;
