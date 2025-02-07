"use client";
import { Button } from "@nextui-org/button";
import { Share, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import FormContent from "@/components/admin/course/chapter/content/form-content";
import ButtonBack from "@/components/shared/button-back";
import LoadingFullpage from "@/components/shared/loading-fullpage";
import ModalDelete from "@/components/shared/modal-delete";
import ModalPublish from "@/components/shared/modal-publish";
import {
  useDeleteContent,
  useGetDetailContent,
  usePatchContent,
} from "@/hooks/content.hook";

const AdminDetailChapter = () => {
  const router = useRouter();
  const [modal, setModal] = useState({
    deleteContent: false,
    publishContent: false,
  });
  const { course_id, chapter_id, content_id } = useParams();
  const { data, isFetching } = useGetDetailContent(content_id as string);
  const { mutateAsync, status } = useDeleteContent(content_id as string);
  const { mutateAsync: mutatePatchAsync, status: statusPatch } =
    usePatchContent(content_id as string);

  const handlePublishUnpublish = async (isPublished: boolean) => {
    await mutatePatchAsync({ is_published: isPublished });
    setModal((p) => ({ ...p, publishContent: false }));
  };
  const handleDelete = async () => {
    await mutateAsync();
    setModal((p) => ({ ...p, deleteContent: false }));
    router.push(`/admin/course/${course_id}/${chapter_id}`);
  };

  return (
    <div className="space-y-4">
      {isFetching && <LoadingFullpage />}{" "}
      <div className="flex justify-between">
        <div className="flex justify-center items-center space-x-2">
          <ButtonBack href={`/admin/course/${course_id}/${chapter_id}`} />
          <div>
            {" "}
            <h3 className="text-2xl">Detail Content</h3>
            <p className="text-neutral-500">
              Manage your content details and chapters with ease
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            color="danger"
            startContent={<Trash className="w-4 h-4" />}
            type="button"
            onPress={() => {
              setModal((p) => ({ ...p, deleteContent: true }));
            }}
          >
            Delete
          </Button>
          {data?.result.is_published ? (
            <Button
              color="secondary"
              startContent={<Share className="w-4 h-4" />}
              onPress={() => {
                setModal((p) => ({ ...p, publishContent: true }));
              }}
            >
              Un Publish
            </Button>
          ) : (
            <Button
              color="primary"
              startContent={<Share className="w-4 h-4" />}
              type="button"
              onPress={() => {
                setModal((p) => ({ ...p, publishContent: true }));
              }}
            >
              Publish
            </Button>
          )}
        </div>
      </div>
      <div className="gap-8">
        <FormContent
          content_vid={data?.result?.content_vid as string}
          description={data?.result?.description as string}
          isLoading={isFetching}
          title={data?.result?.title as string}
        />
      </div>
      <ModalDelete
        isLoading={status == "pending"}
        isOpen={modal.deleteContent}
        onDelete={handleDelete}
        onOpenChange={() => {
          setModal((p) => ({ ...p, deleteContent: false }));
        }}
      />
      <ModalPublish
        isLoading={statusPatch == "pending"}
        isOpen={modal.publishContent}
        type="content"
        onOpenChange={() => {
          setModal((p) => ({ ...p, publishContent: false }));
        }}
        onPublish={() => {
          handlePublishUnpublish(!data?.result?.is_published as boolean);
        }}
      />
    </div>
  );
};

export default AdminDetailChapter;
