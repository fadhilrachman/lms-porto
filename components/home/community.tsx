import React from "react";
import Title from "./title";
import { Button } from "@nextui-org/button";
import { UserRound, UsersRound } from "lucide-react";

const Community = () => {
  return (
    <section
      id="community"
      className="space-y-6 px-16 bg-backgroundColor text-white  py-12"
    >
      <Title
        title=" Our Community"
        subTitle="Join Our Supportive Community "
        subTitle2="BuildWithAngga provides a UI/UX learning community design & Web Development for beginners to advanced"
      />
      <Button startContent={<UsersRound className="h-4 w-4" />} color="primary">
        Join Community
      </Button>
    </section>
  );
};

export default Community;
