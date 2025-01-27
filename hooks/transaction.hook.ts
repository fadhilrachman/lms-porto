import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
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
