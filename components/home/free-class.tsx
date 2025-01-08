import { Card, CardBody } from "@nextui-org/card";
import React from "react";
import Title from "./title";
import { Button } from "@nextui-org/button";

const FreeClass = () => {
  return (
    <Card className="md:mx-[300px] rounded-3xl  bg-backgroundColor text-white">
      <CardBody>
        <div className="p-4">
          <div className="space-y-4">
            <Title
              subTitle="Join Free Classes"
              subTitle2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, excepturi"
            />
            <Button color="primary">Join</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FreeClass;
