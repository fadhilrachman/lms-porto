import { fetcher } from "@/lib/fetcher";
import { BaseResponseList } from "@/types";
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

// type formDataUpdateMasterShifting= z.infer<typeof CreateEmployeSchema>;

export const useCreateMasterShifting = () => {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  // const { toast } = useToast();

  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.post("/operator/master-shifting", body);
      return result.data;
    },
    // onSuccess untuk memicu ulang query tertentu setelah mutasi sukses
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_MASTER_SHIFTING"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == "success") {
      // toast({
      //   title: 'Sukses',
      //   description: 'Sukses tambah divisi'
      // });
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      const messageError = Object.values(
        error.response?.data.errors?.[0] || {}
      ) as any;
      // toast({
      //   title: 'Login Error',
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

export const useListMasterShifting = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<MasterShiftingType>>({
    queryKey: ["LIST_MASTER_SHIFTING"],
    queryFn: async () => {
      const result = await fetcher.get("/operator/master-shifting", { params });
      return result.data;
    },
  });

  return query;
};

export const useUpdateMasterShifting = (id: string) => {
  //   const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  // const { toast } = useToast();
  const mutation = useMutation<any, Error>({
    mutationFn: async (body) => {
      const result = await fetcher.put(`/operator/master-shifting/${id}`, body);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_MASTER_SHIFTING"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });
  useEffect(() => {
    const status = mutation.status;
    if (status == "success") {
      const { data } = mutation;

      // toast({
      //   description: 'Berhasil edit shifting',
      //   variant: 'success'
      // });
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;
      const messageError =
        (Object.values(error?.response?.data?.errors[0]) as any) ||
        "Internal Server Error";
      // toast({
      //   title: 'Approval Error',
      //   variant: 'destructive',
      //   description: messageError
      // });

      //   enqueueSnackbar({
      //     message: messageError[0][0] || "Internal Server Error",
      //     variant: "error",
      //   });
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
