import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";

import DndContent from "./content/dnd-content";
import ModalCreateContent from "./content/modal-create-content";

import { ContentType } from "@/types/content.type";

const ListContent = ({
  data,
  isLoading,
}: {
  data: ContentType[];

  isLoading: boolean;
}) => {
  const [modal, setModal] = useState({
    createContent: false,
  });
  const { course_id, chapter_id } = useParams();
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full">
          <h3 className="text-xl">Content</h3>
          <Button
            color="primary"
            size="sm"
            startContent={<Plus className="w-4 h-4" />}
            onPress={() => {
              setModal((p) => ({ ...p, createContent: true }));
            }}
          >
            Create Content
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
            <DndContent
              currentData={data}
              data={data?.map((val) => val.title)}
            />
          )}
        </div>
      </CardBody>
      <ModalCreateContent
        isOpen={modal.createContent}
        onOpenChange={() => {
          setModal((p) => ({ ...p, createContent: false }));
        }}
      />
    </Card>
  );
};

export default ListContent;
