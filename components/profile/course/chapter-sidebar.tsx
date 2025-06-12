import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { ArrowLeft, Check, CheckCheck, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useEffect } from "react";

export const contentNav = [
  {
    key: 1,
    title: "content 1",
    content: [
      {
        sub_title: "content 1",
        isChecked: true,
      },
      {
        sub_title: "content 2",
        isChecked: false,
      },
    ],
  },
  {
    key: 2,
    title: "content 1",
    content: [
      {
        sub_title: "content 1",
        isChecked: true,
      },
      {
        sub_title: "content 2",
        isChecked: false,
      },
    ],
  },
  {
    key: 3,
    title: "content 1",
    content: [
      {
        sub_title: "content 1",
        isChecked: true,
      },
      {
        sub_title: "content 2",
        isChecked: false,
      },
    ],
  },
];
const ChapterSidebar = ({ chapter }: any) => {
  const [content_id, setContent_id] = useQueryState("content_id");
  const router = useRouter();
  useEffect(() => {
    if (chapter?.length > 0) {
      setContent_id(chapter[0]?.content[0]?.id);
    }
  }, []);

  return (
    <div className="hidden lg:block min-w-[350px] space-y-6 z-50 h-full fixed py-6 px-3 border-r border-neutral-800">
      <div className="flex items-center gap-3 px-3">
        <Button variant="light" onPress={() => router.back()}>
          <ArrowLeft />
          <span className="!font-semibold text-lg">My Courses</span>
        </Button>
      </div>
      <Accordion
        variant="splitted"
        defaultExpandedKeys={"1"}
        className="max-w-full"
      >
        {chapter?.map((item: any, i: number) => (
          <AccordionItem
            key={i + 1}
            aria-label={item?.title}
            title={<p className="font-semibold">{item?.title}</p>}
          >
            <div className="space-y-3">
              {item?.content.map((res, i) => (
                <div
                  key={i}
                  className={`cursor-pointer flex justify-between rounded-xl ${content_id == res.id ? "bg-neutral-600" : "bg-neutral-800"}  px-4 py-3`}
                  onClick={() => setContent_id(res?.id)}
                >
                  <div className="space-x-3 flex items-center">
                    <VideoIcon />
                    <span>{res?.title}</span>
                  </div>
                  {res?.content_progress?.length > 0 && (
                    <CheckCheck className="text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ChapterSidebar;
