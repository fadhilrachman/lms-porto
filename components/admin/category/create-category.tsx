"use client";
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
import * as VscIcons from "react-icons/si";
import BaseIcon from "@/components/shared/base-icon";
import { usePostCategory } from "@/hooks/category.hook";

const CreateCategory = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const form = useForm();
  const availableIcons = Object.keys(VscIcons);

  const { mutateAsync, status } = usePostCategory();

  const handleCreateCategory = async (val: any) => {
    await mutateAsync(val);
    form.reset();
    onOpenChange();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Create Category
        </ModalHeader>
        <ModalBody>
          <FormGenerator
            onSubmit={handleCreateCategory}
            id="formUpdateCategory"
            form={form}
            disabled={status == "pending"}
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
              {
                name: "icon",
                label: "Icon",
                placeholder: "Enter icon name",
                type: "select",
                options: availableIcons?.map((val) => ({
                  key: val,
                  label: val,
                  //  (
                  //   <div className="flex space-x-2 items-center w-full">
                  //     <BaseIcon iconKey={val} />
                  //     <span>{val}</span>
                  //   </div>
                  // ),
                })),
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
          <Button
            type="submit"
            form="formUpdateCategory"
            isLoading={status == "pending"}
            color="primary"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategory;
