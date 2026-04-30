import { CustomerDataForm } from './customer/CustomerDataForm';
import { CarForm } from './car/CarForm';
import { LawInsuranceForm } from './law-insurance/LawInsuranceForm';
import { AssistantForm } from './Assistant/AssistantForm';
import { ReplaceCar } from './ReplaceCar';
import { useForm, useWatch, type UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  initialValues,
  schemaEstimate,
  type EstimateFormData,
} from '../config/EstimeFormConfig';
import { Separator } from '@/components/ui/separator';
import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

import { generateQuota } from '../services/car-estimate.service';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { XCircle, Loader2 } from 'lucide-react';
import { usePreventScrollLock } from '../hook/usePreventSchrollLock';
import LoadingOverlay from '../../../shared/components/LoadingOverlay';
import { CustomTooltip } from '@/shared/components/CustomTooltip';
import { LawInsuranceModal } from './law-insurance/LawInsuranceModal';
import { AssistantModal } from './Assistant/AssistantModal';
import { InsurancesType } from '@/mocks/summary.mock';
import { updateInsurance } from '../services/insurance.service';
import { REPLACEMENT_CAR_LABEL, LAW_INSURANCE_LABEL } from '../config/mappers';
import { CarInsurances, ReplacementsCar } from '../type/types';

interface EstimateFormProps {
  onSuccess: (data: InsurancesData) => void;
  storeToken?: string;
  typeInsurances: InsurancesType;
}

export const EstimateForm = ({
  onSuccess,
  storeToken,
  typeInsurances,
}: EstimateFormProps) => {
  const [step, setStep] = useState(1);
  const [insurancesId, setInsuranceId] = useState<string | null>(null);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [openLaw, setOpenLaw] = useState(false);
  const [openAssistant, setOpenAssistant] = useState(false);
  const isAuto = typeInsurances === InsurancesType.AUTO_INSURANCE;
  const form = useForm<EstimateFormData>({
    resolver: yupResolver(schemaEstimate),
    defaultValues: initialValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const selectedPlan = useWatch({
    control: form.control,
    name: 'car.terms.insuranceType',
  }) as CarInsurances | undefined;
  const {
    formState: { isSubmitting },
  } = form;

  const handleNextStep = async () => {
    const isValid = await form.trigger([
      'customer.email',
      'customer.documentType',
      'customer.documentNumber',
      'customer.phone',
      'car.brand',
      'car.modelId',
      'car.year',
      'car.fuelType',
      'car.gasType',
      'car.worth',
      'car.isNew',
      'car.installationType',
      'car.isPersonalUse',
      'car.meetsRequirements',
      'car.terms.zeroDeductible',
    ]);
    if (isValid) {
      try {
        setIsLoadingNext(true);
        const currentData = form.getValues();
        const response = await generateQuota(currentData, typeInsurances, storeToken);
        setInsuranceId(response.data.id);
        setStep(2);
      } catch (error) {
        setErrorAlert(
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado. Por favor intenta nuevamente.'
        );
      } finally {
        setIsLoadingNext(false);
      }
    }
  };
  const handlePrevStep = () => setStep(1);
  const onSubmit = async (data: EstimateFormData) => {
    try {
      setErrorAlert(null);
      if (!insurancesId) {
        setErrorAlert(
          'No se pudo obtener el ID de la cotización. Por favor intenta nuevamente.'
        );
        return;
      }
      const carTerms = data.car?.terms;
      const completeData = {
        customer: {
          ...data.customer,
          documentType: String(data.customer.documentType),
          gender: data.customer.gender ? String(data.customer.gender) : undefined,
        },
        terms: {
          lawInsurance: LAW_INSURANCE_LABEL[carTerms?.insuranceType],
          vehicularAssistance: carTerms?.vehicleAssistance ?? true,
          substituteAuto: REPLACEMENT_CAR_LABEL[carTerms?.replacementCar],
          ...(carTerms?.replacementCar === ReplacementsCar.RENT_A_CAR &&
            carTerms?.rentCarOption?.codCategoria &&
            carTerms?.rentCarOption?.codDias && {
              rentCarOption: carTerms.rentCarOption,
            }),
        },
      };
      const response = await updateInsurance(insurancesId, completeData);
      onSuccess(response.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
      setErrorAlert(errorMessage);
    }
  };
  const onError = () => setErrorAlert('Faltan por completar o corregir algunos campos');

  usePreventScrollLock();
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
      {isSubmitting && <LoadingOverlay message="Generando tu cotización" />}

      {isAuto ? (
        <div className="text-center mb-8">
          {/* <h1 className="text-center text-2xl font-bold text-gray-900 mb-8 select-none">
            Para Tu Auto
          </h1> */}
          <p className="text-gray-600">
            Asegura tu auto nuevo o usado con la cobertura más completa, al mejor precio
            del mercado.
          </p>
        </div>
      ) : (
        <div className="text-center mb-8">
          {/* <h1 className="text-center text-2xl font-bold text-gray-900 mb-8 select-none">
            Por Lo Que Conduces
          </h1> */}
          <p className="text-gray-600">Seguro de Auto Full por Kilometraje</p>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FieldGroup>
          <div className="flex flex-col gap-8 max-w-4xl">
            {step === 1 && (
              <>
                <div className="space-y-6 animate-in fade-in-50 duration-500">
                  <h4 className="font-bold text-kover-widget-primary mb-6">
                    Información de contacto
                  </h4>
                  <CustomerDataForm
                    form={form as unknown as UseFormReturn<EstimateFormData>}
                  />
                </div>
                <Separator />
                <div className="space-y-4 animate-in fade-in-50 duration-500">
                  <h4 className="font-bold text-kover-widget-primary mb-6">
                    Vehículo asegurado
                  </h4>
                  <CarForm form={form} />
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
                  type="button"
                  onClick={handleNextStep}
                  disabled={isLoadingNext}
                  className="h-12 px-12 text-lg rounded-md bg-kover-widget-primary hover:bg-kover-widget-primary-hover text-white cursor-pointer"
                >
                  {isLoadingNext ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      PROCESANDO...
                    </>
                  ) : (
                    'SIGUIENTE'
                  )}
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="space-y-4 animate-in fade-in-50 duration-500">
                  <div className="flex justify-start items-center gap-1">
                    <h4 className="font-bold text-kover-widget-primary">Seguro de Ley</h4>
                    <CustomTooltip
                      message="Click para más información"
                      iconClassName="text-kover-widget-primary mt-1"
                      onClick={() => setOpenLaw(true)}
                    />
                  </div>
                  <LawInsuranceForm form={form} />
                </div>
                <Separator />
                <div className="space-y-4 animate-in fade-in-50 duration-500">
                  <div className="flex justify-start items-center gap-1">
                    <h4 className="font-bold text-kover-widget-primary">
                      Asistencia Vehicular
                    </h4>
                    <CustomTooltip
                      message="Click para más información"
                      iconClassName="text-kover-widget-primary mt-1"
                      onClick={() => setOpenAssistant(true)}
                    />
                  </div>
                  <AssistantForm form={form} />
                </div>
                <div className="space-y-4 animate-in fade-in-50 duration-500">
                  <div className="flex justify-start items-center gap-1">
                    <h4 className="font-bold text-kover-widget-primary">
                      Auto sustituto
                    </h4>
                    <CustomTooltip
                      message="Lo puedes usar en caso de siniestro que supere el deducible."
                      iconClassName="text-kover-widget-primary mt-1"
                    />
                  </div>
                  {insurancesId && <ReplaceCar form={form} insurancesId={insurancesId} />}
                </div>

                {errorAlert && (
                  <Alert
                    variant="destructive"
                    className="mb-6 relative border-red-500 bg-red-50"
                  >
                    <XCircle className="h-4 w-4" />
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

                {/* ── Botones step 2 ───────────────── */}
                <div className="flex items-center justify-between gap-4">
                  <Button
                    type="button"
                    onClick={handlePrevStep}
                    variant="outline"
                    className="h-12 px-8 text-lg rounded-md"
                  >
                    ATRÁS
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 px-12 text-lg rounded-md bg-kover-widget-primary hover:bg-kover-widget-primary-hover text-white cursor-pointer"
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'COTIZAR'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </FieldGroup>
      </form>
      <LawInsuranceModal
        openLaw={openLaw}
        setOpenLaw={setOpenLaw}
        selectedPlan={selectedPlan}
      />
      <AssistantModal openAssistant={openAssistant} setOpenAssistant={setOpenAssistant} />
      {/* <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FieldGroup>
          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Información de contacto
              </h4>
              <CustomerDataForm form={form as unknown as UseFormReturn<EstimateFormData>} />
            </div>
            <Separator />
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Vehículo asegurado
              </h4>
              <CarForm form={form} />
            </div>
            <Separator />
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              <div className="flex justify-start items-center gap-1">
                <h4 className="font-bold text-kover-widget-primary ">Seguro de Ley</h4>
                <CustomTooltip
                  message="Click para más información"
                  iconClassName="text-kover-widget-primary mt-1"
                  onClick={() => setOpenLaw(true)}
                />
              </div>
              <LawInsuranceForm form={form} />
            </div>
            <Separator />
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              <div className="flex justify-start items-center gap-1">
                <h4 className=" font-bold text-kover-widget-primary">
                  Asistencia Vehicular
                </h4>
                <CustomTooltip
                  message="Click para más información"
                  iconClassName="text-kover-widget-primary mt-1"
                  onClick={() => setOpenAssistant(true)}
                />
              </div>

              <AssistantForm form={form} />
            </div>
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              <div className="flex justify-start items-center gap-1">
                <h4 className=" font-bold text-kover-widget-primary">Auto sustituto</h4>
                <CustomTooltip
                  message="Lo puedes usar en caso de siniestro que supere el deducible."
                  iconClassName="text-kover-widget-primary mt-1"
                />
              </div>

              <ReplaceCar form={form} />
            </div>
           
            <Button
              type="submit"
              className="h-12 px-12 text-lg rounded-md transition-all bg-kover-widget-primary hover:bg-kover-widget-primary-hover cursor-pointer text-white"
            >
              {isSubmitting ? 'ENVIANDO...' : 'COTIZAR'}
            </Button>
          </div>
        </FieldGroup>
      </form>
      <LawInsuranceModal openLaw={openLaw} setOpenLaw={setOpenLaw} />
      <AssistantModal openAssistant={openAssistant} setOpenAssistant={setOpenAssistant} /> */}
    </>
  );
};
