'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import Cookies from 'js-cookie';

import FormGenerator from '@/components/shared/form-generator';
import { usePostLogin } from '@/hooks/auth.hook';
import { PostLoginType } from '@/types/auth.type';
import { SiGoogle } from 'react-icons/si';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const form = useForm();
  const { mutateAsync, status } = usePostLogin();
  const handleLogin = async (val: PostLoginType) => {
    const result = await mutateAsync(val);
    // if (typeof window !== 'undefined'){
    //   localStorage.setItem('user', {})
    // }
    Cookies.set(process.env.COOKIE_NAME as string, result?.token);
    router.push('/');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[500px] p-6">
        <CardHeader className="justify-center">
          <h3 className="text-2xl font-bold">Login</h3>
        </CardHeader>
        <CardBody>
          <FormGenerator
            data={[
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
                },
              },
            ]}
            disabled={status == 'pending'}
            form={form}
            id="formLogin"
            onSubmit={handleLogin}
          />
        </CardBody>
        <CardFooter className="flex flex-col justify-center space-y-12">
          <div className="w-full space-y-2">
            <Button
              className="w-full"
              color="primary"
              form="formLogin"
              isLoading={status == 'pending'}
              type="submit"
            >
              Login
            </Button>
            <p className="text-sm">
              Don't have an account?{' '}
              <a className="text-blue-400" href="/register">
                Register
              </a>
            </p>
          </div>
          <p>Login or Register with</p>
          <Button className="bg-white font-semibold text-lg text-black px-12">
            <Image
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
