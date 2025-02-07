import React from "react";
import { Button } from "@nextui-org/button";
import { UsersRound } from "lucide-react";

import Title from "./title";

const Community = () => {
  return (
    <section
      className="space-y-6 px-6 md:px-16 bg-backgroundColor text-white  py-12"
      id="community"
    >
      <Title
        subTitle="Join Our Supportive Community "
        subTitle2="BuildWithAngga provides a UI/UX learning community design & Web Development for beginners to advanced"
        title=" Our Community"
      />
      <Button
        color="primary"
        // as={"a"}
        onPress={() => {
          window.open();
        }}
        // target="__blank"
        startContent={<UsersRound className="h-4 w-4" />}
      >
        Join Community
      </Button>
    </section>
  );
};

export default Community;
