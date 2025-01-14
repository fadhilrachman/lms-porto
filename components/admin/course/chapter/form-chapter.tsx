import React, { useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Grip, Plus } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import FormGenerator, {
  DataFormType,
} from "@/components/shared/form-generator";
import { useForm } from "react-hook-form";
import { usePostChapter, usePutChapter } from "@/hooks/chapter.hook";
import { useParams } from "next/navigation";

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
          form={form}
          data={dataForm}
          id="chapterForm"
          onSubmit={async (val) => {
            await mutateAsync({ ...val });
          }}
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
            form="chapterForm"
          >
            Submit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormChapter;
