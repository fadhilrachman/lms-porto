import { fetcher } from '@/lib/fetcher';
import { BaseResponseList } from '@/types';
import { TransactionType } from '@/types/transaction.type';
import { useQuery } from '@tanstack/react-query';

interface MeType {
  id: string;
  user_name: string;
  email: string;
  created_at: string;
}

export const useGetTransactionUser = (params: {
  page: number;
  per_page: number;
  search?: string;
}) => {
  const query = useQuery<BaseResponseList<TransactionType>>({
    queryKey: ['LIST_TRANSACTION_USER'],
    queryFn: async () => {
      const result = await fetcher.get('/profile/transaction', { params });

      return result.data;
    },
  });

  return query;
};

export const useGetMe = () => {
  const query = useQuery<MeType>({
    queryKey: ['ME'],
    queryFn: async () => {
      const result = await fetcher.get('/profile/me');

      return result.data.result;
    },
  });

  return query;
};
