import type { CarInsurances } from '../../type/types';
import { LawInsuranceTable } from './LawInsuranceTable';

interface LawInsurancePlansProps {
  selectedPlan?: CarInsurances;
}

export const LawInsurancePlans = ({ selectedPlan }: LawInsurancePlansProps) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center gap-2 mb-8">
        <h1 className='text-2xl text-kover-widget-primary font-semibold'>Seguro de Ley</h1>
        <span>Te ofrecemos tres planes de Responsabilidad Civil</span>
      </div>
      <LawInsuranceTable selectedPlan={selectedPlan} />
    </div>
  );
};
