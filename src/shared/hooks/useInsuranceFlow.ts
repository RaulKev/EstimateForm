import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import type { FlowStep } from '@/features/estimate/type/types';
import { useState } from 'react';

export const useInsuranceFlow = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('estimate');
  const [insuranceData, setInsuranceData] = useState<InsurancesData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleStep = (step: FlowStep) => {
    setCurrentStep(step);
  };

  const handleEstimateSuccess = (data: InsurancesData) => {
    setInsuranceData(data);
    setSuccessMessage(
      `Cotización exitosa. Tu número de cotización es: #${data.quoteNumber}`
    );
    setCurrentStep('emit');
  };

  const handleSaveAdditionalData = async (data: InsurancesData) => {
    if (!insuranceData) return;
    setInsuranceData({
      ...insuranceData,
      customer: {
        ...insuranceData.customer,
        ...data.customer,
      },
      terms: {
        ...insuranceData.terms,
        ...data.terms,
      },
    });
    handleStep('quote-summary');
  };

  const handleFinishInsuranceFlow = () => {
    setInsuranceData(null);
    setSuccessMessage(null);
    handleStep('estimate');
  };

  return {
    currentStep,
    insuranceData,
    successMessage,
    handleStep,
    handleEstimateSuccess,
    handleSaveAdditionalData,
    handleFinishInsuranceFlow,
    setInsuranceData,
  };
};
