import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

const ModalDelete = ({
  isOpen,
  onOpenChange,
  isLoading,
  onDelete,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  isLoading: boolean;
  onDelete: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this data? This action cannot be
          undone
        </ModalBody>
        <ModalFooter>
          <Button type="button" onPress={onOpenChange}>
            Close
          </Button>
          <Button color="danger" isLoading={isLoading} onPress={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
