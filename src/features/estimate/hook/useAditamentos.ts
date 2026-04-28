import { useQuery } from '@tanstack/react-query';
import { getAditamentos } from '../services/insurance.service';

export const useAditamentos = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['aditamentos'],
    queryFn: async () => getAditamentos(),
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return { aditamentos: data || [], isLoading, isError };
};
