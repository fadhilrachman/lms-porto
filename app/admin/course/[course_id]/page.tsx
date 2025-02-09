"use client";
import { Button } from "@nextui-org/button";
import { Share, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import FormGeneralCourse from "@/components/admin/course/form-general-course";
import ListChapter from "@/components/admin/course/list-chapter";
import ButtonBack from "@/components/shared/button-back";
import LoadingFullpage from "@/components/shared/loading-fullpage";
import ModalDelete from "@/components/shared/modal-delete";
import ModalPublish from "@/components/shared/modal-publish";
import {
  useDeleteCourse,
  useGetDetailCourseAdmin,
  usePatchCourse,
} from "@/hooks/course.hook";
import { Alert } from "@heroui/alert";

const AdminDetailCourse = () => {
  const [modal, setModal] = useState({
    deleteContent: false,
    publishContent: false,
  });
  const { course_id } = useParams();
  const { data, isFetching, status } = useGetDetailCourseAdmin(
    course_id as string
  );
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
    <div className="space-y-4 pb-8">
      {status == "pending" && <LoadingFullpage />}
      {!data?.result?.is_published && (
        <Alert
          description={
            "You must be create content first and publish this course"
          }
          title={"Public Can't access this course"}
          color="warning"
        />
      )}
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
            color="danger"
            startContent={<Trash className="w-4 h-4" />}
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
      <div className="grid grid-cols-2 gap-8">
        <FormGeneralCourse
          category_id={data?.result?.category?.id}
          thumbnail_img={data?.result.thumbnail_img as string}
          price={data?.result.price || 0}
          description={data?.result.description as string}
          introduction_vid={data?.result.introduction_vid as string}
          isLoading={isFetching}
          title={data?.result.title as string}
        />
        <ListChapter data={data?.result.chapter || []} isLoading={isFetching} />
      </div>
      <ModalDelete
        isLoading={statusDelete == "pending"}
        isOpen={modal.deleteContent}
        onDelete={handleDelete}
        onOpenChange={() => {
          setModal((p) => ({ ...p, deleteContent: false }));
        }}
      />
      <ModalPublish
        isLoading={statusPatch == "pending"}
        isOpen={modal.publishContent}
        type="course"
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

export default AdminDetailCourse;
