"use client";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState, ReactNode } from "react";
import { Controller, RegisterOptions, UseFormReturn } from "react-hook-form";

export interface DataFormType {
  // name:''
  label?: string | ReactNode;
  type: "text" | "email" | "password" | "select";

  name: string;
  placeholder?: string;
  helperText?: string;
  startContent?: React.ReactNode;
  endContent?: ReactNode;
  validation?: RegisterOptions;
  disabled?: boolean;
  options?: { key: string; label: React.ReactNode }[];
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

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];
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
      key={id}
      className={`${className} grid   gap-4`}
      id={id}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {data.map((val, key) => {
        if (val.type === "select") {
          return (
            <Controller
              key={key}
              control={form.control}
              name={val.name}
              render={({ field, fieldState }) => {
                return (
                  <Autocomplete
                    {...field}
                    disabled={val?.disabled || disabled}
                    endContent={val.endContent}
                    errorMessage={fieldState.error?.message}
                    inputValue={field.value}
                    isInvalid={!!fieldState.error}
                    label={val.label}
                    labelPlacement="outside"
                    placeholder={val.placeholder}
                    startContent={val.startContent}
                    onInputChange={(value) => field.onChange(value)}
                  >
                    {(val?.options || []).map((animal) => (
                      <AutocompleteItem key={animal.key}>
                        {animal.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                );
              }}
              rules={val.validation}
            />
          );
        }
        if (val.type === "text") {
          return (
            <Controller
              key={key}
              control={form.control}
              name={val.name}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    disabled={val?.disabled || disabled}
                    endContent={val.endContent}
                    errorMessage={fieldState.error?.message}
                    isInvalid={!!fieldState.error}
                    placeholder={val.placeholder}
                    startContent={val.startContent}
                    type="text"
                    validationState={fieldState.error ? "invalid" : "valid"}
                    label={val.label}
                    // isRequired={!!val.validation?.required}
                    labelPlacement="outside"
                  />
                );
              }}
              rules={val.validation}
            />
          );
        }

        if (val.type === "email") {
          return (
            <Controller
              key={key}
              control={form.control}
              name={val.name}
              render={({ field, fieldState }) => {
                console.log({ error: fieldState.error });

                return (
                  <Input
                    {...field}
                    disabled={val?.disabled || disabled}
                    endContent={val.endContent}
                    errorMessage={fieldState.error?.message}
                    isInvalid={!!fieldState.error}
                    labelPlacement="outside"
                    placeholder={val.placeholder}
                    startContent={val.startContent}
                    validationState={fieldState.error ? "invalid" : "valid"}
                    type="text"
                    // isRequired={!!val.validation?.required}
                    label={val.label}
                  />
                );
              }}
              rules={val.validation}
            />
          );
        }

        if (val.type === "password") {
          const [isShow, setIsShow] = useState(false);

          return (
            <Controller
              key={key}
              control={form.control}
              name={val.name}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
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
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  label={val.label}
                  placeholder={val.placeholder}
                  type={isShow ? "text" : "password"}
                  validationState={fieldState.error ? "invalid" : "valid"}
                  labelPlacement="outside"
                  // isRequired={!!val.validation?.required}
                  disabled={val?.disabled || disabled}
                />
              )}
              rules={val.validation}
            />
          );
        }

        // if (val.type === "email") {
        //   return (
        //     <Input
        //       key={key}
        // isRequired;
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
        // isRequired;
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
