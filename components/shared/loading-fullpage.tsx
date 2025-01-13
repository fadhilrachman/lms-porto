import { Spinner } from "@nextui-org/spinner";
import React from "react";

const LoadingFullpage = () => {
  return (
    <div className="w-full top-0 left-0 h-[100vh] flex items-center justify-center z-50 bg-opacity-25 bg-neutral-100 absolute">
      <Spinner />
    </div>
  );
};

export default LoadingFullpage;
