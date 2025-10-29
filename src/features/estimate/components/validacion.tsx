import type { InsurancePaymentStatusResponse } from "../services/insurance.service";

interface ValidacionProps {
  payment: InsurancePaymentStatusResponse;
}

export const Validacion = ({ payment } : ValidacionProps) => {
  const isEmit = Boolean(payment.data.isPaid && payment.data.policyNumber);

  return(
  <div>
    <p>Estado de la cotización</p>
    {
      isEmit ? <p>Emitido</p> : <p>Pago-preaprobado</p>
    }
    <p>Número de cotización: {payment.data.quoteNumber}</p>
    
    {
      isEmit ? <p>Número de póliza: {payment.data.policyNumber}</p> : ''
    }
  </div>);
}