"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Input, Textarea } from "@nextui-org/input";
import { Grip, Link, Plus, Share, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const AdminDetailCourse = () => {
  const { course_id } = useParams();
  const router = useRouter();
  return (
    <div className="space-y-4">
      {" "}
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl">Detail Course</h3>
          <p className="text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            quisquam?
          </p>
        </div>
        <div className="flex space-x-2">
          <Button startContent={<Trash className="w-4 h-4" />} color="danger">
            Delete
          </Button>
          <Button startContent={<Share className="w-4 h-4" />} color="primary">
            Publish
          </Button>
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
                label="Course Name"
                labelPlacement="outside"
                placeholder="Enter your name"
              />
              <Input
                startContent={<Link />}
                label="Introdction video"
                labelPlacement="outside"
                placeholder="Enter video link"
              />
              <Input
                isRequired
                label="Category"
                labelPlacement="outside"
                placeholder="Enter category"
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
              <h3 className="text-xl">Chapter</h3>
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
                    onClick={() => {
                      router.push(`/admin/course/${course_id}/${key}`);
                    }}
                    className="bg-[#27272A] cursor-pointer py-2.5 px-3 rounded-xl flex items-center justify-between "
                  >
                    <div className="flex items-center space-x-2">
                      <Grip className="h-4 w-4" />
                      <span>Course Typescript</span>
                    </div>
                    <div className="space-x-1">
                      <Chip size="sm">1 Unpublished</Chip>
                      <Chip size="sm" color="primary">
                        1 Published
                      </Chip>
                    </div>
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

export default AdminDetailCourse;
