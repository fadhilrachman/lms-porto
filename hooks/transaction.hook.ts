import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { TransactionType } from "@/types/transaction.type";
import { BaseResponseList } from "@/types";
import { fetcher } from "@/lib/fetcher";

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

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    const myMidtransClientKey = process.env.MIDTRANS_CLIENT_ID;
    const script = document.createElement("script");
    script.src = `${process.env.MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.onload = () => {
      // setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token, embedId, action) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result) {
          console.log("success", result);
          action.onSuccess(result);
        },
        onPending: function (result) {
          console.log("pending", result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };

  return { snapEmbed };
};

export const usePostTransaction = (body: { course_id: string }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async () => {
      const result = await fetcher.post(`/profile/transaction`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_TRANSACTION"] }); // Menggunakan invalidateQueries untuk memicu ulang query
      toast.success("Success delete transaction");
    },
    onError: () => {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
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
