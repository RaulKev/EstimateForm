import type { InsurancesData } from "@/features/estimate/type/insurance.types";
import { Calendar, Dog, PawPrint } from "lucide-react";

interface PetInsuredDetailsProps {
  insuranceData: InsurancesData;
}

export const PetInsuredDetails = ( { insuranceData }: PetInsuredDetailsProps) => {
  const petData = insuranceData.quotationResponse.data.mascota;
  
  return (
    <>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Nombre</p>
        <div className="flex items-center gap-2">
          <Dog className="h-4 w-4 text-muted-foreground" />
          <p className="text-base font-semibold text-foreground">{petData.nombre}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Año nacimiento</p>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="text-base font-semibold text-foreground">
            {petData.anioNacimiento}
          </p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Edad</p>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="text-base font-semibold text-foreground">{petData.edadRango}</p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Raza</p>
        <div className="flex items-center gap-2">
          <PawPrint className="h-4 w-4 text-muted-foreground" />
          <p className="text-base font-semibold text-foreground">{petData.raza}</p>
        </div>
      </div>
    </>
  );
};
