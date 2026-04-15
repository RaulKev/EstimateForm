import * as yup from 'yup';
import { Documents, Gender, MaritalStatus } from '../type/types';

const rdCedulaDigits = /^\d{11}$/;
const rdPhone = /^\d{10}$/;
const passportRegex = /^[A-Z0-9]{6,15}$/i;

export const customerSchema = yup.object({
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
});

export type CustomerFormData = yup.InferType<typeof customerSchema>;
