export enum RelationShip {
  FAMILY = 'Es un familiar',
  IAM = 'Soy yo',
}

export enum Kinship {
  HUSBAND = 'Esposo',
  WIFE = 'Esposa',
  BROTHER = 'Hermano',
  SISTER = 'Hermana',
  SOON = 'Hijo / Hija',
  MOTHER = 'Mama',
  FATHER = 'Papa',
}

export const enum Documents {
  ID = 1,
  PASSPORT = 2,
}
export const enum MaritalStatus {
  SOLTERO = 'S',
  CASADO = 'C',
  VIUDO = 'V',
}
export const enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export const enum FuelsType {
  GASOLINE = 'Gasolina / Diesel',
  GAS = 'Gas',
  ELECTRIC = 'Vehículo Electrico',
}
export const enum CarInsurances {
  BASE = 'Base',
  PLUS = 'Plus',
  AUTO_EXCESO = 'AutoExceso',
  AUTO_EXCESO_PLUS = 'Auto Exceso+',
}

export const enum Gas {
  GLP = 'GLP',
  GNV = 'GNV',
}

export const enum ReplacementsCar {
  UBER = 'Uber',
  RENT_A_CAR = 'Rent a car',
  NONE = 'No',
}
export const enum InstallatationType {
  ADAPTED = 'Adaptado',
  TO_BUILD = 'De Fábrica',
}

export interface EstimateFormData {
  customer: Customer;
  car?: Car;
  pet?: PetInsuranceRequest;
  terms?: TermsInsuranceRequest;
  addons?: AddonPayload[];
}

export interface PetInsuranceRequest {
  name: string;
  birthYear: string;
  breedId: number;
  age: number;
  isDomestic: boolean;
}

export interface TermsInsuranceRequest {
  petPlan: string;
  paymentFraction: string;
}

export interface Car {
  brand?: string;
  modelId: number;
  year: number;
  isNew?: boolean;
  fuelType?: FuelsType;
  gasType?: Gas;
  installationType?: InstallatationType;
  isPersonalUse?: boolean;
  worth: number;
  terms: Term;
}

interface Term {
  insuranceType: CarInsurances;
  vehicleAssistance: boolean;
  replacementCar: ReplacementsCar;
  rentCarOption?: {
    codCategoria: string;
    codDias: string;
  };
  zeroDeductible?: boolean;
}

export interface Customer {
  email: string;
  phone: string;
  documentType?: Documents;
  documentNumber: string;
  firstName?: string;
  lastname?: string;
  gender?: Gender;
  birthDate?: string;
  occupation?: string;
  address?: Address;
  politicallyExposed?: boolean;
  requiresFiscalReceipt?: boolean;
  maritalStatus?: MaritalStatus;
}
export interface RentCar {
  codCategoria: string;
  categoria: string;
  codDias: string;
  descDias: string;
  dias: number;
  prima: number;
}
export interface RentCarResponse {
  success: boolean;
  data: RentCar[];
}

export interface AditamentosResponse {
  success: boolean;
  data: Aditamentos[];
}
export interface Aditamentos {
  codAditamento: number;
  nombreAditamento: string;
}
export interface PetResponse {
  success: boolean;
  data: Pet[];
}
export interface Pet {
  id: number;
  descripcion: string;
  estaActivo: string;
}

export interface Address {
  street?: string;
  province?: string;
  municipality?: string;
  sector?: string;
}
export interface Province {
  id: number;
  name: string;
}

export interface Municipality {
  id: number;
  name: string;
}
export interface Sector {
  id: number;
  name: string;
}
export interface Occupations {
  idOccupation: number;
  occupation: string;
}
export interface CarModels {
  idModelo: number;
  modelo: string;
}

export interface CarListResponse {
  marca: string;
  modelos: CarModels[];
}
export interface ComplementsCar {
  id: number;
  name: string;
}

export interface FuelType {
  id: number;
  name: string;
}

export const NOT_ALLOWED_CORPORATE_EMAIL_DOMAINS = [
  'prodequa.com',
  'mytikray.com',
  'nohaysinsuerte.com',
];

export type FlowStep =
  | 'estimate'
  | 'emit'
  | 'additional-data'
  | 'confirmation'
  | 'quote-summary'
  | 'upload-file';

export interface AditamentoCatalogItem {
  codigo: string;
  descripcion?: string;
  montoMinimo?: number;
  montoMaximo?: number;
}
export interface AddonPayload {
  codigo: string;
  monto: number;
  comentario?: string;
}
