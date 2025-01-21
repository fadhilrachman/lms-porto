"use client";
import { Input } from "@nextui-org/input";
import { Eye, EyeClosed } from "lucide-react";
import React, { useCallback, useEffect, useState, ReactNode } from "react";

import { Controller, RegisterOptions, UseFormReturn } from "react-hook-form";

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
  disabled?: boolean;
  options?: { id: string; label: string }[];
}

interface Props {
  form: UseFormReturn<any>;
  data: DataFormType[];
  onSubmit: (params: any) => void;
  endContent?: ReactNode;
  disabled?: boolean;
  id: string;
  className?: string;
}

const FormGenerator = ({
  form,
  data,
  onSubmit,
  disabled,
  id,
  className,
}: Props) => {
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
            <Controller
              key={key}
              name={val.name}
              control={form.control}
              rules={val.validation}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    label={val.label}
                    isRequired={!!val.validation?.required}
                    labelPlacement="outside"
                    disabled={val?.disabled || disabled}
                    placeholder={val.placeholder}
                    startContent={val.startContent}
                    endContent={val.endContent}
                    isInvalid={!!fieldState.error}
                    validationState={fieldState.error ? "invalid" : "valid"}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
          );
        }

        if (val.type === "email") {
          return (
            <Controller
              key={key}
              name={val.name}
              control={form.control}
              rules={val.validation}
              render={({ field, fieldState }) => {
                console.log({ error: fieldState.error });

                return (
                  <Input
                    {...field}
                    type="text"
                    isRequired={!!val.validation?.required}
                    label={val.label}
                    labelPlacement="outside"
                    disabled={val?.disabled || disabled}
                    placeholder={val.placeholder}
                    startContent={val.startContent}
                    endContent={val.endContent}
                    isInvalid={!!fieldState.error}
                    validationState={fieldState.error ? "invalid" : "valid"}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
          );
        }

        if (val.type === "password") {
          const [isShow, setIsShow] = useState(false);
          return (
            <Controller
              key={key}
              name={val.name}
              control={form.control}
              rules={val.validation}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type={isShow ? "text" : "password"}
                  label={val.label}
                  labelPlacement="outside"
                  isRequired={!!val.validation?.required}
                  disabled={val?.disabled || disabled}
                  placeholder={val.placeholder}
                  endContent={
                    isShow ? (
                      <Eye
                        className="cursor-pointer"
                        onClick={() => setIsShow((prev) => !prev)}
                      />
                    ) : (
                      <EyeClosed
                        className="cursor-pointer"
                        onClick={() => setIsShow((prev) => !prev)}
                      />
                    )
                  }
                  isInvalid={!!fieldState.error}
                  validationState={fieldState.error ? "invalid" : "valid"}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          );
        }

        // if (val.type === "email") {
        //   return (
        //     <Input
        //       key={key}
        //       isRequired
        //       {...form.register(val.name, val.validation)}
        //       label={val.label}
        //       type="email"
        //       labelPlacement="outside"
        //       placeholder={val.placeholder}
        //       startContent={val.startContent}
        //       endContent={val.endContent}
        //     />
        //   );
        // }

        // if (val.type === "password") {
        //   const [isShow, setIsShow] = useState(true);
        //   return (
        //     <Input
        //       isRequired
        //       key={key}
        //       {...form.register(val.name, val.validation)}
        //       label={val.label}
        //       type={isShow ? "text" : "password"}
        //       labelPlacement="outside"
        //       //   size="lg"
        //       placeholder={val.placeholder}
        //       endContent={
        //         isShow ? (
        //           <Eye
        //             className="cursor-pointer"
        //             onClick={() => setIsShow((p) => !p)}
        //           />
        //         ) : (
        //           <EyeClosed
        //             className="cursor-pointer"
        //             onClick={() => setIsShow((p) => !p)}
        //           />
        //         )
        //       }
        //     />
        //   );
        // }
      })}
    </form>
  );
};

export default FormGenerator;
