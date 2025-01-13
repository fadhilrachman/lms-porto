"use client";
import FormGeneralCourse from "@/components/admin/course/form-general-course";
import ListChapter from "@/components/admin/course/list-chapter";
import LoadingFullpage from "@/components/shared/loading-fullpage";
import { useGetDetailCourse } from "@/hooks/course.hook";
import { Button } from "@nextui-org/button";
import { Share, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const AdminDetailCourse = () => {
  const { course_id } = useParams();
  const { data, isFetching } = useGetDetailCourse(course_id as string);
  const router = useRouter();
  return (
    <div className="space-y-4">
      {isFetching && <LoadingFullpage />}
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl">Detail Course</h3>
          <p className="text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            quisquam?
          </p>
        </div>
        <div className="flex space-x-2">
          <Button startContent={<Trash className="w-4 h-4" />} color="danger">
            Delete
          </Button>
          <Button startContent={<Share className="w-4 h-4" />} color="primary">
            Publish
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <FormGeneralCourse
          description={data?.result.description as string}
          title={data?.result.title as string}
          introduction_vid={data?.result.introduction_vid as string}
          isLoading={isFetching}
        />
        <ListChapter />
      </div>
    </div>
  );
};

export default AdminDetailCourse;
