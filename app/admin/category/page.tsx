"use client";
import CreateCategory from "@/components/admin/category/create-category";
import ListCategory from "@/components/admin/category/list-category";
import UpdateCategory from "@/components/admin/category/update-category";
import BaseIcon from "@/components/shared/base-icon";
import BaseInputSearch from "@/components/shared/base-input-search";
import BaseTable, { ColumnTable } from "@/components/shared/base-table";
import ModalDelete from "@/components/shared/modal-delete";
import { useDeleteCategory, useGetCategory } from "@/hooks/category.hook";
import { CategoryType } from "@/types/category.type";
import { Button } from "@nextui-org/button";
import { Delete, Edit, Eye, Plus, Trash } from "lucide-react";
import React, { useState } from "react";

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
          startContent={<Plus />}
          color="primary"
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
