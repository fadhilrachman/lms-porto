import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { Link } from "lucide-react";

import FormGenerator, {
  DataFormType,
} from "@/components/shared/form-generator";
import { usePostContent } from "@/hooks/content.hook";
const ModalCreateContent = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { mutateAsync, status, data } = usePostContent();
  const { chapter_id } = useParams();
  const form = useForm();
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
      type: "textarea",
      label: "Description",
      placeholder: "Enter Description",
      validation: {
        required: "This field is required",
      },
    },
  ];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Create Content
        </ModalHeader>
        <ModalBody>
          <FormGenerator
            data={dataForm}
            form={form}
            id="contentForm"
            onSubmit={async (val) => {
              await mutateAsync({ ...val, chapter_id });
              form.reset();
              onOpenChange();
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" onPress={onOpenChange}>
            Close
          </Button>
          <Button
            color="primary"
            form="contentForm"
            isLoading={status == "pending"}
            type="submit"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateContent;
