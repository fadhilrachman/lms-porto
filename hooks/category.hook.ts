import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { fetcher } from "@/lib/fetcher";
import { BaseResponseList } from "@/types";
import { CategoryType } from "@/types/category.type";

export const usePostCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.post("/category", body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_CATEGORY"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success create category");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const useGetCategory = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<CategoryType>>({
    queryKey: ["LIST_CATEGORY"],
    queryFn: async () => {
      const result = await fetcher.get("/category", { params });

      return result.data;
    },
  });

  return query;
};

export const usePutCategory = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.put(`/category/${id}`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_CATEGORY"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success update course");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async () => {
      const result = await fetcher.delete(`/category/${id}`);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_CATEGORY"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success update category");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};
