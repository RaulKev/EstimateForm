// car-estimate.service.ts
import { carsList } from '@/mocks/car-data.mock';
import {
    Documents,
    Gender,
    type CarListResponse,
    CarInsurances,
    ReplacementsCar,
} from '../type/types';
import {
    insuranceResponse,
    type Insurance,
    type InsuranceApiResponse,
} from '@/mocks/request.mock';
import type { EstimateFormData } from '../config/EstimeFormConfig';
import { API_DEFAULTS } from '../config/apiDefaults';
import { LAW_INSURANCE_LABEL, REPLACEMENT_CAR_LABEL } from '../config/mappers';

let counter = Math.floor(Math.random() * 0xffffff);

function generateObjectId(): string {
    const timestamp = Math.floor(Date.now() / 1000)
        .toString(16)
        .padStart(8, '0');

    // 5 bytes: valor aleatorio (10 caracteres hex)
    const randomValue = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).join('');

    // 3 bytes: contador incremental (6 caracteres hex)
    counter = (counter + 1) % 0xffffff;
    const counterHex = counter.toString(16).padStart(6, '0');

    return timestamp + randomValue + counterHex;
}

export const getCars = async (): Promise<CarListResponse[]> => {
    return carsList;
};

export const generateInsurance = async (
    data: EstimateFormData
): Promise<Insurance> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 2) + 1;

            if (randomNumber === 1) {
                const policyNumber = `POL-${Date.now()}-${Math.floor(
                    Math.random() * 1000
                )}`;
                // HAPPY PATH: Genera insurance con datos del formulario
                const insurance: Insurance = {
                    ...insuranceResponse,
                    id: `INS-${Date.now()}`,
                    quoteNumber: Math.floor(Math.random() * 1000000),
                    policyNumber,
                    customer: {
                        firstName: data.customer.firstName || 'N/A',
                        lastName: data.customer.lastname || 'N/A',
                        gender:
                            data.customer.gender === Gender.MALE
                                ? 'Masculino'
                                : 'Femenino',
                        documentType:
                            data.customer.documentType === Documents.ID
                                ? 'Cedúla'
                                : 'Pasaporte',
                        documentNumber: data.customer.documentNumber,
                        phone: data.customer.phone,
                        email: data.customer.email,
                    },
                    terms: {
                        ...insuranceResponse.terms,
                        vehicularAssistance: data.car.terms.vehicleAssistance,
                        substituteAuto: data.car.terms.replacementCar,
                        premium: 1000,
                        tax: Math.round(data.car.worth * 0.05 * 0.18), // 18% de impuesto
                        totalAmount: Math.round(data.car.worth * 0.05 * 1.18),
                    },
                    quotationRequest: data,
                    requestDate: new Date(),
                    quoteDate: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                resolve(insurance);
            } else {
                // UNHAPPY PATH
                reject(
                    new Error('Error al cotizar. Por favor intenta nuevamente.')
                );
            }
        }, 1500);
    });
};

export async function generateQuota(
    data: EstimateFormData
): Promise<InsuranceApiResponse> {
    try {
        //CONSTRUIR LA DATA QUE SE VA A ENVIAR A LA API
        const requestData = {
            companyId: generateObjectId(),
            product: API_DEFAULTS.product,
            customer: {
                firstName: data.customer.firstName || '',
                lastName: data.customer.lastname || '',
                documentType:
                    data.customer.documentType === Documents.ID
                        ? 'Cedula'
                        : 'Pasaporte',
                documentNumber: data.customer.documentNumber.replace(/\D/g, ''),
                phone: data.customer.phone.replace(/\D/g, ''),
                email: data.customer.email,
                gender: data.customer.gender === 1 ? 'M' : 'F',
                occupation: API_DEFAULTS.customerDefaults.occupation,
                address: {
                    province: API_DEFAULTS.customerDefaults.address.province,
                    municipality:
                        API_DEFAULTS.customerDefaults.address.municipality,
                    sector: API_DEFAULTS.customerDefaults.address.sector,
                    street: API_DEFAULTS.customerDefaults.address.street,
                    houseNumber:
                        API_DEFAULTS.customerDefaults.address.houseNumber,
                    referencePoint:
                        API_DEFAULTS.customerDefaults.address.referencePoint,
                },
            },
            vehicle: {
                modelId: data.car.modelId,
                year: data.car.year,
                fuelType: data.car.fuelType || undefined,
                isPersonalUse: data.car.isPersonalUse,
                value: data.car.worth,
                isNew: data.car.isNew,
                gasType: data.car.gasType || undefined,
                installationType: data.car.installationType || undefined,
                // Datos que se pedirán después
                plate: API_DEFAULTS.vehicleDefaults.plate,
                color: API_DEFAULTS.vehicleDefaults.color,
                displacement: API_DEFAULTS.vehicleDefaults.displacement,
                doors: API_DEFAULTS.vehicleDefaults.doors,
                chassis: API_DEFAULTS.vehicleDefaults.chassis,
                engine: API_DEFAULTS.vehicleDefaults.engine,
            },
            terms: {
                lawInsurance:
                    LAW_INSURANCE_LABEL[
                        data.car.terms.insuranceType as CarInsurances
                    ],
                vehicularAssistance: data.car.terms.vehicleAssistance,
                substituteAuto:
                    REPLACEMENT_CAR_LABEL[
                        data.car.terms.replacementCar as ReplacementsCar
                    ],
                paymentFraction: API_DEFAULTS.paymentDefaults.paymentFraction,
                paymentMethod: API_DEFAULTS.paymentDefaults.paymentMethod,
            },
        };

        const response = await fetch('http://localhost:3000/api/insurances', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.message || `Error HTTP ${response.status}`
            );
        }
        return await response.json();
    } catch (error) {
        console.error('Error generating insurance:', error);
        if (error instanceof TypeError) {
            throw new Error('No se pudo conectar con el servidor');
        }
        throw error;
    }
}
