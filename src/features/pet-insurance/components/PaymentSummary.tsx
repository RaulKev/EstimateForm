import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Coins } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { useCallback, useEffect, useState } from 'react';
import type { FlowStep } from '@/features/estimate/type/types';
import { Switch } from '@/components/ui/switch';
import { PeriodsFrequency } from '@/shared/types/insurances.types';
import { formatDOP } from '@/utils';

interface EmitirProps {
  onBack: (step: FlowStep) => void;
  onEmit: (step: FlowStep) => void;
  onChangePaymentFraction: (paymentFraction: string) => void;
  successMessage: string | null;
  insuranceData?: InsurancesData;
}

export default function PaymentSummary({
  onBack,
  onEmit,
  onChangePaymentFraction,
  successMessage,
  insuranceData,
}: EmitirProps) {
  const [isMensual, setIsMensual] = useState<boolean>(true);

  const getPaymentByPeriod = useCallback(
    (period: PeriodsFrequency) => {
      return primas.find((p) => p.fraccionamientoPago === period)?.cobro || 0;
    },
    [insuranceData]
  );

  const quotationResponse = insuranceData?.quotationResponse;
  const quotationData = quotationResponse?.data;

  const primas = quotationData?.primas ?? [];

  const totalPayment = isMensual
    ? getPaymentByPeriod(PeriodsFrequency.MONTHLY)
    : getPaymentByPeriod(PeriodsFrequency.ANUAL);
  const petName = quotationData?.mascota.nombre;

  useEffect(() => {
    onChangePaymentFraction(
      isMensual ? PeriodsFrequency.MONTHLY : PeriodsFrequency.ANUAL
    );
  }, [isMensual]);

  return (
    <div className="mx-auto max-w-5xl py-6 md:py-10 w-full">
      {successMessage && (
        <Alert variant="success" className="mb-10 relative border-green-500 bg-green-50">
          <CheckCircle2 className="h-4 w-4 " />
          <AlertTitle className="text-green-700 font-semibold">
            Cotización generada
          </AlertTitle>
          <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
        </Alert>
      )}
      <div className="mb-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-slate-500">
            ¡Listo, <span className="font-medium">{petName}</span> tendrá protección!
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto transition-shadow ">
        <div className="bg-kover-widget-primary text-white text-center py-5 md:py-6 rounded-t-xl flex items-center justify-center gap-1 md:gap-2 shadow-lg shadow-indigo-500/20">
          <Coins className="h-6 w-6 md:h-7 md:w-7 text-yellow-400" />
          <h2 className="text-xl font-semibold">Prima a Pagar</h2>
        </div>

        <div className="bg-gray-50 border-2 border-kover-widget-primary border-t-0 rounded-b-xl p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="text-center text-slate-700 font-medium flex items-center space-x-2 justify-center">
                <Label htmlFor="mensual-plan">Anual</Label>
                <Switch
                  defaultChecked
                  className="bg-kover-widget-primary"
                  id="mensual-plan"
                  onCheckedChange={(e) => {
                    setIsMensual(e);
                  }}
                ></Switch>
                <Label htmlFor="mensual-plan">Mensual</Label>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-kover-widget-primary mb-1">
                    {formatDOP(totalPayment)}
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-black uppercase tracking-wider">
                    {isMensual ? 'Mensualmente' : 'Anualmente'}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="md:hidden" />
            <div className="flex flex-col justify-between items-center h-full">
              <div className="w-full text-center">
                <Label
                  htmlFor="promo"
                  className="text-indigo-700 font-semibold text-sm md:text-base mb-4 md:mb-6 block text-center"
                >
                  ¿Código Promocional o de Referimiento?
                </Label>
                <Input
                  id="promo"
                  type="text"
                  placeholder="Ingresa tu código"
                  className="h-10 md:h-12 text-sm md:text-base border-2 border-slate-400 w-full md:w-[70%] mx-auto text-center transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <Button
          variant="secondary"
          className="h-11 px-10 cursor-pointer w-full md:w-44"
          onClick={() => onBack('estimate')}
        >
          ATRÁS
        </Button>
        <Button
          className=" w-full md:w-44 h-11 px-10 bg-kover-widget-primary hover:bg-kover-widget-primary-hover text-base font-semibold cursor-pointer"
          onClick={() => onEmit('upload-file')}
        >
          CONTINUAR
        </Button>
      </div>
    </div>
  );
}
