import { httpClient } from '@/core/httpClient';
import type { RentCar } from '../type/types';

export const getRentACar = async (insuranceId: string): Promise<RentCar[]> => {
  const response = await httpClient.get<RentCar[]>(
    `/insurances/${insuranceId}/rent-car/options`
  );
  return response.data;
};
