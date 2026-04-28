import * as yup from 'yup';
import {
  CarInsurances,
  Documents,
  FuelsType,
  Gas,
  Gender,
  InstallatationType,
  MaritalStatus,
  NOT_ALLOWED_CORPORATE_EMAIL_DOMAINS,
  ReplacementsCar,
  type AddonPayload,
  type Car,
  type Customer,
} from '../type/types';

declare module 'yup' {
  interface StringSchema {
    phoneMasked(pattern: RegExp, message?: string): StringSchema;
    personaleEmail(message?: string): StringSchema;
    dominicPhone(message: string): StringSchema;
  }
}

yup.addMethod<yup.StringSchema>(
  yup.string,
  'phoneMasked',
  function (pattern: RegExp, message = 'Teléfono inválido') {
    return this.test('phoneMasked', message, function (value) {
      // Si está vacío, que otra regla (required) se encargue
      if (!value) return true;
      const raw = (this.originalValue ?? '').replace(/\D/g, '');
      return pattern.test(raw);
    });
  }
);
yup.addMethod<yup.StringSchema>(yup.string, 'dominicPhone', function (message = '') {
  return this.test('dominicPhone', message, function (value) {
    if (!value) return true;
    const digits = value.replace(/\D/g, '');
    return /^(809|829|849)\d{7}$/.test(digits);
  });
});

yup.addMethod<yup.StringSchema>(
  yup.string,
  'personaleEmail',
  function (message = 'Correo electronico inválido.') {
    return this.test('personaleEmail', message, function (value) {
      if (!value) return true;
      const domain = value.split('@')[1]?.toLowerCase();
      if (NOT_ALLOWED_CORPORATE_EMAIL_DOMAINS.includes(domain)) {
        return false;
      }
      return true;
    });
  }
);

// Patrones de ejemplo (ajusta a tu país/regla)
const rdCedulaDigits = /^\d{11}$/;
const rdPhone = /^\d{10}$/;
const passportRegex = /^[A-Z0-9]{6,15}$/i;
const currentYear = new Date().getFullYear() + 1;
const MIN_WORTH = 200_000;
const MAX_WORTH = 7_000_000;

export const initialValuesCustomer: Customer = {
  email: '',
  phone: '',
  documentType: undefined,
  documentNumber: '',
  firstName: '',
  lastname: '',
  gender: undefined,
  birthDate: '',
  maritalStatus: undefined,
};
export const initialValuesCar: Car = {
  brand: '',
  modelId: 0,
  year: currentYear,
  isNew: undefined,
  fuelType: undefined,
  gasType: undefined,
  installationType: undefined,
  isPersonalUse: false,
  worth: 0,
  terms: {
    insuranceType: CarInsurances.BASE,
    vehicleAssistance: true,
    replacementCar: ReplacementsCar.NONE,
    rentCarOption: {
      codCategoria: '',
      codDias: '',
    },
    zeroDeductible: false,
  },
};
export const initialValues = {
  customer: initialValuesCustomer,
  car: initialValuesCar,
  addons: [] as AddonPayload[],
};
export const schemaEstimate = yup.object().shape({
  customer: yup.object({
    email: yup
      .string()
      .email('Correo electronico inválido.')
      .personaleEmail('Correo electronico inválido')
      .required('Correo electronico requerido.'),
    phone: yup
      .string()
      .phoneMasked(rdPhone, 'Teléfono debe tener 10 digitos.')
      .dominicPhone('El teléfono debe comenzar con 809, 829 o 849.')
      .required('El teléfono es requerido.'),
    documentType: yup
      .mixed<Documents>()
      .oneOf([Documents.ID, Documents.PASSPORT])
      .required('Selecciona el tipo de documento.'),
    documentNumber: yup
      .string()
      .required('Ingresa el número de documento.')
      .when('documentType', {
        is: Documents.ID,
        then: (schema) =>
          schema.test(
            'cedula-rd',
            'Cédula inválida (debe tener 11 dígitos).',
            function (value) {
              if (!value) return false;
              const raw = value.replace(/\D/g, '');
              return rdCedulaDigits.test(raw);
            }
          ),
        otherwise: (schema) =>
          schema.matches(
            passportRegex,
            'Pasaporte inválido (6-15 caracteres alfanuméricos).'
          ),
      }),
    firstName: yup.string().when('documentType', {
      is: Documents.PASSPORT,
      then: (schema) =>
        schema.required('Nombres requeridos.').min(2, 'Mínimo 2 caracteres'),
      otherwise: (schema) => schema.optional(),
    }),

    lastname: yup.string().when('documentType', {
      is: Documents.PASSPORT,
      then: (schema) =>
        schema.required('Apellidos requeridos.').min(2, 'Mínimo 2 caracteres'),
      otherwise: (schema) => schema.optional(),
    }),

    birthDate: yup.string().when('documentType', {
      is: Documents.PASSPORT,
      then: (schema) =>
        schema
          .required('Fecha de nacimiento requerida.')
          .matches(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
      otherwise: (schema) => schema.optional(),
    }),

    gender: yup.mixed<Gender>().when('documentType', {
      is: Documents.PASSPORT,
      then: (schema) =>
        schema
          .oneOf([Gender.MALE, Gender.FEMALE], 'Género inválido')
          .required('Género requerido'),
      otherwise: (schema) => schema.optional(),
    }),
    maritalStatus: yup.mixed<MaritalStatus>().when('documentType', {
      is: Documents.PASSPORT,
      then: (schema) =>
        schema
          .oneOf(
            [MaritalStatus.SOLTERO, MaritalStatus.CASADO, MaritalStatus.VIUDO],
            'Estado civil invalido.'
          )
          .required('Estado civil requerido'),
      otherwise: (schema) => schema.optional(),
    }),
  }),

  car: yup.object({
    brand: yup.string().required('Selecciona una marca de auto.'),
    modelId: yup.number().when('brand', {
      is: (brand: string) => !!brand && brand.length > 0,
      then: (schema) => schema.min(1, 'Selecciona un modelo válido.'),
      otherwise: (schema) => schema.optional().transform(() => 0),
    }),
    year: yup.number().when(['brand', 'isNew'], ([brand, isNew], schema) => {
      if (!brand || brand.length === 0) {
        return schema.optional();
      }
      let yearSchema = schema
        .min(1990, 'Seleccione un año válido.')
        .max(currentYear, 'El año no es válido.');
      if (isNew === true) {
        yearSchema = yearSchema.oneOf(
          [currentYear],
          `Si el vehículo es nuevo, el año debe ser ${currentYear}`
        );
      }
      return yearSchema;
    }),
    isNew: yup
      .boolean()
      .required('Debes seleccionar si es Cero Km.')
      .typeError('Debes seleccionar una opción'),
    fuelType: yup
      .mixed<FuelsType>()
      .oneOf([FuelsType.GAS, FuelsType.GASOLINE, FuelsType.ELECTRIC])
      .required('Selecciona un tipo de combustible.'),
    gasType: yup.mixed<Gas>().when('fuelType', {
      is: FuelsType.GAS,
      then: (schema) =>
        schema.oneOf([Gas.GLP, Gas.GNV]).required('Selecciona el tipo de gas.'),
      otherwise: (schema) => schema.optional().nullable(),
    }),

    installationType: yup.mixed<InstallatationType>().when('fuelType', {
      is: FuelsType.GAS,
      then: (schema) =>
        schema
          .oneOf([InstallatationType.ADAPTED, InstallatationType.TO_BUILD])
          .required('Selecciona el tipo de instalación.'),
      otherwise: (schema) => schema.optional().nullable(),
    }),
    meetsRequirements: yup.boolean().when('installationType', {
      is: InstallatationType.ADAPTED,
      then: (schema) =>
        schema
          .oneOf([true], 'Debe cumplir con los requisitos de adaptación.')
          .required('Debe cumplir con los requisitos de adaptación.'),
      otherwise: (schema) => schema.optional().nullable(),
    }),
    isPersonalUse: yup
      .boolean()
      .required('Debe seleccionar el tipo de uso del vehículo.')
      .oneOf([true], 'Debe seleccionar el tipo de uso del vehículo.'),
    worth: yup
      .number()
      .transform((v, o) => (o === '' || o == null ? undefined : v))
      .typeError('Ingresa un monto válido.')
      .min(MIN_WORTH, `El valor mínimo es RD$ ${MIN_WORTH.toLocaleString('es-DO')}`)
      .max(MAX_WORTH, `El valor máximo es RD$ ${MAX_WORTH.toLocaleString('es-DO')}`)
      .test('worth-with-addons', '', function (value) {
        const MAX_WORTH_LIMIT = 7_000_000;
        const rootValue = this.from?.[1]?.value as EstimateFormData;
        const addons = rootValue?.addons ?? [];
        const totalAddons = addons?.reduce((acc, addon) => acc + addon.monto, 0) || 0;
        if (!value) return true;
        if (value + totalAddons > MAX_WORTH_LIMIT) {
          return this.createError({
            message: `El valor del vehículo y aditamentos supera el límite de RD$ ${MAX_WORTH_LIMIT.toLocaleString('es-DO')}`,
          });
        }
        return true;
      })
      .required('El valor del vehículo es requerido.'),
    terms: yup
      .object({
        insuranceType: yup
          .mixed<CarInsurances>()
          .oneOf([
            CarInsurances.BASE,
            CarInsurances.PLUS,
            CarInsurances.AUTO_EXCESO,
            CarInsurances.AUTO_EXCESO_PLUS,
          ])
          .default(CarInsurances.BASE),

        vehicleAssistance: yup.boolean().default(true),
        replacementCar: yup
          .mixed<ReplacementsCar>()
          .oneOf([ReplacementsCar.UBER, ReplacementsCar.RENT_A_CAR, ReplacementsCar.NONE])
          .default(ReplacementsCar.NONE),
        rentCarOption: yup
          .object({
            codCategoria: yup.string().default(''),
            codDias: yup.string().default(''),
          })
          .when('replacementCar', {
            is: ReplacementsCar.RENT_A_CAR,
            then: (schema) =>
              schema
                .shape({
                  codCategoria: yup.string().required('Selecciona una categoría.'),
                  codDias: yup.string().required('Selecciona los días.'),
                })
                .required('Selecciona una opción de vehículo rentado.'),
            otherwise: (schema) => schema.optional().nullable(),
          }),
        zeroDeductible: yup.boolean().default(false),
      })
      .required(),
  }),
  addons: yup
    .array()
    .of(
      yup.object().shape({
        codigo: yup.string().required('El código es requerido'),
        monto: yup
          .number()
          .typeError('El monto debe ser numérico')
          .required('El monto es requerido')
          .min(1, 'El monto debe ser mayor a 0'),
        comentario: yup.string().optional(),
      })
    )
    .optional()
    .default([]),
});

export type EstimateFormData = yup.InferType<typeof schemaEstimate>;
