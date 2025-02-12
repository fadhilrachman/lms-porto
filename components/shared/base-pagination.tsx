import { Pagination } from '@nextui-org/pagination';
import React from 'react';

const BasePagination = ({
  page,
  onChangePage,
  totalPage,
  totalData,
}: {
  page: number;
  totalPage: number;
  totalData: number;
  onChangePage: (e: number) => void;
}) => {
  return (
    <div className="flex justify-between items-center px-4">
      <p className="text-sm">
        Showing {page * 10 > totalData ? totalData : page * 10} of {totalData}{' '}
        Data
      </p>
      <Pagination
        loop
        showControls
        initialPage={page}
        total={totalPage}
        onChange={onChangePage}
      />
    </div>
  );
};

export default BasePagination;
