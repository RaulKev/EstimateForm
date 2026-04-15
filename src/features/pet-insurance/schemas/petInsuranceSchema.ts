import { initialValuesCustomer } from '@/features/estimate/config/EstimeFormConfig';
import { customerSchema } from '@/features/estimate/schemas/customerSchema';
import type { QuotationRequestTerms } from '@/features/estimate/type/insurance.types';
import * as yup from 'yup';
import { PeriodsFrequency } from '@/shared/types/insurances.types';

export const petSchemaEstimate = yup.object({
  customer: customerSchema,
  pet: yup.object({
    name: yup.string().required('El nombre es requerido'),
    birthYear: yup.string().required('El año de nacimiento es requerido'),
    breedId: yup.number().required('La raza es requerida'),
    age: yup.number().required('La edad es requerida'),
    isDomestic: yup.boolean().required('Debes seleccionar si es una mascota'),
  }),
  terms: yup.object({
    paymentFraction: yup.string().required(),
    petPlan: yup.string().required('Deben seleccionar un plan para tu mascota'),
  }),
});

export type PetEstimateFormDataType = yup.InferType<typeof petSchemaEstimate> & {
  terms?: Partial<QuotationRequestTerms>;
};
export const petSchemaInitialValues = {
  terms: {
    paymentFraction: PeriodsFrequency.MONTHLY,
  },
  customer: initialValuesCustomer,
};
