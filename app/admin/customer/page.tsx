"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import BaseTable from "@/components/shared/base-table";
import { Pagination } from "@nextui-org/pagination";
import ModalCreateCourse from "@/components/admin/course/modal-create-course";
const Customer = () => {
  const [data, setData] = useState<any[]>([]);
  const [modal, setModal] = useState({ create: false });

  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <span>{value}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-2xl">Customer</h3>
        <Button
          startContent={<Plus />}
          color="primary"
          onPress={() => {
            setModal((p) => ({ ...p, create: true }));
          }}
        >
          Create Customer
        </Button>
      </div>
      <Input
        startContent={<Search />}
        placeholder="Search Course"
        className="w-max"
      />
      <BaseTable
        columns={columns}
        data={[
          { name: "Tony Reichert", role: "CEO", status: "Active" },
          { name: "Zoey Lang", role: "Technical Lead", status: "Paused" },
          { name: "Jane Fisher", role: "Senior Developer", status: "Active" },
          {
            name: "William Howard",
            role: "Community Manager",
            status: "Vacation",
          },
        ]}
        isLoading={false}
      />
      <div className="flex justify-between items-center">
        <p>Show 5 data from 10</p>
        <Pagination loop showControls initialPage={1} total={5} />
      </div>
      <ModalCreateCourse
        isOpen={modal.create}
        onOpenChange={() => {
          setModal((p) => ({ ...p, create: false }));
        }}
      />
    </div>
  );
};

export default Customer;
