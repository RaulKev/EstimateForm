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

  const addons = insuranceData.quotationResponse.data.aditamentos.map((a) => ({
    name: a.nombreAditamento,
    price: a.montoAditamento,
  }));
  const zeroDeductible = insuranceData.terms.zeroDeductible;
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
        <div className="flex flex-col gap-2">
          {addons.map((addon, index) => (
            <p key={index} className="text-base font-semibold text-foreground">
              {addon.name}: {formatCurrency(addon.price)}
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">¿Cero deducible?</p>
        <p className="text-base font-semibold text-foreground">
          {zeroDeductible ? 'Sí' : 'No'}
        </p>
      </div>
    </div>
  );
};
