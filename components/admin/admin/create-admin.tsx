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
import * as VscIcons from "react-icons/si";

import FormGenerator from "@/components/shared/form-generator";
import { usePostAdmin } from "@/hooks/admin.hook";

const CreateAdmin = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const form = useForm();
  const availableIcons = Object.keys(VscIcons);

  const { mutateAsync, status } = usePostAdmin();

  const handleCreateAdmin = async (val: any) => {
    await mutateAsync(val);
    form.reset();
    onOpenChange();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Create Admin</ModalHeader>
        <ModalBody>
          <FormGenerator
            data={[
              {
                name: "user_name",
                type: "text",
                label: "Username",
                placeholder: "Enter your username",
                validation: {
                  required: "This field is required",
                },
              },
              {
                name: "email",
                type: "email",
                label: "Email",
                placeholder: "Enter your email",
                validation: {
                  required: "This field is required",
                },
              },
              {
                name: "password",
                type: "password",
                label: "Password",
                placeholder: "Enter your password",
                validation: {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Minimal character 6",
                  },
                },
              },
              {
                name: "confirm_password",
                type: "password",
                label: "Confirm Password",
                placeholder: "Enter your password",
                validation: {
                  required: "This field is required",
                  validate: (confirmPassword: string) => {
                    const { password } = form.getValues();

                    if (confirmPassword !== password) {
                      return "Confirm password does not match";
                    }

                    return true;
                  },
                },
              },
            ]}
            disabled={status == "pending"}
            form={form}
            id="formCreateAdmin"
            onSubmit={handleCreateAdmin}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" onPress={onOpenChange}>
            Close
          </Button>
          <Button
            color="primary"
            form="formCreateAdmin"
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

export default CreateAdmin;
