import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Input } from "@nextui-org/input";
interface Props {
  placeholder?: string;
  onChange: (text: string) => void;
}
const BaseInputSearch = ({ onChange, placeholder }: Props) => {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2 h-5 w-5 text-primary" />
      <Input
        startContent={<Search />}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder={placeholder}
        className="w-max"
      />
    </div>
  );
};

export default BaseInputSearch;
