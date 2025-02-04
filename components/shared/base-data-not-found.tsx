import { Trash } from "lucide-react";
import React from "react";

const BaseDataNotFound = () => {
  return (
    <div className="w-full flex flex-col space-y-3 items-center justify-center min-h-[200px]">
      <Trash className="h-10 w-10" />
      <p className="text-2xl ">Data not found</p>
    </div>
  );
};

export default BaseDataNotFound;
