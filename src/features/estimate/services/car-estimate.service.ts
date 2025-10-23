import { carsList } from "@/mocks/car-data.mock";
import type { CarListResponse } from "../type/types";
import { insuranceResponse, type Insurance } from "@/mocks/request.mock";
import type { EstimateFormData } from "../config/EstimeFormConfig";

export const getCars = async (): Promise<CarListResponse[]> => {
  return carsList;
};

export const generateInsurance = async (data: EstimateFormData): Promise<Insurance> => {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      if (randomNumber === 1) {
        resolve(insuranceResponse);
      } else {
        throw new Error("Error al cotizar");
      }
    }, 400);
  });
};
