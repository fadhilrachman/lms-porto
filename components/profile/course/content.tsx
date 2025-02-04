import VideoRender from '@/components/shared/video-render';
import { useGetDetailContent } from '@/hooks/content.hook';
import { usePatchUserCourse } from '@/hooks/course-user.hooks';
import { Button } from '@nextui-org/button';
import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { Skeleton } from '@heroui/skeleton';

const Content = () => {
  const [contentId, _] = useQueryState('content');

  const { data, isFetching, refetch } = useGetDetailContent(contentId);
  const { mutate, status } = usePatchUserCourse(contentId);

  console.log(data?.result, 'asdfasdfadf');
  useEffect(() => {
    refetch();
  }, [contentId]);

  return (
    <div className="w-full space-y-6 py-6">
      {!isFetching ? (
        <VideoRender
          url={data?.result?.content_vid}
          // onEnd={()=>}
        />
      ) : (
        <Skeleton className=" h-80 rounded-md flex justify-center items-center" />
      )}
      <div className="flex justify-between border-b border-borderColor pb-4">
        <h3 className="text-2xl">{data?.result?.title}</h3>
        <Button
          color="primary"
          isLoading={status === 'pending'}
          onPress={() => mutate()}
        >
          Complete
        </Button>
      </div>
      <p>{data?.result?.description}</p>
    </div>
  );
};

export default Content;
