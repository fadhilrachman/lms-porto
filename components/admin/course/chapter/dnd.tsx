"use client";
// import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import { ChapterType } from "@/types/chapter.type";
import { usePatchChangePosition } from "@/hooks/chapter.hook";
import { useParams } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";

export default function Dnd({
  data,
  currentData,
}: {
  data: string[];
  currentData: ChapterType[];
}) {
  const { chapter_id } = useParams();
  const [items, setItems] = useState(data);
  const { mutateAsync, status } = usePatchChangePosition();

  const handleChangePosition = async () => {
    const newData = items.map(
      (val) => currentData.find((valCurrent) => val == valCurrent.title)?.id
    );
    await mutateAsync({
      data: newData as string[],
    });
  };

  React.useEffect(() => {
    setItems(data);
  }, [data]);
  return (
    <>
      {status === "pending" && (
        <div className="absolute z-40 w-full flex items-center justify-center h-full bg-opacity-5 bg-slate-50">
          <Spinner />
        </div>
      )}
      {data?.length == 0 ? (
        "Tidak ada data"
      ) : (
        <Reorder.Group
          className="space-y-4"
          //   axis="y"
          onClick={() => {
            console.log("cuuyyy");
          }}
          onReorder={(val) => {
            console.log({ val });

            setItems(val);
          }}
          values={items}
        >
          {items.map((item) => {
            return (
              <Item
                key={item}
                handleChangePosition={handleChangePosition}
                item={item}
                data={items}
                currentData={currentData}
              />
            );
          })}
        </Reorder.Group>
      )}
    </>
  );
}
