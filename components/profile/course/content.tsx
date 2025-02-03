import VideoRender from '@/components/shared/video-render';
import { Button } from '@nextui-org/button';
import { useQueryState } from 'nuqs';
import React from 'react';

const Content = ({ content }: any) => {
  console.log(content);
  return (
    <>
      {content?.map((item: any, i: any) => (
        <div key={i} className="w-full space-y-6 pb-12">
          <VideoRender
            url={
              item?.content_vid ||
              'https://www.youtube.com/watch?v=nyBHBL6HjRI&list=RDMMnyBHBL6HjRI&start_radio=1'
            }
          />
          <div className="flex justify-between border-b border-borderColor pb-4">
            <h3 className="text-2xl">{item?.title}</h3>
            <Button color="primary">Complete</Button>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            quaerat nulla voluptate assumenda, iusto recusandae repudiandae
            adipisci! Impedit quod a assumenda obcaecati porro cum explicabo
            quisquam, vitae reprehenderit omnis quaerat?
          </p>
        </div>
      ))}
    </>
  );
};

export default Content;
