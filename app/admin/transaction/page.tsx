"use client";
import React, { useState } from "react";

import CreateCustoemr from "@/components/admin/customer/create-customer";
import ListTransaction from "@/components/admin/transaction/list-transaction";

const Transaction = () => {
  const [modal, setModal] = useState({ create: false });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-2xl">Transaction</h3>
        {/* <Button
          startContent={<Plus />}
          color="primary"
          onPress={() => {
            setModal((p) => ({ ...p, create: true }));
          }}
        >
          Create Transaction
        </Button> */}
      </div>
      <ListTransaction />
      <CreateCustoemr
        isOpen={modal.create}
        onOpenChange={() => {
          setModal((p) => ({ ...p, create: false }));
        }}
      />
    </div>
  );
};

export default Transaction;
