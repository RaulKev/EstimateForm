import * as yup from 'yup';
import {
    CarInsurances,
    Documents,
    Gender,
    ReplacementsCar,
    type Car,
    type Customer,
    type RequestUnit,
} from '../type/types';

// 1) Tipado correcto para addMethod
declare module 'yup' {
    interface StringSchema {
        phoneMasked(pattern: RegExp, message?: string): StringSchema;
    }
}

// 2) Implementación consistente con el tipado
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
const rdCedulaDigits = /^\d{11}$/; // 11 dígitos
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
    modelId: 0, // requerido por el schema (min 1 al enviar)
    year: currentYear,
    isNew: true,
    fuelType: undefined, // requerido por el schema; empieza sin seleccionar
    gasType: undefined,
    installationType: undefined,
    isPersonalUse: true,
    worth: 0,
    terms: {
        insuranceType: CarInsurances.BASE,
        vehicleAssitance: false,
        replacementCar: ReplacementsCar.NONE,
    },
};
export const initialValues = {
    customer: initialValuesCustomer,
    car: initialValuesCar,
};
export const schemaEstimate: yup.ObjectSchema<RequestUnit> = yup.object({
    customer: yup.object({
        email: yup
            .string()
            .email('Correo electronico no valido.')
            .required('Correo electronico requerido.'),
        phone: yup
            .string()
            .phoneMasked(rdPhone, 'Teléfono inválido.')
            .required('El teléfono es requerido.'),
        documentType: yup
            .mixed<Documents>()
            .oneOf([Documents.ID, Documents.PASSPORT])
            .required('Selecciona el tipo de documento'),
        documentNumber: yup
            .string()
            .required('Ingrese el número de documento')
            .when('documentType', {
                is: Documents.ID,
                then: (schema) =>
                    schema.test(
                        'cedula-rd',
                        'Cédula inválida (debe tener 11 dígitos)',
                        function (value) {
                            if (!value) return false;
                            const raw = value.replace(/\D/g, '');
                            return rdCedulaDigits.test(raw);
                        }
                    ),
                otherwise: (schema) =>
                    schema.matches(
                        passportRegex,
                        'Pasaporte inválido (6-15 caracteres alfanuméricos)'
                    ),
            }),
        name: yup.string().when('documentType', {
            is: Documents.PASSPORT,
            then: (schema) =>
                schema
                    .required('Nombres requeridos')
                    .min(2, 'Mínimo 2 caracteres'),
            otherwise: (schema) => schema.optional(),
        }),

        lastname: yup.string().when('documentType', {
            is: Documents.PASSPORT,
            then: (schema) =>
                schema
                    .required('Apellidos requeridos')
                    .min(2, 'Mínimo 2 caracteres'),
            otherwise: (schema) => schema.optional(),
        }),

        birthDate: yup.string().when('documentType', {
            is: Documents.PASSPORT,
            then: (schema) =>
                schema
                    .required('Fecha de nacimiento requerida')
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
        modelId: yup.number().when('brand', {
            is: (brand: string) => !!brand && brand.length > 0,
            then: (schema) => schema.min(1, 'Seleccione un modelo válido.'),
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
        isPersonalUse: yup.boolean(),
        worth: yup
            .number()
            .typeError('Ingresa un monto valido')
            .min(
                MIN_WORTH,
                `El valor mínimo es RD$${MIN_WORTH.toLocaleString('es-DO')}`
            )
            .max(
                MAX_WORTH,
                `El valor máximo es RD$${MAX_WORTH.toLocaleString('es-DO')}`
            )
            .required('El valor del vehículo es requerido'),
        terms: yup.object({
            insuranceType: yup
                .mixed<CarInsurances>()
                .oneOf(
                    [
                        CarInsurances.BASE,
                        CarInsurances.PLUS,
                        CarInsurances.AUTO_EXCESO,
                    ],
                    'Selecciona un plan'
                )
                .required('Selecciona un plan'),
        }),
    }),
});
export type EstimateFormData = yup.InferType<typeof schemaEstimate>;
