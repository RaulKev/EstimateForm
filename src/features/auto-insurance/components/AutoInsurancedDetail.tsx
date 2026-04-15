import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { Calendar, CarFront, Fuel } from 'lucide-react';

export interface AutoInsuranceDetailProps {
  insuranceData: InsurancesData;
}

export const AutoInsurancedDetail = ({ insuranceData }: AutoInsuranceDetailProps) => {
  return (
    <>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Marca</p>
        <div className="flex items-center gap-2">
          <CarFront className="h-4 w-4 text-muted-foreground" />
          <p className="text-base font-semibold text-foreground">
            {insuranceData.quotationResponse.data.vehiculo.marca}
          </p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Modelo</p>
        <div className="flex items-center gap-2">
          <CarFront className="h-4 w-4 text-muted-foreground" />
          <p className="text-base font-semibold text-foreground">
            {insuranceData.quotationResponse.data.vehiculo.modelo}
          </p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Año</p>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="text-base font-semibold text-foreground">
            {insuranceData.quotationResponse.data.vehiculo.anio}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Tipo de Combustible</p>
        <div className="flex items-center gap-2">
          <Fuel className="h-4 w-4 text-muted-foreground" />
          <p className="text-base font-semibold text-foreground">
            {insuranceData.quotationResponse.data.vehiculo.combustible}
          </p>
        </div>
      </div>
    </>
  );
};
