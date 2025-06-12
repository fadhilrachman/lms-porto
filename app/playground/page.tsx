"use client";
import FormGenerator, {
  DataFormType,
} from "@/components/shared/form-generator";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React from "react";
import { useForm } from "react-hook-form";

const PlayroundPage = () => {
  const form = useForm();
  const dataForm: DataFormType[] = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Name",
      validation: {
        required: {
          value: true,
          message: "This field is required!",
        },
      },
    },
    {
      name: "file",
      type: "file",
      label: "File",
      placeholder: "file",
      validation: {
        required: {
          value: true,
          message: "This field is required!",
        },
      },
    },
  ];
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Card className="w-[400px] mx-auto">
        <CardHeader>
          <h3>Example Form</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <FormGenerator
            data={dataForm}
            onSubmit={() => {}}
            form={form}
            className=""
            id="exampleForm"
          />
          <Button type="submit" form="exampleForm">
            Submit
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PlayroundPage;
