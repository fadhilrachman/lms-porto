'use client';
import React, { useState } from 'react';

import CreateCustoemr from '@/components/admin/customer/create-customer';
import ListTransaction from '@/components/admin/transaction/list-transaction';
import LayoutProfile from '@/components/shared/layout-profile';
import { LucideBookMarked } from 'lucide-react';
import ListTransactionUser from '@/components/profile/transaction/list-transaction-user';

const Transaction = () => {
  const [modal, setModal] = useState({ create: false });

  return (
    <LayoutProfile>
      <div className="space-y-6 w-full">
        <div className=" border-b border-neutral-400 space-y-3 py-3">
          <div className="flex items-center gap-3">
            <LucideBookMarked />
            <h3 className="text-2xl font-bold">Transaction</h3>
          </div>
          <p className="max-w-96">Manage your transaction</p>
        </div>
        <ListTransactionUser />
        {/* <CreateCustoemr
          isOpen={modal.create}
          onOpenChange={() => {
            setModal((p) => ({ ...p, create: false }));
          }}
        /> */}
      </div>
    </LayoutProfile>
  );
};

export default Transaction;
