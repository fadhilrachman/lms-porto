import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { CourseType, CourseDetailType } from "@/types/user/course.type";
import { BaseResponse, BaseResponseList } from "@/types";
import { fetcher } from "@/lib/fetcher";

export const useGetCourse = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<CourseType>>({
    queryKey: ["USER_LIST_COURSE"],
    queryFn: async () => {
      const result = await fetcher.get("/profile/course", { params });
      return result.data;
    },
  }); 

  return query;
};

export const useGetDetailCourse = (id: string) => {
  const query = useQuery<BaseResponse<CourseDetailType>>({
    queryKey: ["USER_DETAIL_COURSE"],
    queryFn: async () => {
      const result = await fetcher.get(`/profile/course/${id}`);
      return result.data;
    },
  });

  return query;
};

export const usePatchCourse = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.patch(
        `/profile/course/${id}/completed`,
        body,
      );
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
