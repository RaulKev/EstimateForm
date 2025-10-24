export interface Terms {
  paymentFraction: string;
  petPlan?: string; // Optional for non-pet insurance
  lawInsurance?: string; // For auto/law insurance
  vehicularAssistance?: boolean; // For auto/law insurance
  substituteAuto?: string; // For auto/law insurance
  paymentMethod?: string; // For auto/law insurance
  startDate?: Date;
  endDate?: Date;
  issueDate?: Date;
  cancellationDate?: Date;
  premium?: number;
  tax?: number;
  totalAmount?: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  gender?: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
  occupation?: string;
}

export interface Insurance {
  id: string;  // ID es requerido en el modelo de dominio después de ser creado
  companyId: string;
  quoteNumber?: number;
  policyNumber?: string;
  product: string;
  status: string;
  customer?: Customer; // Optional for some insurance types (e.g., auto)// Optional for non-vehicle insurance
  terms: Terms;
  requestDate: Date;
  quoteDate?: Date;
  purchaseDate?: Date;
  quotationRequest: unknown;  // Stores the complete request JSON
  quotationResponse?: unknown; // Stores the complete response JSON
  createdAt: Date;
  updatedAt: Date;
}

export const insuranceResponse: Insurance = {
  id: '',
  companyId: '123456789',
  quoteNumber: 123456789,
  policyNumber: '',
  product: 'Auto',
  status: 'Active',
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    documentType: 'Passport',
    documentNumber: '123456789',
    phone: '123456789',
    email: 'john.doe@example.com',
    occupation: 'Driver',
  },
  terms: {
    paymentFraction: 'yep',
    petPlan: 'PetPlan',
    lawInsurance: 'LawInsurance',
    vehicularAssistance: true,
    substituteAuto: 'SubstituteAuto',
    paymentMethod: 'PaymentMethod',
    startDate: new Date(),
    endDate: new Date(),
    issueDate: new Date(),
    cancellationDate: new Date(),
    premium: 1000,
    tax: 200,
    totalAmount: 1200,
  },
  requestDate: new Date(),
  quoteDate: new Date(),
  purchaseDate: new Date(),
  quotationRequest: {
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      documentType: 'Passport',
      documentNumber: '123456789',
      phone: '123456789',
      email: 'john.doe@example.com',
      occupation: 'Driver',
    },
    insurance: {
      product: 'Auto',
      status: 'Active',
      terms: {
        paymentFraction: 0.1,
        petPlan: 'PetPlan',
        lawInsurance: 'LawInsurance',
        vehicularAssistance: true,
        substituteAuto: 'SubstituteAuto',
        paymentMethod: 'PaymentMethod',
        startDate: new Date(),
        endDate: new Date(),
        issueDate: new Date(),
        cancellationDate: new Date(),
        premium: 1000,
        tax: 200,
        totalAmount: 1200,
      },
    },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
