export enum Documents {
    ID = 1,
    PASSPORT = 2,
}
enum Gender {
    MALE = 1,
    FEMALE = 2,
}

export enum FuelsType {
    GASOLINE = 1,
    GAS = 2,
    ELECTRIC = 3,
}

export enum CarInsurances {
    BASE = 'Base',
    PLUS = 'Plus',
    AUTO_EXCESO = 'AutoExceso',
}
export enum Gas {
    GLP = 'GLP',
    GNV = 'GNV',
}

export enum ReplacementsCar {
    UBER = 'Uber',
    RENT_A_CAR = 'Rent a car',
    NONE = 'No',
}
enum InstallatationType {
    ADAPTED = 'Adaptado',
    TO_BUILD = 'De fábrica',
}

export interface RequestUnit {
    customer: Customer;
    car: Car;
}
export interface Car {
    modelId: number;
    year: number;
    isNew?: boolean;
    fuelType?: FuelsType;
    gasType?: Gas;
    installationType?: InstallatationType;
    isPersonalUse: boolean;
    worth: number;
    terms: Term;
}
interface Term {
    insuranceType: CarInsurances;
    vehicleAssitance: boolean;
    replacementCar: ReplacementsCar;
}
export interface Customer {
    email: string;
    phone: string;
    documentType?: Documents;
    documentNumber: string;
    name?: string;
    lastname?: string;
    gender?: Gender;
    birthDate?: string;
}

export interface CarModels {
    idModelo: number;
    modelo: string;
}

export interface CarListResponse {
    marca: string;
    modelos: CarModels[];
}

export interface FuelType {
    id: number;
    name: string;
}
