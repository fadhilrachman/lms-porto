import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Check, CheckCheck } from "lucide-react";
import React from "react";

const ChapterSidebar = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className="min-w-[400px]">
      <Accordion variant="splitted" defaultExpandedKeys={"1"}>
        <AccordionItem key="1" aria-label="Chapter 1" title="Chapter 1">
          {/* {defaultContent} */}
          <div className="space-y-4">
            <div className="cursor-pointer rounded-xl bg-neutral-800  px-4 py-3">
              <span>Content 1</span>
            </div>{" "}
            <div className="cursor-pointer flex justify-between rounded-xl bg-neutral-800  px-4 py-3">
              <span>Content 1</span>
              <CheckCheck className="text-green-500" />
            </div>
          </div>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Chapter 2" title="Chapter 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Chapter 3" title="Chapter 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ChapterSidebar;
