import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { CourseType, CourseDetailType } from "@/types/user/course.type";
import { BaseResponse, BaseResponseList } from "@/types";
import { fetcher } from "@/lib/fetcher";

export const useGetUserCourse = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<CourseType>>({
    queryKey: ["USER_LIST_COURSE"],
    queryFn: async () => {
      const result = await fetcher.get("/profile/course", { params });
      const idCourses = result?.data?.result?.map((val) => val.course.id);
      if (typeof window !== "undefined") {
        localStorage.setItem("myCourse", JSON.stringify(idCourses));
      }

      return result.data;
    },
  });

  return query;
};

export const useGetDetailUserCourse = (id: string) => {
  const query = useQuery<BaseResponse<CourseDetailType>>({
    queryKey: ["USER_DETAIL_COURSE"],
    queryFn: async () => {
      const result = await fetcher.get(`/profile/course/${id}`);

      return result.data;
    },
  });

  return query;
};

export const usePatchUserCourse = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (body: any) => {
      const result = await fetcher.patch(
        `/profile/course/${id}/completed`,
        body
      );
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER_DETAIL_COURSE"] }); // Menggunakan invalidateQueries untuk memicu ulang query
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
