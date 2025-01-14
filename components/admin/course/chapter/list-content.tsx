import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Grip, Plus } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import { ContentType } from "@/types/content.type";
import { useParams, useRouter } from "next/navigation";

const ListContent = ({ data }: { data: ContentType[] }) => {
  const { course_id, chapter_id } = useParams();
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full">
          <h3 className="text-xl">Content</h3>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            size="sm"
          >
            Create Content
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {data.map((val, key) => {
            return (
              <div
                key={key}
                onClick={() => {
                  router.push(
                    `/admin/course/${course_id}/${chapter_id}/${val.id}`
                  );
                }}
                className="bg-[#27272A] cursor-pointer py-2.5 px-3 rounded-xl flex items-center justify-between "
              >
                <div className="flex items-center space-x-2">
                  <Grip className="h-4 w-4" />
                  <span>{val.title}</span>
                </div>
                {val?.is_published ? (
                  <Chip size="sm" color="primary">
                    Published
                  </Chip>
                ) : (
                  <Chip size="sm">Draft</Chip>
                )}
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default ListContent;
