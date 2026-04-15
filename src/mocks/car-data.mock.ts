import type { CarListResponse, ComplementsCar } from '@/features/estimate/type/types';

export const carsList: CarListResponse[] = [
  {
    marca: 'ABARTH',
    modelos: [
      {
        idModelo: 1,
        modelo: '500',
      },
      {
        idModelo: 2,
        modelo: '695',
      },
      {
        idModelo: 3,
        modelo: '124 SPIDER',
      },
      {
        idModelo: 4,
        modelo: 'PUNTO',
      },
    ],
  },
  {
    marca: 'ACURA',
    modelos: [
      {
        idModelo: 5,
        modelo: '2.5 TL',
      },
      {
        idModelo: 6,
        modelo: 'CSX',
      },
      {
        idModelo: 7,
        modelo: 'ILX',
      },
      {
        idModelo: 8,
        modelo: 'ILX Hybrid',
      },
      {
        idModelo: 9,
        modelo: 'INTEGRA',
      },
      {
        idModelo: 10,
        modelo: 'LEGEND',
      },
    ],
  },
];

export const ComplementsCarList: ComplementsCar[] = [
  {
    id: 1,
    name: 'Aros / Gomas',
  },
  {
    id: 2,
    name: 'Equipo de música',
  },
  {
    id: 3,
    name: 'Pantalla y luces',
  },
  {
    id: 4,
    name: 'Partes externas',
  },
  {
    id: 5,
    name: 'Protección pintura / Cristales',
  },
  {
    id: 6,
    name: 'Protectores / Defensas / Parrillas',
  },
  {
    id: 7,
    name: 'Seguridad / Rastreo / Cámaras',
  },
 
  {
    id: 8,
    name: 'Otros',
  },
];
