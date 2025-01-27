"use client";
import { Button } from "@nextui-org/button";
import { Eye, Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import BaseTable, { ColumnTable } from "@/components/shared/base-table";
import { Pagination } from "@nextui-org/pagination";
import ModalCreateCourse from "@/components/admin/course/modal-create-course";
import { useGetCourse } from "@/hooks/course.hook";
import moment from "moment";
import { Chip } from "@nextui-org/chip";
import { formatRupiah } from "@/lib/helper";
import { CourseType } from "@/types/course.type";
import ModalImg from "@/components/shared/modal-img";
import BaseInputSearch from "@/components/shared/base-input-search";
import { useRouter } from "next/navigation";
import BasePagination from "@/components/shared/base-pagination";

const AdminCategory = () => {
  const [params, setParams] = useState({ search: "", page: 1, per_page: 10 });
  const router = useRouter();
  const [modal, setModal] = useState({ create: false, img: false });
  const { data, isFetching, refetch } = useGetCourse(params);

  useEffect(() => {
    refetch();
  }, [params]);
  const columns: ColumnTable<CourseType>[] = [
    {
      key: "title",
      label: "Course Name",
      render: (value, obj) => {
        return (
          <div className="flex items-center space-x-2">
            <img
              onClick={() => {
                setModal((p) => ({ ...p, img: true }));
              }}
              src={obj.thumbnail_img}
              className="max-w-12 max-h-12 cursor-pointer"
              alt=""
            />
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      key: "price",
      label: "Price",
      render: (value, obj) => {
        return obj?.is_free ? (
          <Chip size="sm" color="primary">
            Free
          </Chip>
        ) : (
          formatRupiah(obj.price)
        );
      },
    },
    {
      key: "chapter",
      label: "Chapter Count",
      render: (_, obj) => {
        return <>{obj._count.chapter}</>;
      },
    },
    {
      key: "is_published",
      label: "Published",
      render: (value) => {
        return (
          <>
            <Chip size="sm" color={value ? "primary" : "default"}>
              {value ? "Publish" : "draft"}
            </Chip>
          </>
        );
      },
    },

    {
      key: "created_at",
      label: "Created At",
      render: (value) => {
        return <>{moment(value).format("YYYY/MM/DD")}</>;
      },
    },
    {
      key: "updated_at",
      label: "Last Updated",
      render: (value) => {
        return <>{moment(value).format("YYYY/MM/DD")}</>;
      },
    },
    {
      key: "sasd",
      label: "Action",
      render: (_, obj) => {
        return (
          <>
            <Button
              // size={"small"}
              onPress={() => {
                router.push(`/admin/course/${obj.id}`);
              }}
              size="sm"
              startContent={<Eye className="h-4 w-4" />}
              isIconOnly
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-2xl">Course</h3>
        <Button
          startContent={<Plus />}
          color="primary"
          onPress={() => {
            setModal((p) => ({ ...p, create: true }));
          }}
        >
          Create Course
        </Button>
      </div>

      <BaseInputSearch
        onChange={(e) => {
          setParams((p) => ({ ...p, search: e }));
        }}
        placeholder="Search Course"
      />
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
      <ModalCreateCourse
        isOpen={modal.create}
        onOpenChange={() => {
          setModal((p) => ({ ...p, create: false }));
        }}
      />
      <ModalImg
        isOpen={modal.img}
        onOpenChange={() => {
          setModal((p) => ({ ...p, img: false }));
        }}
        img="https://nextui.org/images/hero-card-complete.jpeg"
      />
    </div>
  );
};

export default AdminCategory;
