import VideoRender from "@/components/shared/video-render";
import { useGetDetailContent } from "@/hooks/content.hook";
import { usePatchUserCourse } from "@/hooks/course-user.hooks";
import { Button } from "@nextui-org/button";
import { useQueryState } from "nuqs";
import React, { useEffect } from "react";
import { Skeleton } from "@heroui/skeleton";
import { useParams, useRouter } from "next/navigation";

const Content = () => {
  const { course_id } = useParams();
  const [content_id, _] = useQueryState("content_id");
  const router = useRouter();

  const { data, isFetching, refetch } = useGetDetailContent(
    content_id as string
  );
  const { mutateAsync, status } = usePatchUserCourse(course_id as string);

  console.log(data?.result, "asdfasdfadf");
  useEffect(() => {
    refetch();
  }, [content_id]);

  const handleComplated = async () => {
    const result = await mutateAsync({ content_id: content_id as string });
    // router.push(result?.next_content_id);
  };

  return (
    <div className="w-full space-y-6 py-6">
      {!isFetching ? (
        <VideoRender url={data?.result?.content_vid} onEnd={handleComplated} />
      ) : (
        <Skeleton className=" h-80 rounded-md flex justify-center items-center" />
      )}
      <div className="flex justify-between border-b border-borderColor pb-4">
        <h3 className="text-2xl">{data?.result?.title}</h3>
        <Button
          color="primary"
          isLoading={status === "pending"}
          onPress={handleComplated}
        >
          Complete
        </Button>
      </div>
      <p>{data?.result?.description}</p>
    </div>
  );
};

export default Content;
