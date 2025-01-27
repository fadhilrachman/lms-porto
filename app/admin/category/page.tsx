"use client";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";

import CreateCategory from "@/components/admin/category/create-category";
import ListCategory from "@/components/admin/category/list-category";

const Category = () => {
  const [dialog, setDialog] = useState({
    create: false,
  });

  return (
    <div className="space-y-4">
      {" "}
      <div className="flex justify-between">
        {/* <SiReact /> */}
        <h3 className="text-2xl">Category</h3>
        <Button
          color="primary"
          startContent={<Plus />}
          onPress={() => {
            setDialog((p) => ({ ...p, create: true }));

            //   setModal((p) => ({ ...p, create: true }));
          }}
        >
          Create Category
        </Button>
      </div>
      <ListCategory />
      <CreateCategory
        isOpen={dialog.create}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, create: false }));
        }}
      />
    </div>
  );
};

export default Category;
