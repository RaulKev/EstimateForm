import * as yup from 'yup';

export const endorsmentPolicySchema = yup.object({
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
});
