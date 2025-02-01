// import { ChapterType } from "@/types/chapter.type";

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { PostLoginType, PostRegisterType } from '@/types/auth.type';
import { fetcher } from '@/lib/fetcher';

export const usePostLogin = () => {
  const mutation = useMutation<any, Error, PostLoginType>({
    mutationFn: async (body) => {
      const result = await fetcher.post('/auth/login', body);

      console.log({ result });

      return result.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == 'success') {
      toast.success('Success login');
    }
    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      console.log({ error });

      toast.error(error.response?.data?.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const usePostVerifiedEmail = () => {
  const mutation = useMutation<any, Error, { email: string; otp: string }>({
    mutationFn: async (body) => {
      const finalyPayload = {
        ...body,
        otp: parseInt(body.otp),
      };
      const result = await fetcher.post(
        '/auth/verification-otp',
        finalyPayload,
      );

      return result?.data;
    },
  });

  useEffect(() => {
    const status = mutation?.status;
    console.log({ status });

    if (status == 'success') {
      toast.success('Success verified email');
    }

    if (status == 'error') {
      const error = mutation?.error as AxiosError<any>;
      console.log({ error });

      toast.error(error.response?.data?.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const usePostResendOTP = () => {
  const mutation = useMutation<any, Error, { email: string }>({
    mutationFn: async (body) => {
      const result = await fetcher.post('/auth/resend-otp', body);

      return result?.data;
    },
  });

  useEffect(() => {
    const status = mutation?.status;
    console.log({ status });

    if (status == 'success') {
      toast.success('Please check your email to get a new OTP');
    }

    if (status == 'error') {
      const error = mutation?.error as AxiosError<any>;
      console.log({ error });

      toast.error(error.response?.data?.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const usePostRegister = () => {
  const mutation = useMutation<any, Error, PostRegisterType>({
    mutationFn: async (body) => {
      const result = await fetcher.post('/auth/register', body);

      console.log({ result });

      return result?.data;
    },
  });

  useEffect(() => {
    const status = mutation?.status;

    console.log({ status });

    if (status == 'success') {
      toast.success('Success register');
    }

    if (status == 'error') {
      const error = mutation?.error as AxiosError<any>;

      console.log({ error });

      toast.error(error.response?.data?.message);
    }
  }, [mutation.status]);

  return mutation;
};
// export const useOauthGoogle = () => {
//   const mutation = useMutation<any, Error>({
//     mutationFn: async (body) => {
//       const result = await fetcher.post("/auth/google");
//       return result.data;
//     },
//   });

//   return mutation;
// };

// export const useOauthGoogle = (triger: boolean) => {
//   const query = useQuery({
//     queryKey: ["OAUTH_GOOGLE"],
//     enabled: triger,
//     queryFn: async () => {
//       const result = await fetcher.get(`/auth/google`);
//       return result.data;
//     },
//   });

//   return query;
// };
