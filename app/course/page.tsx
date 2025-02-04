'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Search, Star, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Title from '@/components/home/title';
import Footer from '@/components/home/footer';
import { Navbar } from '@/components/shared/navbar';
import { useGetCourse } from '@/hooks/course.hook';
import SckeletonLoading from '@/components/home/sckeleton-loading';
import { formatRupiah } from '@/lib/helper';
import BaseInputSearch from '@/components/shared/base-input-search';
import { Select, SelectItem } from '@nextui-org/select';
import { useQueryState } from 'nuqs';
import { useGetCategory } from '@/hooks/category.hook';
import BaseIcon from '@/components/shared/base-icon';

const Course = () => {
  const router = useRouter();
  const [category, setCategory] = useQueryState('category');
  const [params, setParams] = useState({ search: '', page: 1, per_page: 10 });
  const { data: dataCategory } = useGetCategory({ page: 1, per_page: 100 });

  const { data, isFetching, refetch } = useGetCourse({
    page: 1,
    per_page: 20,
    is_published: true,
    ...params,
    category_id: category,
  });

  useEffect(() => {
    refetch();
  }, [params, category]);
  return (
    <div className="relative space-y-12  ">
      <Navbar />

      {category}
      <div className="px-16 space-y-4">
        <Title
          subTitle="Course"
          subTitle2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, nisi"
        />
        <div className="flex space-x-2">
          <BaseInputSearch
            size="lg"
            placeholder="Search Course"
            onChange={(e) => {
              setParams((p) => ({ ...p, search: e }));
            }}
          />
          <Select
            className="max-w-[200px]"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            placeholder="Category"
            aria-label="category"
            size="lg"
          >
            {dataCategory?.result?.map((val) => (
              <SelectItem key={val.id}>
                <div className="flex space-x-2 items-center">
                  <BaseIcon iconKey={val.icon} />
                  <span>{val.name}</span>
                </div>
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-4 gap-6 ">
          {isFetching
            ? [1, 4, 2, 3].map((val) => <SckeletonLoading key={val} />)
            : data?.result.map((val, key) => {
                return (
                  <Card
                    key={key}
                    isPressable
                    className="py-4 w-full cursor-pointer"
                    onPress={() => {
                      router.push(`/course/${val.id}`);
                    }}
                  >
                    <CardHeader className="pb-0 w pt-2 px-4 flex-col items-start">
                      <div className="flex justify-between w-full items-center">
                        <h4 className="font-bold text-large">{val.title}</h4>
                        <Chip size="sm">Tech</Chip>
                      </div>
                      <small className="text-default-500">
                        {formatRupiah(val.price)}
                      </small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                      <img
                        alt="Card background"
                        className="object-cover w-full rounded-xl"
                        src={val.thumbnail_img}
                        width={270}
                      />
                    </CardBody>
                    <CardFooter>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex space-x-1">
                          {[0, 2, 3, 4, 5].map((val) => (
                            <Star key={val} className="text-yellow-500" />
                          ))}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4" />
                          <small>{val._count.transaction}</small>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Course;
