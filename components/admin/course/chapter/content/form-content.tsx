import React, { useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Grip, Link, Plus } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import FormGenerator, {
  DataFormType,
} from "@/components/shared/form-generator";
import { useForm } from "react-hook-form";
import { usePostChapter, usePutChapter } from "@/hooks/chapter.hook";
import { useParams } from "next/navigation";
import { usePutContent } from "@/hooks/content.hook";

const FormContent = ({
  title,
  content_vid,
  isLoading,
  description,
}: {
  title: string;
  content_vid: string;
  isLoading: boolean;
  description: string;
}) => {
  const { content_id } = useParams();
  const { mutateAsync, status, data } = usePutContent(content_id as string);

  const form = useForm();
  const dataNoUpdate =
    form.watch("title") == title &&
    form.watch("content_vid") == content_vid &&
    form.watch("description") == description;

  const dataForm: DataFormType[] = [
    {
      name: "title",
      type: "text",
      label: "Content Title",
      placeholder: "Enter chapter name",
      validation: { required: "This field is required" },
    },
    {
      name: "content_vid",
      startContent: <Link />,
      type: "text",
      placeholder: "Enter video link",
      label: "Content Video",
      validation: {
        required: "This field is required",
        pattern: {
          value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/,
          message: "Invalid URL format",
        },
      },
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      placeholder: "Enter Description",
      validation: {
        required: "This field is required",
      },
    },
  ];
  const handleFillData = () => {
    form.setValue("title", title);
    form.setValue("content_vid", content_vid);
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
          data={dataForm}
          id="contentFor,"
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
            form="contentFor,"
          >
            Submit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormContent;
