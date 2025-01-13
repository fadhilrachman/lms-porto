import { fetcher } from "@/lib/fetcher";
import { BaseResponse, BaseResponseList } from "@/types";
import { CourseDetailType, CourseType } from "@/types/course.type";
import { MasterShiftingType } from "@/types/master-shifting.type";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

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

export const useGetDetailCourse = (id: string) => {
  const query = useQuery<BaseResponse<CourseDetailType>>({
    queryKey: ["DETAIL_COURSE"],
    queryFn: async () => {
      const result = await fetcher.get(`/course/${id}`);
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

export const useDeleteMasterShifting = () => {
  //   const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  // const { toast } = useToast();
  const mutation = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const result = await fetcher.delete(`/operator/master-shifting/${id}`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_MASTER_SHIFTING"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == "success") {
      // toast({
      //   title: 'Sukses',
      //   description: 'Sukses hapus master shifting'
      // });
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      const messageError = Object.values(
        error.response?.data.errors?.[0] || {}
      ) as any;
      // toast({
      //   title: 'Error hapus master shifting',
      //   variant: 'destructive',
      //   description: messageError || 'Internal Server Error'
      // });

      //   enqueueSnackbar({
      //     message: messageError?.[0]?.[0] || "Internal Server Error",
      //     variant: "error",
      //   });
    }
  }, [mutation.status]);

  return mutation;
};
