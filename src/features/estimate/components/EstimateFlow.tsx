import { insuranceResponse, type Insurance } from "@/mocks/request.mock";
import { useEffect, useState } from "react";
import { EstimateForm } from "./EstimateForm";
import Emitir from "./Emitir";
import { checkStatusPayment, getUrlPayment, type InsurancePaymentStatusResponse } from "../services/insurance.service";
import { Validacion } from "./validacion";

type FlowStep = "estimate" | "emit" | "emited";

interface FlowProps {
  storeToken?: string;
}

export const EstimateFlow = ({ storeToken }: FlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("estimate");//estimate
  const [insuranceData, setInsuranceData] = useState<Insurance | null>(null);
  const [paymentData, setPayment] = useState<InsurancePaymentStatusResponse | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string>('');
  const [validatingPayment, setValidatingPayment] = useState<boolean>(false);

  const handleEstimateSuccess = (data: Insurance) => {
    setInsuranceData(data);
    setCurrentStep("emit");
  };

  const handleBack = () => {
    setCurrentStep("estimate");
  };

  const handleEmit = async (insuranceId: string) => {
    setIsCheckoutOpen(true);
    setPaymentErrorMessage('');
    let paymentUrl: string = '';
    try {
      paymentUrl = await getUrlPayment(insuranceId);
      
      if (!paymentUrl) {
        setPaymentErrorMessage('No se pudo obtener el enlace de pago');
        return;
      }
    } catch (error) {
        console.log('Error!', error);
        setPaymentErrorMessage('Error al obtener el enlace de pago, por favor inténtalo nuevamente.');
        return;
    }

    const popup = window.open(
      "about:blank",
      "popupPago",
      "width=600,height=700,scrollbars=yes,resizable=yes"
    );
    if (popup) {
      popup.location.href = paymentUrl;
    } else {
      alert("Popup bloqueado");
      return;
    }

    const interval = setInterval(async () => {
      if (popup.closed) {
        clearInterval(interval);
        setIsCheckoutOpen(false);
        console.log("Popup cerrado", insuranceId);
        setValidatingPayment(true);
        const payment = await checkStatusPayment(insuranceId);

        if (payment.data.isPaid) {
          setPayment(payment);
          setCurrentStep('emited');
        } else if (!payment.data.isPaid) {
          setPaymentErrorMessage('No se pudo procesar el pago. Por favor inténtalo nuevamente.');
        }
        setValidatingPayment(false);
        return;
      }
    }, 1000);
  };

  useEffect(() => {
    console.log('company token', storeToken);
  }, []);

  return (
    <>
      {currentStep === "estimate" && (
        <EstimateForm onSuccess={handleEstimateSuccess} />
      )}
      {currentStep === "emit" && insuranceData && (
        <Emitir
          insuranceData={insuranceData}
          onBack={handleBack}
          isCheckoutOpen={isCheckoutOpen}
          paymentErrorMessage={paymentErrorMessage}
          validatingPayment={validatingPayment}
          onEmit={() => handleEmit(insuranceData.id)}
        />
      )}
      {currentStep === "emited" &&  paymentData && (
        <Validacion payment={paymentData} />
      )}
    </>
  );
};
