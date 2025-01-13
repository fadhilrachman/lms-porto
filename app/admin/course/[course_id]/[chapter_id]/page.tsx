import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Input, Textarea } from "@nextui-org/input";
import { Grip, Link, Plus, Share, Trash } from "lucide-react";
import React from "react";

const AdminDetailChapter = () => {
  return (
    <div className="space-y-4">
      {" "}
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl">Detail Chapter</h3>
          <p className="text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            quisquam?
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <Card title="asd">
          <CardHeader>
            <h3 className="text-xl">Info General</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-12 ">
              <Input
                isRequired
                label="Chapter Name"
                labelPlacement="outside"
                placeholder="Enter your name"
              />
              <Input
                isRequired
                label="Description"
                labelPlacement="outside"
                placeholder="Enter description"
              />
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex justify-end space-x-2 w-full">
              <Button>Cancel</Button>
              <Button color="primary">Submit</Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between w-full">
              <h3 className="text-xl">Course</h3>
              <Button
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                size="sm"
              >
                Create Course
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {[2, 3, 4, 50].map((val, key) => {
                return (
                  <div
                    key={key}
                    className="bg-[#27272A] cursor-pointer py-2.5 px-3 rounded-xl flex items-center justify-between "
                  >
                    <div className="flex items-center space-x-2">
                      <Grip className="h-4 w-4" />
                      <span>Course Typescript</span>
                    </div>
                    <Chip size="sm" color="primary">
                      Published
                    </Chip>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminDetailChapter;
