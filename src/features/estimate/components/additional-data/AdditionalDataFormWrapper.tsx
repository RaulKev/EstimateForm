import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
  InsurancesData,
  UpdateInsuranceRequest,
} from '@/features/estimate/type/insurance.types';
import { AddressForm } from './AdditionalDataForm';
import { FieldGroup } from '@/components/ui/field';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';
import LoadingOverlay from '@/shared/LoadingOverlay';
import { InsurancesType } from '@/mocks/summary.mock';
import { PolicyData } from './PoliticalData';
import { SmartDeviceField } from './SmartDeviceField';
import {
  additionalDataDefaultValues,
  createAdditionalDataSchema,
  type MixedAdditionalDataFormData,
} from '../../schemas/additionalDataSchema';
import { formatInsuranceUpdateRequest } from '../../mappers/format-update-insurance';
import { updateInsurance } from '../../services/insurance.service';

interface AdditionalDataFormWrapperProps {
  insuranceData: InsurancesData;
  insuranceType: InsurancesType;
  onBack: () => void;
  onSubmit: (data: UpdateInsuranceRequest) => Promise<void>;
  paymentFraction: string | null;
}

export const AdditionalDataFormWrapper = ({
  onBack,
  onSubmit,
  insuranceType,
  paymentFraction,
  insuranceData,
}: AdditionalDataFormWrapperProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const schemaToResolve = createAdditionalDataSchema(insuranceType);

  const form = useForm<MixedAdditionalDataFormData>({
    resolver: yupResolver(schemaToResolve),
    defaultValues: additionalDataDefaultValues,
    mode: 'onChange',
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const showSmartDevice = insuranceType === InsurancesType.DRIVE_INSURANCE;
  const showEndorsment = [
    InsurancesType.AUTO_INSURANCE,
    InsurancesType.DRIVE_INSURANCE,
  ].includes(insuranceType);

  const handleSubmit = async (data: MixedAdditionalDataFormData) => {
    try {
      setAlertMessage(null);
      const completeData = {
        ...data,
        ...(paymentFraction && { terms: { paymentFraction } }),
      };
      const updatePayload = formatInsuranceUpdateRequest(completeData);
      const success = await updateInsurance(insuranceData.id, updatePayload);

      if (success) {
        reset();
        setAlertMessage(null);
        setTimeout(() => setAlertMessage(null), 5000);
        onSubmit(updatePayload);
      } else {
        setAlertMessage(
          'No se pudieron guardar los datos. Por favor intenta nuevamente.'
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
      setAlertMessage(errorMessage);
    }
  };
  const onError = () => {
    const message = `
          Faltan por completar o corregir en algunos campos
      `;
    setAlertMessage(message);
  };
  useEffect(() => {
    if (alertMessage && form.formState.isValid) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage, form.formState.isValid]);

  return (
    <>
      {isSubmitting && <LoadingOverlay message="Actualizando datos" />}
      <div className="px-4 py-6 md:py-10 w-full">
        <div className="mb-8 text-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            Datos adicionales
          </h1>
          <p className="mt-1 text-slate-500">
            Por favor, completa la siguiente información para continuar con la emisión.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSubmit, onError)}
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

              {showSmartDevice && <SmartDeviceField form={form} />}
              {showEndorsment && <PolicyData form={form} />}

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
    </>
  );
};
