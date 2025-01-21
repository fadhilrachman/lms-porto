"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import FormGenerator from "@/components/shared/form-generator";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { usePostLogin } from "@/hooks/auth.hook";
import { PostLoginType } from "@/types/auth.type";
import Cookies from "js-cookie";

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
            disabled={status == "pending"}
            form={form}
            id="formLogin"
            onSubmit={handleLogin}
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
          />
        </CardBody>
        <CardFooter className="">
          <div className="w-full space-y-2">
            <Button
              className="w-full"
              color="primary"
              type="submit"
              form="formLogin"
              isLoading={status == "pending"}
            >
              Login
            </Button>
            <p className="text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-400">
                Register
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
