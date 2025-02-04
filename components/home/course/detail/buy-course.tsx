'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { usePostTransaction, useSnapMidtrans } from '@/hooks/transaction.hook';

const ModalBuyCourse = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const router = useRouter();
  const { course_id }: { course_id: string } = useParams();
  const { snapModal } = useSnapMidtrans();
  const { mutateAsync, status } = usePostTransaction({ course_id });
  const handleBuyCourse = async () => {
    const myCookie = Cookies.get(process.env.COOKIE_NAME as string);
    if (!myCookie) {
      toast.error('You must be login first!');
      router.push('/login');
      return null;
    }
    const result = await mutateAsync();
    snapModal(result?.token, result.id);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Buy Course</ModalHeader>
        <ModalBody>Are you sure you want to buy this course?</ModalBody>
        <ModalFooter>
          <Button type="button" onPress={onOpenChange}>
            Close
          </Button>
          <Button
            color="primary"
            isLoading={status === 'pending'}
            onPress={() => {
              handleBuyCourse();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalBuyCourse;
