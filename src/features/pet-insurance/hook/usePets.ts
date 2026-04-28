import { useQuery } from '@tanstack/react-query';
import { getPets } from '../services/pet.service';

export const usePets = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pets'],
    queryFn: getPets,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const petsOption = data?.map((pet) => ({
    value: pet.id.toString(),
    label: pet.descripcion,
  }));

  return {
    pets: petsOption,
    isLoading,
    isError,
  };
};
