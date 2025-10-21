import { carsList } from "@/mocks/car-data.mock";
import type { CarListResponse } from "../type/types";

export const getCars = async (): Promise<CarListResponse[]> => {
  return carsList;
};
