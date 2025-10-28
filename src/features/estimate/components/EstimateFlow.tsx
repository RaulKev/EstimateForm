import type { Insurance } from "@/mocks/request.mock";
import { useEffect, useState } from "react";
import { EstimateForm } from "./EstimateForm";
import Emitir from "./Emitir";
import { toast } from "sonner";
import { checkStatusPayment, getUrlPayment, type InsurancePaymentStatusResponse } from "../services/insurance.service";
import { Validacion } from "./validacion";

type FlowStep = "estimate" | "emit" | "emited";

interface FlowProps {
  storeToken?: string;
}

export const EstimateFlow = ({ storeToken }: FlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("estimate");
  const [insuranceData, setInsuranceData] = useState<Insurance | null>(null);
  const [paymentData, setPayment] = useState<InsurancePaymentStatusResponse | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const handleEstimateSuccess = (data: Insurance) => {
    setInsuranceData(data);
    setCurrentStep("emit");
  };

  const handleBack = () => {
    setCurrentStep("estimate");
  };

  const handleEmit = async (insuranceId: string) => {
    setIsCheckoutOpen(true);
    const popup = window.open(
      "about:blank",
      "popupPago",
      "width=600,height=800,scrollbars=yes,resizable=yes"
    );
    if (popup) {
      popup.document.write("<h1>Obteniendo enlace de pago...</h1>");
    } else {
      alert("Popup bloqueado");
      return;
    }

    let paymentUrl: string = '';
    try {
      paymentUrl = await getUrlPayment(insuranceId);
      
      if (!paymentUrl) {
        popup.document.write("<p>No se pudo obtener el enlace de pago</p>");
        return;
      }
    } catch (error) {
        console.log('Error!', error);
        toast.error("Error al obtener el enlace de pago, por favor intenta nuevamente.");
        popup.close();
        return;
    }

    popup.location.href = paymentUrl;
    
    const interval = setInterval(async () => {
      if (popup.closed) {
        clearInterval(interval);
        setIsCheckoutOpen(false);
        console.log("Popup cerrado", insuranceId);
        const payment = await checkStatusPayment(insuranceId);

        if (payment.data.isPaid) {
          setPayment(payment);
          setCurrentStep('emited');
        } else if (!payment.data.isPaid) {
          toast.error('No se pudo procesar el pago. Por favor intenta nuevamente.');
        }
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
          onEmit={() => handleEmit(insuranceData.id)}
        />
      )}
      {currentStep === "emited" &&  paymentData && (
        <Validacion payment={paymentData} />
      )}
    </>
  );
};
