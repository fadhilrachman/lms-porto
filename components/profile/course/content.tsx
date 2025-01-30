import VideoRender from "@/components/shared/video-render";
import { Button } from "@nextui-org/button";
import React from "react";

const Content = () => {
  return (
    <div className="w-full space-y-6 pb-12">
      <VideoRender url="https://www.youtube.com/watch?v=nyBHBL6HjRI&list=RDMMnyBHBL6HjRI&start_radio=1" />
      <div className="flex justify-between border-b border-borderColor pb-4">
        <h3 className="text-2xl">Judul</h3>
        <Button color="primary">Complete</Button>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        quaerat nulla voluptate assumenda, iusto recusandae repudiandae
        adipisci! Impedit quod a assumenda obcaecati porro cum explicabo
        quisquam, vitae reprehenderit omnis quaerat?
      </p>
    </div>
  );
};

export default Content;
