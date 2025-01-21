"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { nextAuthSignIn } from "@/lib/server-action/next-auth-actions"; // Impor Server Action
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import FormGenerator from "@/components/shared/form-generator";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { usePostRegister } from "@/hooks/auth.hook";
import { PostRegisterType } from "@/types/auth.type";

export default function Register() {
  const router = useRouter();
  const { mutateAsync, status } = usePostRegister();
  const form = useForm();
  const handleRegister = async (val: PostRegisterType) => {
    await mutateAsync(val);
    router.push("/login");
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader>
          <h3 className="text-2xl">Register</h3>
        </CardHeader>
        <CardBody>
          <FormGenerator
            key={1}
            form={form}
            id="formRegister"
            disabled={status == "pending"}
            onSubmit={handleRegister}
            data={[
              {
                name: "user_name",
                type: "text",
                label: "Username",
                placeholder: "Enter your username",
                validation: {
                  required: "This field is required",
                },
              },
              {
                name: "email",
                type: "email",
                label: "Email",
                placeholder: "Enter your email",
                validation: {
                  required: "This field is required",
                },
              },
              {
                name: "password",
                type: "password",
                label: "Password",
                placeholder: "Enter your password",
                validation: {
                  required: "This field is required",
                },
              },
              {
                name: "confirm_password",
                type: "password",
                label: "Confirm Password",
                placeholder: "Enter your password",
                validation: {
                  required: "This field is required",
                },
              },
            ]}
          />
        </CardBody>
        <CardFooter className="">
          <div className="w-full space-y-2">
            <Button
              className="w-full"
              type="submit"
              form="formRegister"
              color="primary"
              isLoading={status == "pending"}
            >
              Register
            </Button>
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400">
                Login
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
