import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { CourseDetailType, CourseType } from "@/types/course.type";
import { BaseResponse, BaseResponseList } from "@/types";
import { fetcher } from "@/lib/fetcher";

export const usePostCourse = () => {
  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.post("/course", body);

      return result.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success create course");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const useGetCourse = (params: {
  page: number;
  per_page: number;
  search?: string;
  is_published?: boolean;
}) => {
  const query = useQuery<BaseResponseList<CourseType>>({
    queryKey: ["LIST_COURSE"],
    queryFn: async () => {
      const result = await fetcher.get("/course", { params });

      return result.data;
    },
  });

  return query;
};

export const useGetDetailCourse = (
  id: string,
  is_published?: boolean
  // { is_published }: { is_published?: boolean }
) => {
  const query = useQuery<BaseResponse<CourseDetailType>>({
    queryKey: ["DETAIL_COURSE"],
    queryFn: async () => {
      const result = await fetcher.get(`/course/${id}`, {
        params: {
          is_published,
        },
      });

      return result.data;
    },
  });

  return query;
};

export const usePutCourse = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.put(`/course/${id}`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DETAIL_COURSE"] }); // Menggunakan invalidateQueries untuk memicu ulang query
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

export const useDeleteCourse = (id: string) => {
  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.delete(`/course/${id}`);

      return result.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success delete course");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const usePatchCourse = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (body) => {
      const result = await fetcher.patch(`/course/${id}`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DETAIL_COURSE"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success publish course");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};
