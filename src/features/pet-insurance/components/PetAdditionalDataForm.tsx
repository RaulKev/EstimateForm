import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { AddressForm } from '@/features/estimate/components/additional-data/AdditionalDataForm';
import { formatInsuranceUpdateRequest } from '@/features/estimate/mappers/format-update-insurance';
import {
  additionalDataDefaultValues,
  additionalDataSchema,
  type AdditionalDataFormData,
} from '@/features/estimate/schemas/additionalDataSchema';
import { updateInsurance } from '@/features/estimate/services/insurance.service';
import type { UpdateInsuranceRequest } from '@/features/estimate/type/insurance.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { XCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface PetAdditionalDataFormProps {
  insuranceId: string;
  paymentFraction: string;
  onBack: () => void;
  onSuccess: (data: UpdateInsuranceRequest) => void;
}

export const PetAdditionalDataForm = ({
  onBack,
  onSuccess,
  insuranceId,
  paymentFraction,
}: PetAdditionalDataFormProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  type schemaToResolveType = Omit<
    AdditionalDataFormData,
    'smartDevice' | 'endorsmentPolicy'
  >;
  const form = useForm<Omit<AdditionalDataFormData, 'smartDevice' | 'endorsmentPolicy'>>({
    resolver: yupResolver(additionalDataSchema.omit(['smartDevice', 'endorsmentPolicy'])),
    defaultValues: additionalDataDefaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: schemaToResolveType) => {
    const completeData = {
      ...data,
      terms: {
        paymentFraction: paymentFraction,
      },
    };
    const updatePayload = formatInsuranceUpdateRequest(completeData);
    const successUpdate = await updateInsurance(insuranceId, updatePayload);
    if (successUpdate) {
      onSuccess(updatePayload);
    }
  };
  const onError = () => {
    setAlertMessage('Error en la actualización');
    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          Datos adicionales
        </h1>
        <p className="mt-1 text-slate-500">
          Por favor, completa la siguiente información para continuar con la emisión.
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex justify-center w-full"
      >
        <FieldGroup className="w-full max-w-3xl">
          <div className="w-full">
            <AddressForm form={form} />
            {alertMessage && (
              <Alert variant={'destructive'} className="border-red-500 bg-red-50 mt-6">
                <XCircle className="h-5 w-5 text-red-600 shrink-0" />
                <AlertTitle>Error en la actualización</AlertTitle>
                <AlertDescription className="text-sm">{alertMessage}</AlertDescription>
              </Alert>
            )}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
              <Button
                type="button"
                variant="secondary"
                className="h-11 px-10 cursor-pointer w-full md:w-44"
                onClick={onBack}
                disabled={isSubmitting}
              >
                ATRÁS
              </Button>
              <Button
                type="submit"
                className="h-11 px-10 cursor-pointer w-full md:w-auto bg-kover-widget-primary hover:bg-kover-widget-primary-hover"
              >
                {isSubmitting ? 'GUARDANDO...' : 'GUARDAR'}
              </Button>
            </div>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};
