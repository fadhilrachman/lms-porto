import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";

import ModalCreateChapter from "./chapter/modal-create-chapter";

import { ChapterType } from "@/types/chapter.type";
import Dnd from "@/components/admin/course/chapter/dnd";

const ListChapter = ({
  data,
  isLoading,
}: {
  data: ChapterType[];
  isLoading: boolean;
}) => {
  const { course_id } = useParams();
  const [modal, setModal] = useState({
    chapterCreate: false,
  });
  const router = useRouter();

  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between w-full">
          <h3 className="text-xl">Chapter</h3>
          <Button
            color="primary"
            disabled={isLoading}
            size="sm"
            startContent={<Plus className="w-4 h-4" />}
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
        <div className="relative">
          {isLoading && (
            <div className="absolute z-40 w-full flex items-center justify-center h-full bg-opacity-5 bg-slate-50">
              <Spinner />
            </div>
          )}
          {data?.length == 0 ? (
            "tidak ada data"
          ) : (
            <Dnd currentData={data} data={data?.map((val) => val.title)} />
          )}
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
