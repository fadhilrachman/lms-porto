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
import ListAdmin from "@/components/admin/admin/list-admin";
import CreateAdmin from "@/components/admin/admin/create-admin";
const Admin = () => {
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
        <h3 className="text-2xl">Admin</h3>
        <Button
          startContent={<Plus />}
          color="primary"
          onPress={() => {
            setModal((p) => ({ ...p, create: true }));
          }}
        >
          Create Admin
        </Button>
      </div>
      <ListAdmin />
      <CreateAdmin
        isOpen={modal.create}
        onOpenChange={() => {
          setModal((p) => ({ ...p, create: false }));
        }}
      />
    </div>
  );
};

export default Admin;
