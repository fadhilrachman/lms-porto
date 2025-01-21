"use client";
import CreateCategory from "@/components/admin/category/create-category";
import UpdateCategory from "@/components/admin/category/update-category";
import BaseIcon from "@/components/shared/base-icon";
import BaseInputSearch from "@/components/shared/base-input-search";
import BasePagination from "@/components/shared/base-pagination";
import BaseTable, { ColumnTable } from "@/components/shared/base-table";
import ModalDelete from "@/components/shared/modal-delete";
import { useDeleteCategory, useGetCategory } from "@/hooks/category.hook";
import { CategoryType } from "@/types/category.type";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { Delete, Edit, Eye, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

const ListCategory = () => {
  const [dialog, setDialog] = useState({
    update: false,
    delete: false,
  });
  const [selected, setSelected] = useState<CategoryType>();

  const [params, setParams] = useState({ search: "", page: 1, per_page: 10 });
  const { data, isFetching, refetch } = useGetCategory(params);
  const { mutateAsync, status } = useDeleteCategory(selected?.id as string);

  const handleDelete = async () => {
    await mutateAsync();
    setDialog((p) => ({ ...p, delete: false }));
  };

  const columns: ColumnTable<CategoryType>[] = [
    {
      key: "name",
      label: "Name",
      render: (_, obj) => {
        return (
          <div className="flex  space-x-2 items-center">
            <BaseIcon iconKey={obj.icon} />
            <span>{obj.name}</span>
          </div>
        );
      },
    },
    {
      key: "sasd",
      label: "Action",
      render: (_, obj) => {
        return (
          <div className="space-x-2">
            <Button
              // size={"small"}
              onPress={() => {
                setDialog((p) => ({ ...p, update: true }));
                setSelected(obj);
              }}
              size="sm"
              startContent={<Edit className="h-4 w-4" />}
              isIconOnly
            />
            <Button
              // size={"small"}
              onPress={() => {
                setDialog((p) => ({ ...p, delete: true }));
                setSelected(obj);
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

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <div className="space-y-4">
      <BaseInputSearch
        onChange={(e) => {
          setParams((p) => ({ ...p, search: e }));
        }}
        placeholder="Search Category"
      />
      <div className="space-y-2">
        <BaseTable
          columns={columns}
          data={data?.result || []}
          isLoading={isFetching}
        />
        <BasePagination
          page={params.page}
          totalData={data?.pagination?.total_data || 0}
          totalPage={data?.pagination?.total_page || 0}
          onChangePage={(e) => {
            setParams((p) => ({ ...p, page: e }));
          }}
        />
      </div>
      <UpdateCategory
        isOpen={dialog.update}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, update: false }));
        }}
        data={selected as CategoryType}
      />
      <ModalDelete
        isOpen={dialog.delete}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, delete: false }));
        }}
        onDelete={handleDelete}
        isLoading={status == "pending"}
      />
    </div>
  );
};

export default ListCategory;
