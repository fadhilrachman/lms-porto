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
const ModalCreateCourse = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const form = useForm();
  const dataForm: DataFormType[] = [
    {
      name: "name",
      type: "text",
      label: "Course Name",
      placeholder: "Enter course name",
      validation: { required: true },
    },
    {
      name: "password",
      type: "password",
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
            form={form}
            data={dataForm}
            id="courseForm"
            onSubmit={(val) => {
              console.log({ val });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={onOpenChange} type="button">
            Close
          </Button>
          <Button color="primary" type="submit" form="courseForm">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateCourse;
