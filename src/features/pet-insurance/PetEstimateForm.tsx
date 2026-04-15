import { FieldGroup } from '@/components/ui/field';
import { CustomerDataForm } from '../estimate/components/customer/CustomerDataForm';
import { PetDataForm } from './components/PetDataForm';
import { Button } from '@/components/ui/button';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { PetPlans } from './components/PetPlans';
import type { InsurancesData } from '../estimate/type/insurance.types';
import { formatPetInsuranceRequest } from './mappers/pet-insurance.mapper';
import { generatePetQuote } from './services/pet.service';
import { Separator } from '@/components/ui/separator';
import LoadingOverlay from '@/shared/LoadingOverlay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';
import {
  petSchemaEstimate,
  petSchemaInitialValues,
  type PetEstimateFormDataType,
} from './schemas/petInsuranceSchema';
import type { WithCustomer } from '@/shared/types/form-types';

interface PetEstimateProps {
  onSuccess: (data: InsurancesData) => void;
  storeToken?: string;
}

export const PetEstimateForm = ({ onSuccess, storeToken }: PetEstimateProps) => {
  const form = useForm<PetEstimateFormDataType>({
    resolver: yupResolver(petSchemaEstimate),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: petSchemaInitialValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const onSubmit = async (data: PetEstimateFormDataType) => {
    try {
      if (!storeToken) return;

      setErrorAlert(null);
      setIsSubmitting(true);
      const request = formatPetInsuranceRequest(data, storeToken);
      const response = await generatePetQuote(request);

      onSuccess(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
      setErrorAlert(errorMessage);
      setIsSubmitting(false);
    }
  };

  const onError = () => {
    setErrorAlert('Faltan por completar o corregir en algunos campos');
  };

  useEffect(() => {
    if (errorAlert && form.formState.isValid) {
      const timer = setTimeout(() => {
        setErrorAlert(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errorAlert, form.formState.isValid]);

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FieldGroup>
          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Información de contacto
              </h4>
              <CustomerDataForm form={form as unknown as UseFormReturn<WithCustomer>} />
            </div>
            <Separator />
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Información de mascota
              </h4>
              <PetDataForm form={form} />
            </div>
            <Separator />

            <div className="space-y-4 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Planes disponibles
              </h4>
              <PetPlans form={form} />
            </div>
            {errorAlert && (
              <Alert
                variant="destructive"
                className="mb-6 relative border-red-500 bg-red-50"
              >
                <XCircle className="h-4 w-4 " />
                <AlertTitle>Error en la cotización</AlertTitle>
                <AlertDescription>{errorAlert}</AlertDescription>

                <button
                  type="button"
                  onClick={() => setErrorAlert(null)}
                  className="absolute top-1 right-3 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </Alert>
            )}

            <Button
              type="submit"
              className="h-12 px-12 text-lg rounded-md transition-all bg-kover-widget-primary hover:bg-kover-widget-primary-hover cursor-pointer text-white"
            >
              {isSubmitting ? 'ENVIANDO...' : 'COTIZAR'}
            </Button>
          </div>
        </FieldGroup>
      </form>

      {isSubmitting && <LoadingOverlay message="Generando tu cotización" />}
    </>
  );
};
