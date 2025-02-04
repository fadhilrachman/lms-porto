import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { fetcher } from "@/lib/fetcher";
import { BaseResponse } from "@/types";
import { ChapterType } from "@/types/chapter.type";

export const usePostChapter = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.post("/chapter", body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DETAIL_COURSE_ADMIN"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success create chapter");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const useGetDetailChapter = (id: string) => {
  const query = useQuery<BaseResponse<ChapterType>>({
    queryKey: ["DETAIL_CHAPTER"],
    queryFn: async () => {
      const result = await fetcher.get(`/chapter/${id}`);

      return result.data;
    },
  });

  return query;
};

export const usePatchChangePosition = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, { data: string[] }>({
    mutationFn: async (body) => {
      const result = await fetcher.patch(`/chapter/change-position`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DETAIL_COURSE_ADMIN"] }); // Menggunakan invalidateQueries untuk memicu ulang query
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
export const usePutChapter = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.put(`/chapter/${id}`, body);

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DETAIL_CHAPTER"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success update chapter");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};

export const useDeleteChapter = () => {
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
