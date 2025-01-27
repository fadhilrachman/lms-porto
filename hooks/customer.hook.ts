import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { CustomerType, PostCustomerType } from "@/types/customer.type";
import { BaseResponseList } from "@/types";
import { fetcher } from "@/lib/fetcher";

export const usePostCustomer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, PostCustomerType>({
    mutationFn: async (body) => {
      const result = await fetcher.post("/dashboard/customer", body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_CUSTOMER"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success create customer");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const useGetCustomer = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<CustomerType>>({
    queryKey: ["LIST_CUSTOMER"],
    queryFn: async () => {
      const result = await fetcher.get("/dashboard/customer", { params });

      return result.data;
    },
  });

  return query;
};

export const useDeleteCustomer = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async () => {
      const result = await fetcher.delete(`/dashboard/customer/${id}`);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_CUSTOMER"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success delete customer");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};
