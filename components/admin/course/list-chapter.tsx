import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Grip, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { ChapterType } from "@/types/chapter.type";
import ModalCreateChapter from "./chapter/modal-create-chapter";
import Dnd from "@/components/admin/course/chapter/dnd";
import { Spinner } from "@nextui-org/spinner";

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
  console.log({ data });

  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between w-full">
          <h3 className="text-xl">Chapter</h3>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            size="sm"
            type="button"
            disabled={isLoading}
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
            <Dnd data={data?.map((val) => val.title)} currentData={data} />
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
