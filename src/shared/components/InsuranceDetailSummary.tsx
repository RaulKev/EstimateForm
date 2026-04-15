import { AutoInsuranceDetail } from '@/features/auto-insurance/components/AutoInsuranceDetail';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { PetInsuranceDetail } from '@/features/pet-insurance/components/PetInsuranceDetail';
import { InsurancesType } from '@/mocks/summary.mock';
import { formatCurrency } from '@/utils';

interface InsuranceDetailSummaryProps {
  insuranceType: InsurancesType;
  insuranceData: InsurancesData;
}

export const DetailInsuranceSummary = ({
  insuranceType,
  insuranceData,
}: InsuranceDetailSummaryProps) => {
  const primaData = insuranceData.quotationResponse.data.primas.find(
    (p) => p.fraccionamientoPago === insuranceData.terms.paymentFraction
  );

  const fixedAmount = insuranceData.quotationResponse.data.terminos?.primaFija || 0;
  const kmAmount = insuranceData.quotationResponse.data.terminos?.primaKm || 0;
  const insuredAmount =
    insuranceData.quotationResponse.data?.vehiculo?.sumaAsegurada || 0;

  switch (insuranceType) {
    case InsurancesType.AUTO_INSURANCE:
      return (
        <AutoInsuranceDetail insuranceData={insuranceData} paymentData={primaData} />
      );
    case InsurancesType.DRIVE_INSURANCE:
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Prima fija mensual
            </p>
            <p className="text-base font-semibold text-foreground">
              {formatCurrency(fixedAmount)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Tarifa x KM:</p>
            <p className="text-base font-semibold text-foreground">
              {formatCurrency(kmAmount)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Plazo de seguro</p>
            <p className="text-base font-semibold text-foreground">
              12 meses{' '}
              {/* {formatYears(insuranceData.quotationResponse.data.terminos.plazo)} */}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Suma asegurada</p>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-foreground">
                {formatCurrency(insuredAmount)}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Aditamentos</p>
            <p className="text-base font-semibold text-foreground">
              Aros / goma: RD$ 20,000
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">¿Cero deducible?</p>
            <p className="text-base font-semibold text-foreground">Si, Cero 0%</p>
          </div>
        </div>
      );
    case InsurancesType.PET_INSURANCE:
      return <PetInsuranceDetail insuranceData={insuranceData} paymentData={primaData} />;
    default:
      return null;
  }
};
