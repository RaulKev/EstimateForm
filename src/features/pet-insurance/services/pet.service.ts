import { httpClient } from '@/core/httpClient';
import type {
  InsurancesData,
  PetQuoteRequest,
} from '@/features/estimate/type/insurance.types';
import {
  UploadFileType,
  type PurchasePolicyResponse,
  type UploadImageResponse,
} from '../types/pet-service.type';
import type { Pet } from '@/features/estimate/type/types';

export const generatePetQuote = async (
  insuranceData: PetQuoteRequest
): Promise<InsurancesData> => {
  try {
    const { data } = await httpClient.post<InsurancesData>('/insurances', insuranceData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const isPendingQuote =
      data.status === 'pending' || !data.quoteNumber || data.quoteNumber <= 0;

    if (isPendingQuote) {
      throw new Error(
        'Tu cotización está siendo procesada. Te notificaremos por correo electronico.'
      );
    }

    return data;
  } catch (error) {
    console.error('Error al generar cotización de mascota:', error);
    throw new Error('Error al generar cotización. Por favor, intenta de nuevo.');
  }
};

export const uploadPetImage = async (
  file: File,
  insuranceId: string
): Promise<UploadImageResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('transactionType', UploadFileType.CAR_LICENSE);
    formData.append('insuranceId', insuranceId);

    const data = await httpClient.post<UploadImageResponse>(
      `/insurances/${insuranceId}/upload`,
      formData
    );
    return data;
  } catch (error) {
    console.error('Error al subir imagen de mascota:', error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Error al subir la imagen. Por favor, intenta de nuevo.');
  }
};

export const purchaseQuote = async (
  insuranceId: string
): Promise<PurchasePolicyResponse> => {
  try {
    const { data } = await httpClient.post<PurchasePolicyResponse>(
      `/insurances/${insuranceId}/purchase`
    );

    return data;
  } catch (error) {
    console.error('Error al comprar cotización de mascota:', error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Error al emitir la cotización. Por favor, intenta de nuevo.');
  }
};
export const getPets = async (): Promise<Pet[]> => {
  const response = await httpClient.get<Pet[]>('/insurances/pets/breeds');
  return response.data;
};
