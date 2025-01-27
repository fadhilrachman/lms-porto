"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import Cookies from "js-cookie";

import FormGenerator from "@/components/shared/form-generator";
import { usePostLogin } from "@/hooks/auth.hook";
import { PostLoginType } from "@/types/auth.type";

export default function Login() {
  const router = useRouter();
  const form = useForm();
  const { mutateAsync, status } = usePostLogin();
  const handleLogin = async (val: PostLoginType) => {
    const result = await mutateAsync(val);

    Cookies.set(process.env.COOKIE_NAME as string, result?.token);
    router.push("/");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader>
          <h3 className="text-2xl">Login</h3>
        </CardHeader>
        <CardBody>
          <FormGenerator
            data={[
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
            ]}
            disabled={status == "pending"}
            form={form}
            id="formLogin"
            onSubmit={handleLogin}
          />
        </CardBody>
        <CardFooter className="">
          <div className="w-full space-y-2">
            <Button
              className="w-full"
              color="primary"
              form="formLogin"
              isLoading={status == "pending"}
              type="submit"
            >
              Login
            </Button>
            <p className="text-sm">
              Don't have an account?{" "}
              <a className="text-blue-400" href="/register">
                Register
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
