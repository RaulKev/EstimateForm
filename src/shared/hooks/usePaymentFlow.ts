import {
  checkStatusPayment,
  getUrlPayment,
  type InsurancePaymentStatusResponse,
} from '@/features/estimate/services/insurance.service';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { useState } from 'react';
import type { FlowStep } from '@/features/estimate/type/types';
import { InsurancesType } from '@/mocks/summary.mock';

export const usePaymentFlow = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string>('');
  const [paymentData, setPayment] = useState<InsurancePaymentStatusResponse | null>(null);

  const handlePayment = async (
    insuranceData: InsurancesData,
    handleStep: (step: FlowStep) => void,
    insuranceType: InsurancesType = InsurancesType.AUTO_INSURANCE
  ) => {
    setIsCheckoutOpen(true);
    setPaymentErrorMessage('');
    let paymentUrl: string = '';
    const insuranceId = insuranceData.id;
    const isAutoInsurance = [
      InsurancesType.AUTO_INSURANCE,
      InsurancesType.DRIVE_INSURANCE,
    ].includes(insuranceType);
    try {
      const paymentUrlResponse = await getUrlPayment(insuranceId);
      if (!paymentUrlResponse) {
        setPaymentErrorMessage('No se pudo obtener el enlace de pago');
        return;
      }

      paymentUrl = `${paymentUrlResponse}&documento=${insuranceData?.customer?.documentNumber}`;
    } catch (error) {
      console.error('Error!', error);
      setIsCheckoutOpen(false);
      setPaymentErrorMessage(
        'Error al obtener el enlace de pago, por favor inténtalo nuevamente.'
      );
      return;
    }

    const popupHeight = 750;
    const popupWidth = 600;
    const left = screen.width / 2 - popupWidth / 2;
    const top = screen.height / 2 - popupHeight / 2;

    const popup = window.open(
      paymentUrl,
      'popupPago',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    if (!popup) {
      alert('Popup bloqueado, por favor habilite las ventanas emergentes');
      setIsCheckoutOpen(false);
      setPaymentErrorMessage('Por favor, habilite las ventanas emergentes');
      return;
    }

    const interval = setInterval(async () => {
      const payment = await checkStatusPayment(insuranceId);
      if (!payment.isPaid && popup.closed) {
        clearInterval(interval);
        setIsCheckoutOpen(false);
        setPaymentErrorMessage('Ha cancelado el pago. Por favor inténtalo nuevamente.');
        return;
      }

      if (popup.closed && payment.isPaid && !payment.policyNumber && !isAutoInsurance) {
        clearInterval(interval);
        setIsCheckoutOpen(false);
        setPaymentErrorMessage(
          'El seguro no ha sido emitido. Por favor inténtalo nuevamente.'
        );
        return;
      }

      if (payment.isPaid && isAutoInsurance) {
        popup.close();
        clearInterval(interval);
        setIsCheckoutOpen(false);
        setPayment(payment);
        console.log('pagado!!');
        handleStep('confirmation');
        return;
      }

      if (payment.isPaid && payment.policyNumber && !isAutoInsurance) {
        console.log('El seguro ha sido emitido');
        popup.close();
        clearInterval(interval);
        setIsCheckoutOpen(false);
        setPayment(payment);
        console.log('emitido!!');
        handleStep('confirmation');
        return;
      }
    }, 3000);
  };

  const handleFinishPaymentFlow = () => {
    setIsCheckoutOpen(false);
    setPayment(null);
    setPaymentErrorMessage('');
  };

  return {
    isCheckoutOpen,
    paymentErrorMessage,
    paymentData,
    handlePayment,
    handleFinishPaymentFlow,
  };
};
