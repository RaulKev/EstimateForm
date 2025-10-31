import type { Insurance } from '@/mocks/request.mock';
import { useEffect, useState } from 'react';
import { EstimateForm } from './EstimateForm';
import Emitir from './Emitir';
import {
    checkStatusPayment,
    getUrlPayment,
    type InsurancePaymentStatusResponse,
} from '../services/insurance.service';
import { Validacion } from './validacion';

type FlowStep = 'estimate' | 'emit' | 'emited';
interface FlowProps {
    storeToken?: string;
}

export const EstimateFlow = ({ storeToken }: FlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("estimate");
  const [insuranceData, setInsuranceData] = useState<Insurance | null>(null);
  const [paymentData, setPayment] = useState<InsurancePaymentStatusResponse | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
    const handleEstimateSuccess = (data: Insurance) => {
        setInsuranceData(data);
        setCurrentStep('emit');
    };
    const handleBack = () => {
        setCurrentStep('estimate');
    };

  const handleEmit = async (insuranceId: string) => {
    setIsCheckoutOpen(true);
    setPaymentErrorMessage('');
    let paymentUrl: string = '';

    try {
      const paymentUrlResponse = await getUrlPayment(insuranceId);
      if (!paymentUrlResponse) {
        setPaymentErrorMessage('No se pudo obtener el enlace de pago');
        return;
      }

      paymentUrl = `${paymentUrlResponse}&documento=${insuranceData?.customer?.documentNumber}`;
      console.log('paymentUrl', paymentUrl);
    } catch (error) {
        console.log('Error!', error);
        setIsCheckoutOpen(false);
        setPaymentErrorMessage('Error al obtener el enlace de pago, por favor inténtalo nuevamente.');
        return;
    }

    const popup = window.open(
      paymentUrl,
      "popupPago",
      "width=600,height=700,scrollbars=yes,resizable=yes"
    );

    if (!popup) {
      alert("Popup bloqueado");
      return;
    }
    
    const interval = setInterval(async () => {
      const payment = await checkStatusPayment(insuranceId);
      if (!payment.data.isPaid && popup.closed) {
        clearInterval(interval);
        setIsCheckoutOpen(false);
        setPaymentErrorMessage('Ha cancelado el pago. Por favor inténtalo nuevamente.');
        return;
      }

      if (payment.data.isPaid) {
        popup.close();
        clearInterval(interval);
        setIsCheckoutOpen(false);
        setPayment(payment);
        setCurrentStep('emited');
        return;
      }
    }, 3000);
  };

  useEffect(() => {
    console.log('company token', storeToken);
  }, []);

  return (
    <>
      {currentStep === "estimate" && (
        <EstimateForm onSuccess={handleEstimateSuccess} setGlobalSuccessMessage={setSuccessMessage} />
      )}
      {currentStep === "emit" && insuranceData && (
        <Emitir
          onBack={handleBack}
          isCheckoutOpen={isCheckoutOpen}
          paymentErrorMessage={paymentErrorMessage}
          successMessage={successMessage}
          onEmit={() => handleEmit(insuranceData.id)}
        />
      )}
      {currentStep === "emited" &&  paymentData && (
        <Validacion payment={paymentData} />
      )}
    </>
  );
};
