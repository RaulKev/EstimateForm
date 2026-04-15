import { PetEstimateForm } from './PetEstimateForm';
import { UploadFileFlow } from './components/UploadFileFlow';
import { QuoteSummary } from '../estimate/components/summary/QuoteSummary';
import { InsurancesType } from '@/mocks/summary.mock';
import { PetInsuranceConfirmation } from './components/PetInsuranceConfirmation';
import { PeriodsFrequency } from '@/shared/types/insurances.types';
import { AdditionalDataFormWrapper } from '../estimate/components/additional-data/AdditionalDataFormWrapper';
import { useInsuranceFlow } from '@/shared/hooks/useInsuranceFlow';
import { usePaymentFlow } from '@/shared/hooks/usePaymentFlow';
import { useState } from 'react';
import PaymentSummary from './components/PaymentSummary';

interface PetInsuranceFlowProps {
  storeToken?: string;
}

export const PetInsuranceFlow = ({ storeToken }: PetInsuranceFlowProps) => {
  const {
    currentStep,
    insuranceData,
    handleStep,
    handleEstimateSuccess,
    handleSaveAdditionalData,
    successMessage,
    setInsuranceData,
  } = useInsuranceFlow();
  const { isCheckoutOpen, paymentErrorMessage, paymentData, handlePayment } =
    usePaymentFlow();

  const [paymentFraction, setPaymentFraction] = useState<string>(
    PeriodsFrequency.MONTHLY
  );

  return (
    <>
      <h3 className="text-2xl text-center font-bold">Para Tu Mejor Amigo</h3>
      {currentStep === 'estimate' && (
        <PetEstimateForm onSuccess={handleEstimateSuccess} storeToken={storeToken} />
      )}

      {currentStep === 'emit' && insuranceData && (
        <PaymentSummary
          successMessage={successMessage}
          insuranceData={insuranceData}
          onBack={handleStep}
          onEmit={handleStep}
          onChangePaymentFraction={setPaymentFraction}
        />
      )}

      {currentStep === 'upload-file' && insuranceData && (
        <UploadFileFlow
          insuranceId={insuranceData.id?.toString()}
          petName={insuranceData.quotationResponse.data.mascota.nombre || 'tu mascota'}
          onSuccess={handleStep}
          onBack={handleStep}
        />
      )}

      {currentStep === 'additional-data' && insuranceData && (
        <AdditionalDataFormWrapper
          insuranceData={insuranceData}
          onBack={() => handleStep('upload-file')}
          onSubmit={handleSaveAdditionalData}
          insuranceType={InsurancesType.PET_INSURANCE}
          paymentFraction={paymentFraction}
        />
      )}

      {currentStep === 'quote-summary' && insuranceData && (
        <QuoteSummary
          insuranceData={insuranceData}
          handlePayment={handlePayment}
          handleStep={handleStep}
          isCheckoutOpen={isCheckoutOpen}
          paymentErrorMessage={paymentErrorMessage}
          insuranceType={InsurancesType.PET_INSURANCE}
        />
      )}

      {currentStep === 'confirmation' && insuranceData && (
        <PetInsuranceConfirmation
          paymentData={paymentData}
          ownerName={insuranceData.customer.firstName}
          petName={insuranceData.quotationResponse?.data?.mascota?.nombre}
          planName={
            insuranceData.quotationResponse?.data?.terminos?.planMascota || 'SuperCan'
          }
          onFinish={() => {
            console.log('Finalizar flujo');
            handleStep('estimate');
            setInsuranceData(null);
          }}
        />
      )}
    </>
  );
};
