import BaseInputSearch from "@/components/shared/base-input-search";
import BasePagination from "@/components/shared/base-pagination";
import BaseTable, { ColumnTable } from "@/components/shared/base-table";
import ModalDelete from "@/components/shared/modal-delete";
import { useDeleteAdmin, useGetAdmin } from "@/hooks/admin.hook";
import { AdminType } from "@/types/admin.type";
import { Button } from "@nextui-org/button";
import { Edit, Trash } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ListAdmin = () => {
  const [params, setParams] = useState({ search: "", page: 1, per_page: 10 });
  const [dialog, setDialog] = useState({
    delete: false,
  });
  const [selected, setSelected] = useState<AdminType>();
  const { data, isFetching, refetch } = useGetAdmin(params);
  const { mutateAsync, status } = useDeleteAdmin(selected?.id as string);

  const handleDelete = async () => {
    await mutateAsync();
    setDialog((p) => ({ ...p, delete: false }));
  };

  const columns: ColumnTable<AdminType>[] = [
    { key: "user_name", label: "Username" },
    { key: "email", label: "Email" },
    {
      key: "created_at",
      label: "Created At",
      render: (value) => <span>{moment(value).format("YYYY/MM/DD")}</span>,
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
        placeholder="Search Admin"
      />
      <div className="space-y-2">
        <BaseTable
          columns={columns}
          data={data?.result || []}
          isLoading={isFetching}
        />
        <BasePagination
          page={1}
          totalData={data?.pagination?.total_data || 0}
          totalPage={data?.pagination?.total_page || 0}
          onChangePage={(e) => {
            setParams((p) => ({ ...p, page: e }));
          }}
        />
      </div>
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

export default ListAdmin;
