import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";
import { Grip } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import { useParams, useRouter } from "next/navigation";

import { useRaisedShadow } from "../../../../playgrounds/use-raished-shadow";

import { ContentType } from "@/types/content.type";

interface Props {
  item: string;
  data: string[];
  currentData: ContentType[];
  handleChangePosition: VoidFunction;
}

export const ItemContent = ({
  item,
  data,
  currentData,
  handleChangePosition,
}: Props) => {
  const y = useMotionValue(0);
  const { course_id, chapter_id } = useParams();
  const boxShadow = useRaisedShadow(y);
  const router = useRouter();
  const obj = currentData.find((val) => val.title == item);

  return (
    <Reorder.Item
      className="bg-[#27272A] cursor-pointer py-2.5 px-3 rounded-xl flex items-center justify-between"
      id={item}
      style={{ boxShadow, y }}
      value={item}
      onClick={() => {
        router.push(`/admin/course/${course_id}/${chapter_id}/${obj?.id}`);
      }}
      onDragEnd={(val) => {
        handleChangePosition();
      }}
    >
      <div className="flex items-center space-x-2">
        <Grip className="h-4 w-4" />
        <span>
          {item}
          {/* {val.title} */}
        </span>
      </div>
      <div className="space-x-1">
        {obj?.is_published ? (
          <Chip color="primary" size="sm">
            Published
          </Chip>
        ) : (
          <Chip color="default" size="sm">
            Draft
          </Chip>
        )}
        {/* <Chip size="sm">{countContentUnPublished} Unpublished</Chip> */}
      </div>
    </Reorder.Item>
  );
};
