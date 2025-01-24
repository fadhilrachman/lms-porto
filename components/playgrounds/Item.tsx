import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";
import { useRaisedShadow } from "./use-raished-shadow";
import { Grip } from "lucide-react";
import { Chip } from "@nextui-org/chip";

interface Props {
  item: string;
}

export const Item = ({ item }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      className="bg-[#27272A] cursor-pointer py-2.5 px-3 rounded-xl flex items-center justify-between"
      value={item}
      id={item}
      //   onDragEnd={(val) => {
      //     console.log({ cuy: val });
      //   }}
      style={{ boxShadow, y }}
    >
      <div className="flex items-center space-x-2">
        <Grip className="h-4 w-4" />
        <span>
          {item}
          {/* {val.title} */}
        </span>
      </div>
      <div className="space-x-1">
        {/* <Chip size="sm">{countContentUnPublished} Unpublished</Chip> */}
        <Chip size="sm" color="primary">
          2 Published
        </Chip>
      </div>
    </Reorder.Item>
  );
};
