"use client";
import { Input } from "@nextui-org/input";
import { Eye, EyeClosed } from "lucide-react";
import React, { useCallback, useEffect, useState, ReactNode } from "react";

import { RegisterOptions, UseFormReturn } from "react-hook-form";

export interface DataFormType {
  // name:''
  label?: string | ReactNode;
  type: "text" | "email" | "password";

  name: string;
  placeholder?: string;
  helperText?: string;
  startContent?: React.ReactNode;
  endContent?: ReactNode;
  validation?: RegisterOptions;
  //   loading?: boolean; /// REQUIRED IF TYPE COMOBOX
  //   grid?: keyof typeof listColSpan;
  //   defaultValue?: any;
  options?: { id: string; label: string }[];
}

interface Props {
  form: UseFormReturn<any>;
  data: DataFormType[];
  onSubmit: (params: any) => void;
  id: string;
  grid?: number;
  className?: string;
}

const FormGenerator = ({ form, data, onSubmit, id, className }: Props) => {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id={id}
      key={id}
      className={`${className} grid   gap-4`}
    >
      {data.map((val, key) => {
        if (val.type === "text") {
          return (
            <Input
              isRequired
              key={key}
              {...form.register(val.name, val.validation)}
              label={val.label}
              labelPlacement="outside"
              placeholder={val.placeholder}
              startContent={val.startContent}
              endContent={val.endContent}
            />
          );
        }

        if (val.type === "email") {
          return (
            <Input
              key={key}
              isRequired
              {...form.register(val.name, val.validation)}
              label={val.label}
              type="email"
              labelPlacement="outside"
              placeholder={val.placeholder}
              startContent={val.startContent}
              endContent={val.endContent}
            />
          );
        }

        if (val.type === "password") {
          const [isShow, setIsShow] = useState(true);
          return (
            <Input
              isRequired
              key={key}
              {...form.register(val.name, val.validation)}
              label={val.label}
              type={isShow ? "text" : "password"}
              labelPlacement="outside"
              //   size="lg"
              placeholder={val.placeholder}
              endContent={
                isShow ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => setIsShow((p) => !p)}
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() => setIsShow((p) => !p)}
                  />
                )
              }
            />
          );
        }
      })}
    </form>
  );
};

export default FormGenerator;
