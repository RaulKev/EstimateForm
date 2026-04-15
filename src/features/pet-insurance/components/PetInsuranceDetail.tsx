import { formatCurrency, formatYears } from '@/utils';
import { redeablePetPlan, type PetPlans } from '../types/insurance.type';
import type { InsurancesData, Prima } from '@/features/estimate/type/insurance.types';

interface PetInsuranceDetailProps {
  insuranceData: InsurancesData;
  paymentData?: Prima;
}

const getReablePetPlan = (plan: PetPlans) => redeablePetPlan[plan] || plan;

export const PetInsuranceDetail = ({
  insuranceData,
  paymentData,
}: PetInsuranceDetailProps) => {
  const insuranceTerms = insuranceData.quotationResponse.data.terminos.plazo;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Plan</p>
        <p className="text-base font-semibold text-foreground">
          {getReablePetPlan(insuranceData.quotationResponse.data.terminos.planMascota)}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Plazo de seguro</p>
        <p className="text-base font-semibold text-foreground">
          {insuranceTerms > 0
            ? formatYears(insuranceData.quotationResponse.data.terminos.plazo)
            : '1 año'}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Prima</p>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-foreground">
            {formatCurrency(paymentData?.cobro || 0)} {paymentData?.descripcion || ''}
          </p>
        </div>
      </div>
    </div>
  );
};
