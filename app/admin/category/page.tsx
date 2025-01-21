"use client";
import CreateCategory from "@/components/admin/category/create-category";
import BaseInputSearch from "@/components/shared/base-input-search";
import BaseTable, { ColumnTable } from "@/components/shared/base-table";
import { useGetCategory } from "@/hooks/category.hook";
import { CategoryType } from "@/types/category.type";
import { Button } from "@nextui-org/button";
import { Delete, Edit, Eye, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import * as VscIcons from "react-icons/si";

const Category = () => {
  const [dialog, setDialog] = useState({ create: false, update: false });
  const availableIcons = Object.keys(VscIcons);

  const [params, setPrams] = useState({ search: "" });
  const { data, isFetching } = useGetCategory({ page: 1, per_page: 10 });

  console.log({ availableIcons });

  const columns: ColumnTable<CategoryType>[] = [
    {
      key: "name",
      label: "Name",
    },

    // {
    //   key: "created_at",
    //   label: "Created At",

    // },

    {
      key: "sasd",
      label: "Action",
      render: (_, obj) => {
        return (
          <div className="space-x-2">
            <Button
              // size={"small"}
              onPress={() => {
                // router.push(`/admin/course/${obj.id}`);
              }}
              size="sm"
              startContent={<Edit className="h-4 w-4" />}
              isIconOnly
            />
            <Button
              // size={"small"}
              onPress={() => {
                // router.push(`/admin/course/${obj.id}`);
              }}
              size="sm"
              color="danger"
              startContent={<Trash className="h-4 w-4" />}
              isIconOnly
            />
          </div>
        );
      },
    },
  ];
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
      <BaseInputSearch
        onChange={(e) => {
          setPrams((p) => ({ ...p, search: e }));
        }}
        placeholder="Search Category"
      />
      <BaseTable
        columns={columns}
        data={data?.result || []}
        isLoading={isFetching}
      />
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
