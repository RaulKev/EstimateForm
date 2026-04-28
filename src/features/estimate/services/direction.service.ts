import { httpClient } from '@/core/httpClient';
import type { Municipality, Province, Sector } from '../type/types';

export const getProvinces = async (): Promise<Province[]> => {
  const response = await httpClient.get<string[]>(`/insurances/addresses/provincias`);
  return response.data.map((name: string, index: number) => ({
    id: index + 1,
    name,
  }));
};

export const getMunicipalities = async (province: string): Promise<Municipality[]> => {
  const response = await httpClient.get<string[]>(
    `/insurances/addresses/municipios?provincia=${province}`
  );
  return response.data.map((name: string, index: number) => ({
    id: index + 1,
    name,
  }));
};
export const getSectores = async (
  provincia: string,
  municipality: string
): Promise<Sector[]> => {
  const response = await httpClient.get<string[]>(
    `/insurances/addresses/sectores?provincia=${provincia}&municipio=${municipality}`
  );
  return response.data.map((name: string, index: number) => ({
    id: index + 1,
    name,
  }));
};

