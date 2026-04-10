import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { useState } from 'react';
import { EstimateForm } from './EstimateForm';
import Emitir from './Emit';
import PaymentConfirmation from './PaymentConfirmation';
import { AdditionalDataFormWrapper } from './additional-data/AdditionalDataFormWrapper';
import { QuoteSummary } from './summary/QuoteSummary';
import { InsurancesType } from '@/mocks/summary.mock';
import { AutoInsuranceEmit } from '@/features/auto-insurance/AutoInsuranceEmit';
import { useInsuranceFlow } from '@/shared/hooks/useInsuranceFlow';
import { usePaymentFlow } from '@/shared/hooks/usePaymentFlow';

interface FlowProps {
  storeToken: string;
  insuranceType: InsurancesType;
}

export const EstimateFlow = ({ storeToken, insuranceType }: FlowProps) => {
  const {
    currentStep,
    insuranceData,
    successMessage,
    handleStep,
    handleEstimateSuccess,
    handleSaveAdditionalData,
    handleFinishInsuranceFlow,
  } = useInsuranceFlow();
  const {
    isCheckoutOpen,
    paymentErrorMessage,
    paymentData,
    handlePayment,
    handleFinishPaymentFlow,
  } = usePaymentFlow();
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const isAuto = insuranceType === InsurancesType.AUTO_INSURANCE;

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }, 150);
  //   return () => clearTimeout(timeoutId);
  // }, [currentStep]);

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-gray-900 mb-8 select-none">
        {isAuto ? 'Para Tu Auto' : 'Por Lo Que Conduces'}
      </h1>
      {currentStep === 'estimate' && (
        <EstimateForm
          storeToken={storeToken}
          onSuccess={handleEstimateSuccess}
          typeInsurances={insuranceType}
        />
      )}
      {currentStep === 'emit' &&
        insuranceData &&
        (insuranceType === InsurancesType.AUTO_INSURANCE ? (
          <AutoInsuranceEmit
            insuranceData={insuranceData}
            onBack={() => handleStep('estimate')}
            successMessage={successMessage}
            onEmit={() => handleStep('additional-data')}
            onPlanSelect={setSelectedFrequency} //FALTA AGREGAR
            selectedPlan={selectedFrequency} //FALTA AGREGAR
          />
        ) : (
          <Emitir
            onBack={() => handleStep('estimate')}
            successMessage={successMessage}
            onEmit={() => handleStep('additional-data')}
            insuranceData={insuranceData}
          />
        ))}
      {currentStep === 'additional-data' && insuranceData && (
        <AdditionalDataFormWrapper
          insuranceData={insuranceData as InsurancesData}
          onBack={() => handleStep('emit')}
          onSubmit={handleSaveAdditionalData}
          insuranceType={insuranceType}
          paymentFraction={selectedFrequency}
        />
      )}
      {currentStep === 'quote-summary' && insuranceData && (
        <QuoteSummary
          insuranceData={insuranceData}
          handlePayment={handlePayment}
          handleStep={handleStep}
          isCheckoutOpen={isCheckoutOpen}
          paymentErrorMessage={paymentErrorMessage}
          insuranceType={insuranceType}
        />
      )}
      {currentStep === 'confirmation' && insuranceData && paymentData && (
        <PaymentConfirmation
          insuranceData={insuranceData}
          onFinish={() => {
            handleStep('estimate');
            handleFinishInsuranceFlow();
            handleFinishPaymentFlow();
          }}
        />
      )}
    </>
  );
};
