"use client";
import FormGeneralCourse from "@/components/admin/course/form-general-course";
import ListChapter from "@/components/admin/course/list-chapter";
import ButtonBack from "@/components/shared/button-back";
import LoadingFullpage from "@/components/shared/loading-fullpage";
import ModalDelete from "@/components/shared/modal-delete";
import ModalPublish from "@/components/shared/modal-publish";
import {
  useDeleteCourse,
  useGetDetailCourse,
  usePatchCourse,
} from "@/hooks/course.hook";
import { Button } from "@nextui-org/button";
import { ChevronLeft, Share, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminDetailCourse = () => {
  const [modal, setModal] = useState({
    deleteContent: false,
    publishContent: false,
  });
  const { course_id } = useParams();
  const { data, isFetching, status } = useGetDetailCourse(course_id as string);
  const router = useRouter();
  const { mutateAsync: mutateAsyncDelete, status: statusDelete } =
    useDeleteCourse(course_id as string);
  const { mutateAsync: mutatePatchAsync, status: statusPatch } = usePatchCourse(
    course_id as string
  );
  const handleDelete = async () => {
    await mutateAsyncDelete();
    setModal((p) => ({ ...p, deleteContent: false }));
    router.push(`/admin/course`);
  };
  const handlePublishUnpublish = async (isPublished: boolean) => {
    await mutatePatchAsync({ is_published: isPublished });
    setModal((p) => ({ ...p, publishContent: false }));
  };
  return (
    <div className="space-y-4">
      {status == "pending" && <LoadingFullpage />}
      <div className="flex justify-between">
        <div className="flex justify-center items-center space-x-2">
          <ButtonBack href="/admin/course" />
          <div>
            {" "}
            <h3 className="text-2xl">Detail Course</h3>
            <p className="text-neutral-500">
              Manage your course details and chapters with ease
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onPress={() => {
              setModal((p) => ({ ...p, deleteContent: true }));
            }}
            startContent={<Trash className="w-4 h-4" />}
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
      <div className="grid grid-cols-2 gap-8">
        <FormGeneralCourse
          description={data?.result.description as string}
          title={data?.result.title as string}
          introduction_vid={data?.result.introduction_vid as string}
          isLoading={isFetching}
        />
        <ListChapter data={data?.result.chapter || []} isLoading={isFetching} />
      </div>
      <ModalDelete
        onDelete={handleDelete}
        isLoading={statusDelete == "pending"}
        isOpen={modal.deleteContent}
        onOpenChange={() => {
          setModal((p) => ({ ...p, deleteContent: false }));
        }}
      />
      <ModalPublish
        type="course"
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

export default AdminDetailCourse;
