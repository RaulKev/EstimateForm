import { InsurancesType } from '@/mocks/summary.mock';
import type { PetEstimateFormDataType } from '../schemas/petInsuranceSchema';
import { Documents, Gender } from '@/features/estimate/type/types';
import { API_DEFAULTS } from '../../estimate/config/apiDefaults';
import type { PetQuoteRequest } from '@/features/estimate/type/insurance.types';

const customerAddress = API_DEFAULTS.customerDefaults.address;

export const formatPetInsuranceRequest = (
  data: PetEstimateFormDataType,
  companyId: string
): PetQuoteRequest => {
  return {
    companyId,
    product: InsurancesType.PET_INSURANCE,
    customer: {
      firstName: data.customer.firstName ?? '',
      lastName: data.customer.lastname ?? '',
      birthDate: data.customer.birthDate,
      occupation: 'Vendedor o Comerciante',
      gender: data.customer.gender === Gender.MALE ? 'M' : 'F',
      email: data.customer.email,
      phone: data.customer.phone,
      documentType: data.customer.documentType === Documents.ID ? 'Cedula' : 'Pasaporte',
      documentNumber: data.customer.documentNumber,
      address: customerAddress,
    },
    pet: {
      name: data.pet.name,
      birthYear: data.pet.birthYear,
      raceId: data.pet.breedId,
      age: data.pet.age,
      isDomestic: data.pet.isDomestic,
    },
    terms: {
      petPlan: data.terms.petPlan,
      paymentFraction: data.terms.paymentFraction,
    },
  };
};
