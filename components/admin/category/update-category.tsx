"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import * as VscIcons from "react-icons/si";

import FormGenerator from "@/components/shared/form-generator";
import { usePutCategory } from "@/hooks/category.hook";
import { CategoryType } from "@/types/category.type";

const UpdateCategory = ({
  isOpen,
  onOpenChange,
  data,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  data: CategoryType;
}) => {
  const form = useForm();
  const availableIcons = Object.keys(VscIcons);

  const { mutateAsync, status } = usePutCategory(data?.id);

  const handleCreateCategory = async (val: any) => {
    await mutateAsync(val);
    form.reset();
    onOpenChange();
  };

  useEffect(() => {
    form.setValue("name", data?.name);
    form.setValue("icon", data?.icon);
  }, [data]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Update Category
        </ModalHeader>
        <ModalBody>
          <FormGenerator
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
            disabled={status == "pending"}
            form={form}
            id="formCategory"
            onSubmit={handleCreateCategory}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" onPress={onOpenChange}>
            Close
          </Button>
          <Button
            color="primary"
            form="formCategory"
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

export default UpdateCategory;
