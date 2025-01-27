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
import { useRouter } from "next/navigation";

import FormGenerator, {
  DataFormType,
} from "@/components/shared/form-generator";
import { usePostCourse } from "@/hooks/course.hook";

const ModalCreateCourse = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { mutateAsync, status, data } = usePostCourse();
  const router = useRouter();
  const form = useForm();
  const dataForm: DataFormType[] = [
    {
      name: "title",
      type: "text",
      label: "Course Name",
      placeholder: "Enter course name",
      validation: { required: true },
    },
  ];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Create Course</ModalHeader>
        <ModalBody>
          <FormGenerator
            data={dataForm}
            form={form}
            id="courseForm"
            onSubmit={async (val) => {
              const result = await mutateAsync(val);

              router.push(`/admin/course/${result?.result?.id}`);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" onPress={onOpenChange}>
            Close
          </Button>
          <Button
            color="primary"
            form="courseForm"
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

export default ModalCreateCourse;
