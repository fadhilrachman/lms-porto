import React, { useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";

import FormGenerator, {
  DataFormType,
} from "@/components/shared/form-generator";
import { usePutChapter } from "@/hooks/chapter.hook";

const FormChapter = ({
  title,
  isLoading,
}: {
  title: string;
  isLoading: boolean;
}) => {
  const { chapter_id } = useParams();
  const { mutateAsync, status, data } = usePutChapter(chapter_id as string);

  const form = useForm();
  const dataNoUpdate = form.watch("title") == title;
  const dataForm: DataFormType[] = [
    {
      name: "title",
      type: "text",
      label: "Chapter Name",
      placeholder: "Enter chapter name",
      validation: { required: "This field is required" },
    },
  ];
  const handleFillData = () => {
    form.setValue("title", title);
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
          data={dataForm}
          form={form}
          id="chapterForm"
          onSubmit={async (val) => {
            await mutateAsync({ ...val });
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
            form="chapterForm"
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

export default FormChapter;
