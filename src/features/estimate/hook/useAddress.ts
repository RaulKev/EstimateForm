import {
  getMunicipalities,
  getProvinces,
  getSectores,
} from '../services/direction.service';
import { useQuery } from '@tanstack/react-query';

export const useProvince = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['province'],
    queryFn: () => getProvinces(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  return { provinces: data ?? [], isLoading, isError };
};

export const useMunicipio = (province: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['municipalities', province],
    queryFn: () => getMunicipalities(province),
    enabled: !!province,
    refetchOnWindowFocus: false,
  });
  return { municipalities: data ?? [], isLoading, isError };
};

export const useSector = (province: string, municipio: string) => {
  const {
    data: sector,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sector', province, municipio],
    queryFn: () => getSectores(province, municipio),
    enabled: !!province && !!municipio,
    refetchOnWindowFocus: false,
  });
  return { sector, isLoading, isError };
};
