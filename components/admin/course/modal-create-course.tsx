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
const ModalCreateCourse = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { register } = useForm();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Create Course</ModalHeader>
        <ModalBody>
          <form action="" id="form">
            <Input
              isRequired
              {...register("name", { required: true })}
              label="Course Name"
              labelPlacement="outside"
              placeholder="Enter your name"
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onOpenChange} type="button">
            Close
          </Button>
          <Button color="primary" type="submit" form="form">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateCourse;
