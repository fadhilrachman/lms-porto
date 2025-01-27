import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";
import { useRaisedShadow } from "../../../../playgrounds/use-raished-shadow";
import { Grip } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import { ChapterType } from "@/types/chapter.type";
import { useParams, useRouter } from "next/navigation";
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
      value={item}
      id={item}
      onClick={() => {
        router.push(`/admin/course/${course_id}/${chapter_id}/${obj?.id}`);
      }}
      onDragEnd={(val) => {
        handleChangePosition();
      }}
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
        {obj?.is_published ? (
          <Chip size="sm" color="primary">
            Published
          </Chip>
        ) : (
          <Chip size="sm" color="default">
            Draft
          </Chip>
        )}
        {/* <Chip size="sm">{countContentUnPublished} Unpublished</Chip> */}
      </div>
    </Reorder.Item>
  );
};
