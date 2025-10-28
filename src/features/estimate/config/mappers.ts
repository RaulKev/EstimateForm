import { CarInsurances, FuelsType, ReplacementsCar } from "../type/types";

// Mapas tipados para evitar indexing con strings y eliminar 'any' implícito (TS7015)
export const FUEL_TYPE_LABEL: Record<FuelsType, string> = {
    [FuelsType.GASOLINE]: 'Gasolina / Diesel',
    [FuelsType.ELECTRIC]: 'Vehículo Electrico',
    [FuelsType.GAS]: 'Gas',
};

export const LAW_INSURANCE_LABEL: Record<CarInsurances, string> = {
    [CarInsurances.BASE]: 'Base',
    [CarInsurances.PLUS]: 'Plus',
    [CarInsurances.AUTO_EXCESO]: 'Auto Exceso',
};

export const REPLACEMENT_CAR_LABEL: Record<ReplacementsCar, string> = {
    [ReplacementsCar.NONE]: 'No',
    [ReplacementsCar.UBER]: 'Uber',
    [ReplacementsCar.RENT_A_CAR]: 'Rent-a-Car',
};