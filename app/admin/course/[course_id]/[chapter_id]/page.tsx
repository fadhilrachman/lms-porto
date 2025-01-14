"use client";
import FormChapter from "@/components/admin/course/chapter/form-chapter";
import ListContent from "@/components/admin/course/chapter/list-content";
import ButtonBack from "@/components/shared/button-back";
import LoadingFullpage from "@/components/shared/loading-fullpage";
import { useGetDetailChapter } from "@/hooks/chapter.hook";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Input, Textarea } from "@nextui-org/input";
import { Grip, Link, Plus, Share, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const AdminDetailChapter = () => {
  const { course_id, chapter_id } = useParams();
  const { data, isFetching } = useGetDetailChapter(chapter_id as string);
  return (
    <div className="space-y-4">
      {isFetching && <LoadingFullpage />}{" "}
      <div className="flex justify-between">
        <div className="flex justify-center items-center space-x-2">
          <ButtonBack href={`/admin/course/${course_id}`} />
          <div>
            {" "}
            <h3 className="text-2xl">Detail Chapter</h3>
            <p className="text-neutral-500">
              Manage your chapter details and chapters with ease
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <FormChapter
          title={data?.result?.title as string}
          isLoading={isFetching}
        />
        <ListContent data={data?.result?.content || []} />
      </div>
    </div>
  );
};

export default AdminDetailChapter;
