import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { fetcher } from "@/lib/fetcher";

export const usePostImage = () => {
  const mutation = useMutation<
    any,
    Error,
    { file: string; file_name: string; file_type: string }
  >({
    mutationFn: async (body) => {
      const result = await fetcher.post("/image", body);
      return result.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["DETAIL_COURSE"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    // },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == "success") {
      toast.success("Success upload img");
    }

    if (status == "error") {
      const error = mutation.error as AxiosError<any>;

      toast.error(error.response?.data.message);
    }
  }, [mutation.status]);

  return mutation;
};
