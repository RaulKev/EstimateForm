// car-estimate.service.ts
import { carsList } from "@/mocks/car-data.mock";
import { Documents, Gender, type CarListResponse } from "../type/types";
import { insuranceResponse, type Insurance } from "@/mocks/request.mock";
import type { EstimateFormData } from "../config/EstimeFormConfig";

export const getCars = async (): Promise<CarListResponse[]> => {
  return carsList;
};

export const generateInsurance = async (
  data: EstimateFormData
): Promise<Insurance> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      
      if (randomNumber === 1) {
        const policyNumber = `POL-${Date.now()}-${Math.floor(
                    Math.random() * 1000
                )}`;
        // HAPPY PATH: Genera insurance con datos del formulario
        const insurance: Insurance = {
          ...insuranceResponse,
          id: `INS-${Date.now()}`,
          quoteNumber: Math.floor(Math.random() * 1000000),
          policyNumber,
          customer: {
            firstName: data.customer.name || 'N/A',
            lastName: data.customer.lastname || 'N/A',
            gender: data.customer.gender === Gender.MALE ? 'Masculino' : 'Femenino',
            documentType: data.customer.documentType === Documents.ID ? 'Cedúla' : 'Pasaporte',
            documentNumber: data.customer.documentNumber,
            phone: data.customer.phone,
            email: data.customer.email,
          },
          terms: {
            ...insuranceResponse.terms,
            vehicularAssistance: data.car.terms.vehicleAssistance,
            substituteAuto: data.car.terms.replacementCar,
            premium: 1000, 
            tax: Math.round(data.car.worth * 0.05 * 0.18), // 18% de impuesto
            totalAmount: Math.round(data.car.worth * 0.05 * 1.18),
          },
          quotationRequest: data,
          requestDate: new Date(),
          quoteDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        resolve(insurance);
      } else {
        // UNHAPPY PATH
        reject(new Error("Error al cotizar. Por favor intenta nuevamente."));
      }
    }, 1500); 
  });
};