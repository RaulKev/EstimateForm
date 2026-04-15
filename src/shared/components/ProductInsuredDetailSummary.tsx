import { AutoInsurancedDetail } from '@/features/auto-insurance/components/AutoInsurancedDetail';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { PetInsuredDetails } from '@/features/pet-insurance/components/PetInsuredDetails';
import { InsurancesType } from '@/mocks/summary.mock';

interface ProductInsuredDetailSummaryProps {
  insuranceType: InsurancesType;
  insuranceData: InsurancesData;
}

export const ProductInsuredDetailSummary = ({
  insuranceType,
  insuranceData,
}: ProductInsuredDetailSummaryProps) => {
  switch (insuranceType) {
    case InsurancesType.AUTO_INSURANCE:
    case InsurancesType.DRIVE_INSURANCE:
      return <AutoInsurancedDetail insuranceData={insuranceData} />;
    case InsurancesType.PET_INSURANCE:
      return <PetInsuredDetails insuranceData={insuranceData} />;
    default:
      return null;
  }
};
