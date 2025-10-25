import * as yup from 'yup';
import {
    CarInsurances,
    Documents,
    FuelsType,
    Gas,
    Gender,
    InstallatationType,
    ReplacementsCar,
    type Car,
    type Customer,
} from '../type/types';

declare module 'yup' {
    interface StringSchema {
        phoneMasked(pattern: RegExp, message?: string): StringSchema;
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

// Patrones de ejemplo (ajusta a tu país/regla)
const rdCedulaDigits = /^\d{11}$/;
const rdPhone = /^\d{10}$/;
const passportRegex = /^[A-Z0-9]{6,15}$/i;
const currentYear = new Date().getFullYear();
const MIN_WORTH = 200_000;
const MAX_WORTH = 7_000_000;

export const initialValuesCustomer: Customer = {
    email: '',
    phone: '',
    documentType: undefined,
    documentNumber: '',
    name: '',
    lastname: '',
    gender: undefined,
    birthDate: '',
};
export const initialValuesCar: Car = {
    brand: '',
    modelId: 0,
    year: currentYear,
    isNew: false,
    fuelType: undefined,
    gasType: undefined,
    installationType: undefined,
    isPersonalUse: false,
    worth: 0,
    terms: {
        insuranceType: CarInsurances.BASE,
        vehicleAssistance: false,
        replacementCar: ReplacementsCar.NONE,
    },
};
export const initialValues = {
    customer: initialValuesCustomer,
    car: initialValuesCar,
};
export const schemaEstimate = yup.object().shape({
    customer: yup.object({
        email: yup
            .string()
            .email('Correo electronico no válido.')
            .required('Correo electronico requerido.'),
        phone: yup
            .string()
            .phoneMasked(rdPhone, 'Teléfono inválido.')
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
        name: yup.string().when('documentType', {
            is: Documents.PASSPORT,
            then: (schema) =>
                schema
                    .required('Nombres requeridos.')
                    .min(2, 'Mínimo 2 caracteres'),
            otherwise: (schema) => schema.optional(),
        }),

        lastname: yup.string().when('documentType', {
            is: Documents.PASSPORT,
            then: (schema) =>
                schema
                    .required('Apellidos requeridos.')
                    .min(2, 'Mínimo 2 caracteres'),
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
    }),

    car: yup.object({
        brand: yup.string().defined().default(''),
        modelId: yup.number().when('brand', {
            is: (brand: string) => !!brand && brand.length > 0,
            then: (schema) => schema.min(1, 'Selecciona un modelo válido.'),
            otherwise: (schema) => schema.optional().transform(() => 0),
        }),
        year: yup.number().when('brand', {
            is: (brand: string) => !!brand && brand.length > 0,
            then: (schema) =>
                schema
                    .min(1980, 'Seleccione un año válido.')
                    .max(currentYear, 'El año no es valido'),
            otherwise: (schema) => schema.optional().transform(() => 0),
        }),
        isNew: yup.boolean().defined().default(false),
        fuelType: yup
            .mixed<FuelsType>()
            .transform((v) => (typeof v === 'string' ? Number(v) : v))
            .oneOf([FuelsType.GAS, FuelsType.GASOLINE, FuelsType.ELECTRIC])
            .required('Selecciona un tipo de combustible.'),
        gasType: yup.mixed<Gas>().when('fuelType', {
            is: FuelsType.GAS,
            then: (schema) =>
                schema
                    .oneOf([Gas.GLP, Gas.GNV])
                    .required('Selecciona el tipo de gas.'),
            otherwise: (schema) => schema.optional().nullable(),
        }),

        installationType: yup.mixed<InstallatationType>().when('fuelType', {
            is: FuelsType.GAS,
            then: (schema) =>
                schema
                    .oneOf([
                        InstallatationType.ADAPTED,
                        InstallatationType.TO_BUILD,
                    ])
                    .required('Selecciona el tipo de instalación.'),
            otherwise: (schema) => schema.optional().nullable(),
        }),
        isPersonalUse: yup.boolean().default(false),
        worth: yup
            .number()
            .transform((v, o) => (o === '' || o == null ? undefined : v))
            .typeError('Ingresa un monto válido.')
            .min(
                MIN_WORTH,
                `El valor mínimo es RD$ ${MIN_WORTH.toLocaleString('es-DO')}`
            )
            .max(
                MAX_WORTH,
                `El valor máximo es RD$ ${MAX_WORTH.toLocaleString('es-DO')}`
            )
            .required('El valor del vehículo es requerido.'),
        terms: yup
            .object({
                insuranceType: yup
                    .mixed<CarInsurances>()
                    .oneOf([
                        CarInsurances.BASE,
                        CarInsurances.PLUS,
                        CarInsurances.AUTO_EXCESO,
                    ])
                    .default(CarInsurances.BASE),

                vehicleAssistance: yup.boolean().default(false),

                replacementCar: yup
                    .mixed<ReplacementsCar>()
                    .oneOf([
                        ReplacementsCar.UBER,
                        ReplacementsCar.RENT_A_CAR,
                        ReplacementsCar.NONE,
                    ])
                    .default(ReplacementsCar.NONE),
            })
            .required(),
    }),
});
export type EstimateFormData = yup.InferType<typeof schemaEstimate>;
