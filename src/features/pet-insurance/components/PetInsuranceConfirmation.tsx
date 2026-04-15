import { CheckCircle2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { InsurancePaymentStatusResponse } from '@/features/estimate/services/insurance.service';

interface PetInsuranceConfirmationProps {
  paymentData: InsurancePaymentStatusResponse | null;
  ownerName: string;
  petName?: string;
  planName?: string;
  onFinish?: () => void;
}

export const PetInsuranceConfirmation = ({
  paymentData,
  ownerName,
  petName,
  planName = 'SuperCan',
  onFinish,
}: PetInsuranceConfirmationProps) => {
  const finalPolicyNumber = paymentData?.policyNumber;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-50 p-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-center text-kover-widget-primary mb-4">
        ¡Seguro Emitido Exitosamente!
      </h2>

      <p className="text-center text-gray-600 mb-8">
        {petName ? (
          <>
            ¡Felicidades {ownerName}, <span className="font-semibold">{petName}</span> ya
            tiene Perri-cédula!
          </>
        ) : (
          'Tu seguro de mascota ha sido emitido correctamente.'
        )}
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 space-y-3">
        {finalPolicyNumber && (
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <span className="text-sm text-gray-600">Número de Póliza</span>
            <span className="text-lg font-bold text-kover-widget-primary">
              #{finalPolicyNumber}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <span className="text-sm text-gray-600">Plan Contratado</span>
          <span className="font-semibold text-gray-900">{planName}</span>
        </div>

        {petName && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Mascota Asegurada</span>
            <span className="font-semibold text-gray-900">{petName}</span>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex gap-3">
          <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            Recibirás un correo electrónico con los detalles de tu póliza y la
            documentación correspondiente.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {onFinish && (
          <Button
            onClick={onFinish}
            className="flex-1 h-12 bg-kover-widget-primary hover:bg-kover-widget-primary-hover text-white"
          >
            Finalizar
          </Button>
        )}
      </div>
    </div>
  );
};
