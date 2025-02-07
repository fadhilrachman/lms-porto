import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

import BaseInputSearch from "@/components/shared/base-input-search";
import BasePagination from "@/components/shared/base-pagination";
import BaseTable, { ColumnTable } from "@/components/shared/base-table";
import ModalDelete from "@/components/shared/modal-delete";
import { useDeleteCustomer, useGetCustomer } from "@/hooks/customer.hook";
import { CustomerType } from "@/types/customer.type";

const ListCustomer = () => {
  const [params, setParams] = useState({ search: "", page: 1, per_page: 10 });
  const [dialog, setDialog] = useState({
    delete: false,
  });
  const [selected, setSelected] = useState<CustomerType>();
  const { data, isFetching, refetch } = useGetCustomer(params);
  const { mutateAsync, status } = useDeleteCustomer(selected?.id as string);

  const handleDelete = async () => {
    await mutateAsync();
    setDialog((p) => ({ ...p, delete: false }));
  };

  const columns: ColumnTable<CustomerType>[] = [
    {
      key: "user_name",
      label: "Username",
      render: (_, obj) => (
        <div className="flex items-center space-x-2">
          {/* <Avatar
            isBordered
            as="button"
            color="primary"
            name={obj.user_name}
            size="sm"
            // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          /> */}
          <span>{obj.user_name}</span>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    {
      key: "created_at",
      label: "Created At",
      render: (value) => <span>{moment(value).format("YYYY/MM/DD")}</span>,
    },
    {
      key: "count",
      label: "Course Have",
      render: (_, obj) => <span>{obj._count.transaction}</span>,
    },
    {
      key: "sasd",
      label: "Action",
      render: (_, obj) => {
        return (
          <div className="space-x-2">
            <Button
              // size={"small"}
              isIconOnly
              color="danger"
              size="sm"
              startContent={<Trash className="h-4 w-4" />}
              onPress={() => {
                setDialog((p) => ({ ...p, delete: true }));
                setSelected(obj);
              }}
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
        placeholder="Search Customer"
        onChange={(e) => {
          setParams((p) => ({ ...p, search: e }));
        }}
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
        isLoading={status == "pending"}
        isOpen={dialog.delete}
        onDelete={handleDelete}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, delete: false }));
        }}
      />
    </div>
  );
};

export default ListCustomer;
