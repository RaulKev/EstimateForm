import { CheckCircle } from 'lucide-react';
import type { PetPlans } from '../types/insurance.type';
import { petPlansBenefits, type BenefitItem } from '@/mocks/pet.mock';

interface PetInsuranceBenefitsProps {
  petPlan: PetPlans;
  benefits?: BenefitItem[][];
}

export const PetInsuranceBenefits = ({ petPlan }: PetInsuranceBenefitsProps) => {
  const planBenefits = petPlansBenefits[petPlan];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {planBenefits.map((column, colIndex) => (
        <div key={colIndex} className="space-y-3">
          {column.map((benefit, itemIndex) => (
            <div key={itemIndex} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-kover-widget-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  {benefit.title}
                  {benefit.amount && (
                    <span className="font-semibold">: {benefit.amount}</span>
                  )}
                  {!benefit.amount && '.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
