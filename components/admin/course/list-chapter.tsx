import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Grip, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { ChapterType } from "@/types/chapter.type";
import ModalCreateChapter from "./chapter/modal-create-chapter";

const ListChapter = ({ data }: { data: ChapterType[] }) => {
  const { course_id } = useParams();
  const [modal, setModal] = useState({
    chapterCreate: false,
  });
  const router = useRouter();
  console.log({ data });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full">
          <h3 className="text-xl">Chapter</h3>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            size="sm"
            type="button"
            onPress={() => {
              setModal((p) => ({ ...p, chapterCreate: true }));
            }}
          >
            Create Chapter
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {data.map((val, key) => {
            const countContentPublished = val.content.filter(
              (item) => item.is_published == true
            ).length;
            const countContentUnPublished = val.content.filter(
              (item) => item.is_published == false
            ).length;
            return (
              <div
                key={key}
                onClick={() => {
                  router.push(`/admin/course/${course_id}/${val.id}`);
                }}
                className="bg-[#27272A] cursor-pointer py-2.5 px-3 rounded-xl flex items-center justify-between "
              >
                <div className="flex items-center space-x-2">
                  <Grip className="h-4 w-4" />
                  <span>{val.title}</span>
                </div>
                <div className="space-x-1">
                  <Chip size="sm">{countContentUnPublished} Unpublished</Chip>
                  <Chip size="sm" color="primary">
                    {countContentPublished} Published
                  </Chip>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
      <ModalCreateChapter
        isOpen={modal.chapterCreate}
        onOpenChange={() => {
          setModal((p) => ({ ...p, chapterCreate: false }));
        }}
      />
    </Card>
  );
};

export default ListChapter;
