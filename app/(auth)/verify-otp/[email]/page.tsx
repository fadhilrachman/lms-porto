'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { InputOtp } from '@heroui/input-otp';
import React, { useState } from 'react';
import { usePostResendOTP, usePostVerifiedEmail } from '@/hooks/auth.hook';
import { useParams } from 'next/navigation';
import OTPCounter from '@/components/shared/OTPCounter';

export default function Page() {
  const { email } = useParams();
  const [value, setValue] = React.useState('');
  const { mutate, status } = usePostVerifiedEmail();
  const { mutateAsync: resendOtp, status: resendOtpStatus } =
    usePostResendOTP();
  const [otpDate, setOtpDate] = useState(null);

  const decodedEmail = email ? decodeURIComponent(email as string) : '';
  const handleDate = async () => {
    try {
      const response: any = await resendOtp({
        email: decodedEmail as string,
      });
      if (response) {
        const seccond = 5; // one minute
        setOtpDate(Date.now() + seccond * 10000); //seccond
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  console.log(email);
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[500px] p-6">
        <CardHeader className="flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold">Register</h3>
          <p>Check your email to get OTP code</p>
        </CardHeader>
        <CardBody className="flex flex-row justify-center items-center gap-3">
          <InputOtp
            autoFocus
            length={6}
            value={value}
            onValueChange={setValue}
          />
        </CardBody>
        <CardFooter>
          <div className="w-full flex items-center flex-col justify-center space-y-3">
            <Button
              isLoading={status === 'pending'}
              className="w-fit"
              color="primary"
              onPress={() =>
                mutate({
                  email: decodedEmail,
                  otp: value,
                })
              }
            >
              Verify OTP
            </Button>
            <p className="text-sm">
              don't get the OTP code?{' '}
              <OTPCounter
                date={otpDate}
                handleDate={handleDate}
                // key={DateSendOtp}
                loading={resendOtpStatus === 'pending'}
              />
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
