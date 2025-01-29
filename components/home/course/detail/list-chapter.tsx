import { ChapterType } from "@/types/user/chapter.type";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Check, CheckCheck, Lock, VideoIcon } from "lucide-react";
import React from "react";

const ListChapter = ({ chapter }: { chapter: ChapterType[] }) => {
  return (
    <div className="min-w-[400px]">
      <Accordion
        variant="splitted"
        className="!space-y-3"
        defaultExpandedKeys={"0"}
      >
        {chapter.map((val, key) => {
          return (
            <AccordionItem
              key={key.toString()}
              aria-label="Chapter 1"
              title={val.title}
            >
              <div className="space-y-3">
                {val.content.map((valContent, keyContent) => {
                  return (
                    <div key={keyContent} className="space-y-4">
                      <div className="cursor-pointer flex justify-between items-center rounded-xl bg-neutral-800  px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <VideoIcon />
                          <span>{valContent.title}</span>
                        </div>
                        <Lock />
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ListChapter;
