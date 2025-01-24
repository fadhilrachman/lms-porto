import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Grip, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { ChapterType } from "@/types/chapter.type";
import ModalCreateChapter from "./chapter/modal-create-chapter";
import Dnd from "@/components/playgrounds/dnd";

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
        {data?.length == 0 ? (
          "tidak ada data"
        ) : (
          <Dnd data={data?.map((val) => val.title)} />
        )}
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
