import * as yup from 'yup';
import { RelationShip } from '../type/types';
import { InsurancesType } from '@/mocks/summary.mock';

export const additionalDataSchema = yup.object({
  customer: yup.object({
    occupation: yup.string().required('Selecciona una ocupación.'),
    address: yup.object({
      street: yup
        .string()
        .required('La calle es requerida.')
        .min(3, 'Mínimo 3 caracteres'),
      referencePoint: yup.string().optional(),
      province: yup
        .string()
        .required('La provincia es requerida.')
        .min(1, 'Selecciona una provincia.'),
      municipality: yup.string().when('province', {
        is: (province: string) => !!province && province.length > 0,
        then: (schema) =>
          schema
            .required('El municipio es requerido.')
            .min(1, 'Selecciona un municipio válido.'),
        otherwise: (schema) => schema.optional(),
      }),
      sector: yup.string().when('municipality', {
        is: (municipality: string) => !!municipality && municipality.length > 0,
        then: (schema) => schema.required('El sector es requerido.'),
        otherwise: (schema) => schema.optional(),
      }),
    }),
    dueDiligence: yup.object({
      politicallyExposed: yup.boolean().defined().default(false),
      isItACloseRelative: yup.mixed<RelationShip>().when('politicallyExposed', {
        is: true,
        then: (schema) =>
          schema
            .oneOf(
              [RelationShip.FAMILY, RelationShip.IAM],
              'Selecciona una opción válida.'
            )
            .required('Selecciona una opción válida.'),
        otherwise: (schema) => schema.optional(),
      }),
      familyName: yup.string().when(['politicallyExposed', 'isItACloseRelative'], {
        is: (politically: boolean, isRelative: RelationShip) =>
          politically === true && isRelative === RelationShip.FAMILY,
        then: (schema) => schema.required('El nombre del familiar es requerido.'),
        otherwise: (schema) => schema.optional(),
      }),
      kinship: yup.string().when(['politicallyExposed', 'isItACloseRelative'], {
        is: (politically: boolean, isRelative: RelationShip) =>
          politically === true && isRelative === RelationShip.FAMILY,
        then: (schema) => schema.required('La relación familiar es requerida.'),
        otherwise: (schema) => schema.optional(),
      }),
      position: yup.string().when(['politicallyExposed', 'isItACloseRelative'], {
        is: (politically: boolean, isRelative: RelationShip) =>
          politically === true && isRelative === RelationShip.IAM,
        then: (schema) => schema.required('El cargo público es requerido.'),
        otherwise: (schema) => schema.optional(),
      }),
      positionFamily: yup.string().when(['politicallyExposed', 'isItACloseRelative'], {
        is: (politically: boolean, isRelative: RelationShip) =>
          politically === true && isRelative === RelationShip.FAMILY,
        then: (schema) => schema.required('El cargo del familiar es requerido.'),
        otherwise: (schema) => schema.optional(),
      }),
    }),
    requiresFiscalReceipt: yup.boolean().defined().default(false),
    hasIntermediary: yup.boolean().defined().default(false),
    intermediary: yup.string().when('hasIntermediary', {
      is: (hasIntermediary: boolean) => hasIntermediary,
      then: (schema) => schema.required('El intermediario es requerido'),
      otherwise: (schema) => schema.optional(),
    }),
  }),
  endorsmentPolicy: yup.object({
    hasEndorsmentPolicy: yup.boolean().defined().default(false),
    institution: yup.string().when('hasEndorsmentPolicy', {
      is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
      then: (schema) => schema.required('La institución es requerida'),
      otherwise: (schema) => schema.optional(),
    }),
    subsidiary: yup.string().when('hasEndorsmentPolicy', {
      is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
      then: (schema) => schema.required('La subsidiaria es requerida'),
      otherwise: (schema) => schema.optional(),
    }),
    executiveName: yup.string().when('hasEndorsmentPolicy', {
      is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
      then: (schema) => schema.required('El nombre del ejecutivo es requerido'),
      otherwise: (schema) => schema.optional(),
    }),
    executiveEmail: yup
      .string()
      .email('Debe ser un correo válido.')
      .when('hasEndorsmentPolicy', {
        is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
        then: (schema) =>
          schema
            .personaleEmail()
            .required('El correo electrónico del ejecutivo es requerido'),
        otherwise: (schema) => schema.optional(),
      }),
    executivePhoneNumber: yup.string().when('hasEndorsmentPolicy', {
      is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
      then: (schema) =>
        schema
          .matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos.')
          .dominicPhone('El teléfono debe comenzar con 809, 829 o 849.'),
      otherwise: (schema) => schema.optional(),
    }),
  }),
  smartDevice: yup.object({
    installationType: yup.string().required('Selecciona un tipo de instalación.'),
    installationCenter: yup.string().required('Selecciona el centro de instalación.'),
  }),
});

export type AdditionalDataFormData = yup.InferType<typeof additionalDataSchema>;

export type MixedAdditionalDataFormData =
  | AdditionalDataFormData
  | Omit<AdditionalDataFormData, 'smartDevice' | 'endorsmentPolicy'>
  | Omit<AdditionalDataFormData, 'smartDevice'>;

export const createAdditionalDataSchema = (insuranceType: InsurancesType) => {
  let schema;

  switch (insuranceType) {
    case InsurancesType.DRIVE_INSURANCE:
      schema = additionalDataSchema;
      break;
    case InsurancesType.AUTO_INSURANCE:
      schema = additionalDataSchema.omit(['smartDevice']);
      break;
    case InsurancesType.PET_INSURANCE:
      schema = additionalDataSchema.omit(['smartDevice', 'endorsmentPolicy']);
      break;
    default:
      schema = additionalDataSchema;
      break;
  }

  return schema;
};

export const additionalDataDefaultValues = {
  customer: {
    occupation: '',
    address: {
      street: '',
      province: '',
      municipality: '',
      sector: '',
      referencePoint: '',
    },
    dueDiligence: {
      politicallyExposed: false,
      isItACloseRelative: undefined,
      familyName: '',
      kinship: '',
      position: '',
      positionFamily: '',
    },
    requiresFiscalReceipt: false,
    hasIntermediary: false,
    intermediary: '',
  },
  endorsmentPolicy: {
    hasEndorsmentPolicy: false,
    institution: '',
    subsidiary: '',
    executiveName: '',
    executiveEmail: '',
    executivePhoneNumber: '',
  },
};
