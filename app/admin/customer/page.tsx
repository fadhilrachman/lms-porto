"use client";
import { Button } from "@nextui-org/button";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import ListCustomer from "@/components/admin/customer/list-customer";
import CreateCustoemr from "@/components/admin/customer/create-customer";
const Customer = () => {
  const [modal, setModal] = useState({ create: false });

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
      <ListCustomer />
      <CreateCustoemr
        isOpen={modal.create}
        onOpenChange={() => {
          setModal((p) => ({ ...p, create: false }));
        }}
      />
    </div>
  );
};

export default Customer;
