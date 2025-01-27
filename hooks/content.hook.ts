import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { fetcher } from "@/lib/fetcher";
import { BaseResponse } from "@/types";
import { ContentType } from "@/types/content.type";

export const usePostContent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.post("/content", body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DETAIL_CHAPTER"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success create content");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const usePatchChangePositionContent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, { data: string[] }>({
    mutationFn: async (body) => {
      const result = await fetcher.patch(`/content/change-position`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DETAIL_CHAPTER"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success change position");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const useGetDetailContent = (id: string) => {
  const query = useQuery<BaseResponse<ContentType>>({
    queryKey: ["DETAIL_CONTENT"],
    queryFn: async () => {
      const result = await fetcher.get(`/content/${id}`);

      return result.data;
    },
  });

  return query;
};

export const usePutContent = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.put(`/content/${id}`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DETAIL_CONTENT"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success update content");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const useDeleteContent = (id: string) => {
  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.delete(`/content/${id}`);

      return result.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success delete content");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const usePatchContent = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (body) => {
      const result = await fetcher.patch(`/content/${id}`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DETAIL_CONTENT"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success publish content");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};
