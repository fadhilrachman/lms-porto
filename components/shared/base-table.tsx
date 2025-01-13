import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { Card, CardBody } from "@nextui-org/card";

export type ColumnTable<T> = {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
};

type ReusableTableProps<T> = {
  columns: ColumnTable<T>[];
  data: T[];
  isLoading?: boolean;
  loadingMessage?: string;
};

const BaseTable = <T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  loadingMessage = "Loading...",
}: ReusableTableProps<T>) => {
  return (
    <>
      {isLoading ? (
        <Card>
          <CardBody className="w-full min-h-[40vh] flex items-center justify-center">
            <Spinner />
          </CardBody>
        </Card>
      ) : (
        <Table aria-label="Reusable table" className="min-h-[40vh]">
          <TableHeader>
            {columns.map((col) => (
              <TableColumn key={col.key as string}>{col.label}</TableColumn>
            ))}
          </TableHeader>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col.key as string}>
                    {col.render
                      ? col.render(row[col.key as keyof T], row)
                      : row[col.key as keyof T]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default BaseTable;
