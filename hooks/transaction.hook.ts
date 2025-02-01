import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { TransactionType } from "@/types/transaction.type";
import { BaseResponseList } from "@/types";
import { fetcher } from "@/lib/fetcher";

declare global {
  interface Window {
    snap: any;
  }
}
export const useGetTransaction = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<TransactionType>>({
    queryKey: ["LIST_TRANSACTION"],
    queryFn: async () => {
      const result = await fetcher.get("/dashboard/transaction", { params });

      return result.data;
    },
  });

  return query;
};

export const useSnapMidtrans = () => {
  const [snap, setSnap] = useState<any>(null);

  console.log({ snap });

  useEffect(() => {
    const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY;
    console.log({ myMidtransClientKey });

    const script = document.createElement("script");
    script.src = `https://app.sandbox.midtrans.com/snap/snap.js`;

    script.setAttribute("data-client-key", myMidtransClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapModal = (snap_token: string) => {
    if (snap) {
      snap.pay(snap_token, {
        onSuccess: function (result) {
          console.log("success", result);
        },
        onPending: function (result) {
          console.log("pending", result);
        },
        onError: function (error) {
          console.error("error", error);
        },
        onClose: function () {
          console.log("Modal closed");
        },
      });
    } else {
      console.error("Snap error broooooo!");
    }
  };

  return { snapModal };
};

export const usePostTransaction = (body: { course_id: string }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async () => {
      const result = await fetcher.post(`/profile/transaction`, body);

      return result.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success transaction");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const useDeleteCustomer = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async () => {
      const result = await fetcher.delete(`/dashboard/transaction/${id}`);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_CUSTOMER"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success delete transaction");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};
