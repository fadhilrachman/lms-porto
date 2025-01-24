// import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

export default function Dnd({ data }: { data: string[] }) {
  const [items, setItems] = useState(data);
  console.log({ data });

  return (
    <Reorder.Group
      className="space-y-4"
      //   axis="y"
      //   onClick={()=>{
      //     console.log();

      //   }}
      onReorder={(val) => {
        console.log({ val });

        setItems(val);
      }}
      values={items}
    >
      {items.map((item) => {
        return <Item key={item} item={item} />;
      })}
    </Reorder.Group>
  );
}
