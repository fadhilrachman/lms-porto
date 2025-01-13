import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Grip, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";

const ListChapter = () => {
  const { course_id } = useParams();
  const router = useRouter();

  return (
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
  );
};

export default ListChapter;
