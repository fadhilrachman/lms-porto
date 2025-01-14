import { Button } from "@nextui-org/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonBack = ({ href }: { href: string }) => {
  const router = useRouter();
  return (
    <Button
      startContent={<ChevronLeft />}
      onPress={() => {
        router.push(href);
      }}
      isIconOnly
    />
  );
};

export default ButtonBack;
