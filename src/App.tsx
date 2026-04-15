import { EstimateFlow } from './features/estimate/components/EstimateFlow';
import { PetInsuranceFlow } from './features/pet-insurance/PetInsuranceFlow';
import { InsurancesType } from './mocks/summary.mock';

interface AppProps {
  storeToken: string;
  insuranceType: InsurancesType;
}

function App({ storeToken, insuranceType = InsurancesType.PET_INSURANCE }: AppProps) {
  return (
    <div className=" min-h-screen max-w-4xl mx-auto py-6 px-4">
      <>
        {insuranceType === InsurancesType.PET_INSURANCE && (
          <PetInsuranceFlow storeToken={storeToken} />
        )}
        {[InsurancesType.AUTO_INSURANCE, InsurancesType.DRIVE_INSURANCE].includes(
          insuranceType
        ) && <EstimateFlow storeToken={storeToken} insuranceType={insuranceType} />}
      </>
    </div>
  );
}

export default App;
