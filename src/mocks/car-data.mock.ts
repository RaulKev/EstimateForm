import type { CarListResponse, FuelType } from "@/features/estimate/type/types";

export const carsList: CarListResponse[] = [
  {
    marca: "ABARTH",
    modelos: [
      {
        idModelo: 1,
        modelo: "500",
      },
      {
        idModelo: 2,
        modelo: "695",
      },
      {
        idModelo: 3,
        modelo: "124 SPIDER",
      },
      {
        idModelo: 4,
        modelo: "PUNTO",
      },
    ],
  },
  {
    marca: "ACURA",
    modelos: [
      {
        idModelo: 5,
        modelo: "2.5 TL",
      },
      {
        idModelo: 6,
        modelo: "CSX",
      },
      {
        idModelo: 7,
        modelo: "ILX",
      },
      {
        idModelo: 8,
        modelo: "ILX Hybrid",
      },
      {
        idModelo: 9,
        modelo: "INTEGRA",
      },
      {
        idModelo: 10,
        modelo: "LEGEND",
      },
    ],
  },
];

export const fuelTypes: FuelType[] = [
  {
    id: 1,
    name: "Gasolina / Diesel",
  },
  {
    id: 2,
    name: "Gas",
  },
  {
    id: 3,
    name: "Vehículo Eléctrico",
  }
];
