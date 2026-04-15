import type { InsurancesData, Prima } from '@/features/estimate/type/insurance.types';
import { formatCurrency, formatYears } from '@/utils';

interface AutoInsuranceDetailProps {
  insuranceData: InsurancesData;
  paymentData?: Prima;
}

export const AutoInsuranceDetail = ({
  insuranceData,
  paymentData,
}: AutoInsuranceDetailProps) => {
  const insuredAmount =
    insuranceData.quotationResponse.data?.vehiculo?.sumaAsegurada || 0;
  const dataTerms = insuranceData.quotationResponse.data.terminos;
  const paymentAmount = insuranceData.terms.totalAmount || 10;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Suma Asegurada</p>
        <p className="text-base font-semibold text-foreground">
          {formatCurrency(insuredAmount)}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Plazo de seguro</p>
        <p className="text-base font-semibold text-foreground">
          {dataTerms.plazo > 0
            ? formatYears(insuranceData.quotationResponse.data.terminos.plazo)
            : '1 año'}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Prima</p>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-foreground">
            {formatCurrency(paymentAmount || paymentData?.cobro || 0)}
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
};
