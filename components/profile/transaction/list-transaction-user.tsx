import { Avatar } from '@nextui-org/avatar';
import React, { useEffect, useState } from 'react';

import BaseInputSearch from '@/components/shared/base-input-search';
import BasePagination from '@/components/shared/base-pagination';
import BaseTable, { ColumnTable } from '@/components/shared/base-table';
import ModalDelete from '@/components/shared/modal-delete';
import { useDeleteCustomer } from '@/hooks/customer.hook';
import { CustomerType } from '@/types/customer.type';
import { TransactionType } from '@/types/transaction.type';
import { formatRupiah } from '@/lib/helper';
import { useGetTransactionUser } from '@/hooks/profile.hook';

const ListTransactionUser = () => {
  const [params, setParams] = useState({ search: '', page: 1, per_page: 10 });
  const [dialog, setDialog] = useState({
    delete: false,
    img: false,
  });
  const [selected, setSelected] = useState<CustomerType>();
  const { data, isFetching, refetch } = useGetTransactionUser(params);
  const { mutateAsync, status } = useDeleteCustomer(selected?.id as string);

  const handleDelete = async () => {
    await mutateAsync();
    setDialog((p) => ({ ...p, delete: false }));
  };

  const columns: ColumnTable<TransactionType>[] = [
    {
      key: 'id',
      label: 'ID',
      render: (_, obj) => <span>{obj?.code}</span>,
    },
    {
      key: 'user_name',
      label: 'Username',
      render: (_, obj) => (
        <div className="flex items-center space-x-2">
          {/* <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            name={obj.user.user_name}
            size="sm"
            // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          /> */}
          <span>{obj.user?.user_name}</span>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (_, obj) => <span>{obj.user?.email}</span>,
    },

    {
      key: 'course',
      label: 'Course',
      render: (_, obj) => {
        return (
          <div className="flex items-center space-x-2">
            {obj?.course?.thumbnail_img && (
              <img
                alt=""
                className="max-w-12 max-h-12 cursor-pointer"
                src={obj.course.thumbnail_img}
                onClick={() => {
                  setDialog((p) => ({ ...p, img: true }));
                }}
              />
            )}

            <span>{obj.course.title}</span>
          </div>
        );
      },
      //   render: (_, obj) => <span>{obj.course.title}</span>,
    },

    {
      key: 'price',
      label: 'Price',
      render: (_, obj) => <span>{formatRupiah(obj.course.price)}</span>,
    },
    // {
    //   key: "sasd",
    //   label: "Action",
    //   render: (_, obj) => {
    //     return (
    //       <div className="space-x-2">
    //         <Button
    //           // size={"small"}
    //           onPress={() => {
    //             setDialog((p) => ({ ...p, delete: true }));
    //             //   setSelected(obj);
    //           }}
    //           size="sm"
    //           color="danger"
    //           startContent={<Trash className="h-4 w-4" />}
    //           isIconOnly
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    refetch();
  }, [params]);
  return (
    <div className="space-y-4">
      <BaseInputSearch
        placeholder="Search Transaction"
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
        isLoading={status == 'pending'}
        isOpen={dialog.delete}
        onDelete={handleDelete}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, delete: false }));
        }}
      />
    </div>
  );
};

export default ListTransactionUser;
