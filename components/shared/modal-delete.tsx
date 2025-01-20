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
import { useParams, useRouter } from "next/navigation";
import { Link } from "lucide-react";
import { usePostContent } from "@/hooks/content.hook";
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
          <Button onPress={onOpenChange} type="button">
            Close
          </Button>
          <Button isLoading={isLoading} onPress={onDelete} color="danger">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
