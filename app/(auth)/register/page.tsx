'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';

import FormGenerator from '@/components/shared/form-generator';
import { useOauthGoogle, usePostRegister } from '@/hooks/auth.hook';
import { PostRegisterType } from '@/types/auth.type';
import BaseImg from '@/components/shared/base-image';

export default function Register() {
  const router = useRouter();
  const { mutateAsync, status } = usePostRegister();
  const { mutateAsync: oAouth, status: oAouthStatus } = useOauthGoogle();
  const form = useForm();
  const handleRegister = async (val: PostRegisterType) => {
    await mutateAsync(val, {
      onError: (error: any) => {
        console.log(error);
        if (error.response?.data?.message === 'Verify account first') {
          router.push(`/verify-otp/${val.email}`);
        }
      },
    });
    console.log(val);
    router.push(`verify-otp/${val.email}`);
  };

  const handleOauthGoogle = async () => {
    const result = await oAouth();
    console.log({ result });

    window.location.href = result.url;
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[500px] p-6">
        <CardHeader className="justify-center">
          <h3 className="text-2xl font-semibold">Register</h3>
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
        <CardFooter className="flex flex-col justify-center space-y-8">
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
          <div className="flex items-center justify-center gap-2 w-full">
            <div className="w-28 h-[2px] rounded-full bg-white"></div>
            <p>Login or Register with</p>
            <div className="w-28 h-[2px] rounded-full bg-white"></div>
          </div>
          <Button
            onPress={handleOauthGoogle}
            isLoading={oAouthStatus === 'pending'}
            className="bg-white font-semibold text-lg text-black px-12"
          >
            <img
              src={'/images/google-logo.png'}
              alt="Google Logo"
              width={32}
              height={32}
              className="bg-contain bg-center"
            />
            <span className="">Google</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
