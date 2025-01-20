"use client";
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
import { Button } from "@nextui-org/button";
import { Grip, Link, Plus, Share, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

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
            <h3 className="text-2xl">Detail Course</h3>
            <p className="text-neutral-500">
              Manage your content details and chapters with ease
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onPress={() => {
              setModal((p) => ({ ...p, deleteContent: true }));
            }}
            startContent={<Trash className="w-4 h-4" />}
            type="button"
            color="danger"
          >
            Delete
          </Button>
          {data?.result.is_published ? (
            <Button
              startContent={<Share className="w-4 h-4" />}
              color="secondary"
              onPress={() => {
                setModal((p) => ({ ...p, publishContent: true }));
              }}
            >
              Un Publish
            </Button>
          ) : (
            <Button
              startContent={<Share className="w-4 h-4" />}
              color="primary"
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
          title={data?.result?.title as string}
          content_vid={data?.result?.content_vid as string}
          description={data?.result?.description as string}
          isLoading={isFetching}
        />
      </div>
      <ModalDelete
        onDelete={handleDelete}
        isLoading={status == "pending"}
        isOpen={modal.deleteContent}
        onOpenChange={() => {
          setModal((p) => ({ ...p, deleteContent: false }));
        }}
      />
      <ModalPublish
        type="content"
        onPublish={() => {
          handlePublishUnpublish(!data?.result?.is_published as boolean);
        }}
        isLoading={statusPatch == "pending"}
        isOpen={modal.publishContent}
        onOpenChange={() => {
          setModal((p) => ({ ...p, publishContent: false }));
        }}
      />
    </div>
  );
};

export default AdminDetailChapter;
