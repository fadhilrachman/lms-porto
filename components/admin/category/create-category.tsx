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
import FormGenerator, {
  DataFormType,
} from "@/components/shared/form-generator";
const CreateCategory = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const form = useForm();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Create Category
        </ModalHeader>
        <ModalBody>
          <FormGenerator
            onSubmit={(val) => {
              console.log({ val });
            }}
            id="formCategory"
            form={form}
            data={[
              {
                name: "name",
                label: "Name",
                placeholder: "Enter category name",
                type: "text",
                validation: {
                  required: "This field is required",
                },
              },
            ]}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={onOpenChange} type="button">
            Close
          </Button>
          <Button type="submit" form="formCategory" color="primary">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategory;
