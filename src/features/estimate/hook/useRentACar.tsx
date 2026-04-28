import { useQuery } from '@tanstack/react-query';
import { getRentACar } from '../services/term.service';

export const useRentACar = (insurancesId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['rent-a-car', insurancesId],
    queryFn: () => getRentACar(insurancesId),
    enabled: !!insurancesId && enabled,
  });
};
