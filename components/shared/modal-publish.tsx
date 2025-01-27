import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

const ModalPublish = ({
  isOpen,
  onOpenChange,
  isLoading,
  onPublish,
  type,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  isLoading: boolean;
  onPublish: () => void;
  type: "content" | "course";
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 capitalize">
          Publish {type}
        </ModalHeader>
        <ModalBody>
          Are you certain you want to publish this {type}? Please note that it
          will be made publicly accessible
        </ModalBody>
        <ModalFooter>
          <Button type="button" onPress={onOpenChange}>
            Close
          </Button>
          <Button color="primary" isLoading={isLoading} onPress={onPublish}>
            Publish
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalPublish;
