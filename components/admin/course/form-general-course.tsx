import React, { useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "lucide-react";
import FormGenerator, {
  DataFormType,
} from "@/components/shared/form-generator";
import { useForm } from "react-hook-form";
import { usePutCourse } from "@/hooks/course.hook";
import { useParams } from "next/navigation";

interface DataType {
  title: string;
  introduction_vid: string;
  description: string;
  isLoading: boolean;
}
const FormGeneralCourse = ({
  description,
  introduction_vid,
  title,
  isLoading,
}: DataType) => {
  const { course_id } = useParams();
  const { mutate, status } = usePutCourse(course_id as string);
  const form = useForm();
  const dataNoUpdate =
    form.watch("title") == title &&
    form.watch("introduction_vid") == introduction_vid &&
    form.watch("description") == description;

  const handleFillData = () => {
    form.setValue("title", title);
    form.setValue("introduction_vid", introduction_vid);
    form.setValue("description", description);
  };
  useEffect(() => {
    handleFillData();
  }, [isLoading]);

  return (
    <Card title="asd">
      <CardHeader>
        <h3 className="text-xl">Info General</h3>
      </CardHeader>
      <CardBody>
        <FormGenerator
          form={form}
          id="courseForm"
          onSubmit={(val) => {
            mutate(val);
          }}
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
            // {
            //   name: "category_id",
            //   type: "text",
            //   label: "Category",
            //   placeholder: "Enter Category",
            //   validation: {
            //     required: "This field is required",
            //   },
            // },
            {
              name: "description",
              type: "text",
              label: "Description",
              placeholder: "Enter Description",
              validation: {
                required: "This field is required",
              },
            },
          ]}
        />
      </CardBody>
      <CardFooter>
        <div className="flex justify-end space-x-2 w-full">
          <Button onPress={handleFillData} isDisabled={status == "pending"}>
            Cancel
          </Button>
          <Button
            isLoading={status == "pending"}
            color="primary"
            type="submit"
            isDisabled={dataNoUpdate}
            form="courseForm"
          >
            Submit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormGeneralCourse;
