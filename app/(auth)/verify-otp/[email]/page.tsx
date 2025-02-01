import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import React from 'react';

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader>
          <h3 className="text-2xl">Register</h3>
        </CardHeader>
        <CardBody>
          kontoll
          {/* <FormGenerator
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
          /> */}
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
