'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';

import FormGenerator from '@/components/shared/form-generator';
import { usePostRegister } from '@/hooks/auth.hook';
import { PostRegisterType } from '@/types/auth.type';

export default function Register() {
  const router = useRouter();
  const { mutateAsync, status } = usePostRegister();
  const form = useForm();
  const handleRegister = async (val: PostRegisterType) => {
    await mutateAsync(val);
    console.log(val);
    router.push(`verify-otp/${val.email}`);
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
            data={[
              {
                name: 'user_name',
                type: 'text',
                label: 'Username',
                placeholder: 'Enter your username',
                validation: {
                  required: 'This field is required',
                },
              },
              {
                name: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'Enter your email',
                validation: {
                  required: 'This field is required',
                },
              },
              {
                name: 'password',
                type: 'password',
                label: 'Password',
                placeholder: 'Enter your password',
                validation: {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'Minimal character 6',
                  },
                },
              },
              {
                name: 'confirm_password',
                type: 'password',
                label: 'Confirm Password',
                placeholder: 'Enter your password',
                validation: {
                  required: 'This field is required',
                  validate: (confirmPassword: string) => {
                    const { password } = form.getValues();

                    if (confirmPassword !== password) {
                      return 'Confirm password does not match';
                    }

                    return true;
                  },
                },
              },
            ]}
            disabled={status == 'pending'}
            form={form}
            id="formRegister"
            onSubmit={handleRegister}
          />
        </CardBody>
        <CardFooter className="">
          <div className="w-full space-y-2">
            <Button
              className="w-full"
              color="primary"
              form="formRegister"
              isLoading={status == 'pending'}
              type="submit"
            >
              Register
            </Button>
            <p className="text-sm">
              Already have an account?{' '}
              <a className="text-blue-400" href="/login">
                Login
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
