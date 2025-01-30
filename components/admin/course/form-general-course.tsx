import React, { useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";

import FormGenerator from "@/components/shared/form-generator";
import { usePutCourse } from "@/hooks/course.hook";
import { useGetCategory } from "@/hooks/category.hook";

interface DataType {
  title: string;
  introduction_vid: string;
  thumbnail_img: string;
  description: string;
  isLoading: boolean;
  category_id: string;
  price: number;
}
const FormGeneralCourse = ({
  description,
  introduction_vid,
  title,
  isLoading,
  thumbnail_img,
  category_id,
  price,
}: DataType) => {
  const { course_id } = useParams();
  const { mutate, status } = usePutCourse(course_id as string);
  const { data } = useGetCategory({ page: 1, per_page: 1000 });
  const optionCategory = data?.result?.map((val) => ({
    key: val.id,
    label: val.name,
  }));

  const form = useForm();
  const dataNoUpdate =
    form.watch("title") == title &&
    form.watch("category_id") == category_id &&
    form.watch("thumbnail_img") == thumbnail_img &&
    form.watch("price") == price &&
    form.watch("introduction_vid") == introduction_vid &&
    form.watch("description") == description;

  const handleFillData = () => {
    form.setValue("title", title);
    form.setValue("introduction_vid", introduction_vid);
    form.setValue("category_id", category_id);
    form.setValue("price", price);
    form.setValue("thumbnail_img", thumbnail_img);
    form.setValue("description", description);
  };

  useEffect(() => {
    if (!isLoading) {
      handleFillData();
    }
  }, [isLoading]);

  return (
    <Card title="asd">
      <CardHeader>
        <h3 className="text-xl">Info General</h3>
      </CardHeader>
      <CardBody>
        <FormGenerator
          data={[
            {
              name: "title",
              type: "text",
              label: "Course Name",
              placeholder: "Enter your name",
              validation: {
                required: "This field is required",
              },
            },
            {
              name: "introduction_vid",
              startContent: <Link />,
              type: "text",
              placeholder: "Enter video link",
              label: "Introduction Video",
              validation: {
                required: "This field is required",
              },
            },
            {
              name: "thumbnail_img",
              // startContent: <Link />,
              type: "file",
              placeholder: "Enter Img",
              label: "Thumbnail Image",
              validation: {
                required: "This field is required",
              },
            },
            {
              name: "price",
              type: "number",
              label: "Price",
              placeholder: "Enter Price",
              validation: {
                required: "This field is required",
              },
            },
            {
              name: "category_id",
              type: "select",
              options: optionCategory || [],
              label: "Category",
              placeholder: "Enter Category",
              validation: {
                required: "This field is required",
              },
            },
            {
              name: "description",
              type: "textarea",
              label: "Description",
              placeholder: "Enter Description",
              validation: {
                required: "This field is required",
              },
            },
          ]}
          form={form}
          id="courseForm"
          onSubmit={(val) => {
            mutate({
              ...val,
              category_id: optionCategory.find(
                (item) => item.label == val.category_id
              ).key,
            });
          }}
        />
      </CardBody>
      <CardFooter>
        <div className="flex justify-end space-x-2 w-full">
          <Button isDisabled={status == "pending"} onPress={handleFillData}>
            Cancel
          </Button>
          <Button
            color="primary"
            form="courseForm"
            isDisabled={dataNoUpdate}
            isLoading={status == "pending"}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormGeneralCourse;
