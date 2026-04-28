import type { PetPlans } from "@/features/pet-insurance/types/insurance.type";


export const petPlans = [
  { label: 'Ultra can', value: 'UltraCan' },
  { label: 'Mega can', value: 'MegaCan' },
  { label: 'Super can', value: 'SuperCan' },
];

export interface BenefitItem {
  title: string;
  amount?: string;
}

export const petPlansBenefits: Record<PetPlans, BenefitItem[][]> = {
  UltraCan: [
    [
      {
        title: 'Emergencia por enfermedad o accidente',
        amount: 'RD$80,000',
      },
      {
        title: 'Esterilización',
        amount: 'RD$10,000',
      },
      {
        title: 'Parto',
        amount: 'RD$10,000',
      },
      {
        title: 'Responsabilidad civil',
        amount: 'RD$100,000',
      },
      {
        title: 'Hotel Canino',
        amount: 'RD$2,500',
      },
    ],
    [
      {
        title: 'Vacunas',
        amount: 'RD$2,000',
      },
      {
        title: 'Profilaxis',
        amount: 'RD$3,000',
      },
      {
        title: 'Grooming',
        amount: 'RD$2,500',
      },
      {
        title: 'Últimos gastos',
        amount:
          'Hasta RD$10,000 por reembolso. (Aplica cuando la vigencia de la póliza esta saldada en su totalidad )',
      },
      {
        title: 'Cancelación sin penalidad',
      },
    ],
  ],
  MegaCan: [
    [
      {
        title: 'Emergencia por enfermedad o accidente',
        amount: 'RD$75,000',
      },
      {
        title: 'Responsabilidad civil',
        amount: 'RD$100,000',
      },
      {
        title: 'Hotel Canino',
        amount: 'RD$2,500',
      },
    ],
    [
      {
        title: 'Vacunas',
        amount: 'RD$1,000',
      },
      {
        title: 'Profilaxis',
        amount: 'RD$1,000',
      },
      {
        title: 'Cancelación sin penalidad',
      },
    ],
  ],
  SuperCan: [
    [
      {
        title: 'Emergencia por enfermedad o accidente',
        amount: 'RD$75,000',
      },
      {
        title: 'Responsabilidad civil',
        amount: 'RD$100,000',
      },
      {
        title: 'Hotel Canino',
        amount: 'RD$2,500',
      },
    ],
    [
      {
        title: 'Cancelación sin penalidad',
      },
    ],
  ],
};
