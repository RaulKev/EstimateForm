import { Modal } from '@/shared/components/Modal';
import { LawInsurancePlans } from './LawInsurancePlans';
import type { Dispatch } from 'react';
import type { CarInsurances } from '../../type/types';

type LawInsuranceModalProps = {
  openLaw: boolean;
  setOpenLaw: Dispatch<React.SetStateAction<boolean>>;
  selectedPlan?: CarInsurances;
};

export const LawInsuranceModal = ({ openLaw, setOpenLaw, selectedPlan }: LawInsuranceModalProps) => {
  return (
    <Modal title='  ' open={openLaw} onOpenChange={setOpenLaw} >
      <LawInsurancePlans selectedPlan={selectedPlan}/>
    </Modal>
  );
};
