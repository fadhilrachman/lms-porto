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
import { Input } from "@nextui-org/input";
import FormGenerator, {
  DataFormType,
} from "@/components/shared/form-generator";
import { usePostCourse } from "@/hooks/course.hook";
import { useParams, useRouter } from "next/navigation";
import { usePostChapter } from "@/hooks/chapter.hook";
const ModalCreateContent = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { mutateAsync, status, data } = usePostChapter();
  const router = useRouter();
  const { course_id } = useParams();
  const form = useForm();
  const dataForm: DataFormType[] = [
    {
      name: "title",
      type: "text",
      label: "Chapter Name",
      placeholder: "Enter chapter name",
      validation: { required: "This field is required" },
    },
  ];
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Create Chapter
        </ModalHeader>
        <ModalBody>
          <FormGenerator
            form={form}
            data={dataForm}
            id="chapterForm"
            onSubmit={async (val) => {
              await mutateAsync({ ...val, course_id });
              form.reset();
              onOpenChange();
              // router.push(`/admin/course/${result?.result?.id}`);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={onOpenChange} type="button">
            Close
          </Button>
          <Button
            isLoading={status == "pending"}
            color="primary"
            type="submit"
            form="chapterForm"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateContent;
