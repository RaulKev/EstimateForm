import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Insurance } from "@/mocks/request.mock";

interface EmitirProps {
  insuranceData: Insurance;
  isCheckoutOpen: boolean;
  onBack: () => void;
  onEmit: () => void;
}

export default function Emitir({ insuranceData, isCheckoutOpen, onBack, onEmit }: EmitirProps) {
  const [kmMes, setKmMes] = React.useState<number>(0);

  // Obtener datos de la cotización
  const premium = insuranceData.terms.premium || 1000;
  const precioPorKm = 23.15;

  const formatDOP = (n: number) =>
    new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
      minimumFractionDigits: 0,
    }).format(n);

  const totalMensual = premium + kmMes * precioPorKm;

  const inc = () => setKmMes((v) => Math.min(999999, v + 10));
  const dec = () => setKmMes((v) => Math.max(0, v - 10));
  const onChangeKm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value.replace(/\D/g, ""));
    setKmMes(Number.isFinite(n) ? Math.min(999999, n) : 0);
  };

  return (
    <div className="bg-gray-50 p-4">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-orange-100" />
          
          {
           isCheckoutOpen && ( <div
        className={`mt-4 transition-all duration-300 ease-out ${
          isCheckoutOpen
            ? 'scale-100 opacity-100' 
            : 'scale-50 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Por favor, complete el proceso de pago antes de cerrarlo!
              </p>
            </div>
          </div>
        </div>
      </div>
            )
          }

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Por Lo Que Conduces
          </h1>
          <p className="mt-1 text-slate-500">
            ¡Listo, mira cuánto ahorrarás con tu{" "}
            <span className="font-medium">ABARTH 695 2012</span>!
          </p>
        </div>

        {/* Bloque: Prima a pagar */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-emerald-500 text-white text-center py-4 rounded-t-xl">
            <h2 className="text-xl font-semibold">Prima a Pagar</h2>
          </div>

          {/* Content */}
          <div className="bg-white border-2 border-emerald-500 border-t-0 rounded-b-xl p-8">
            <div className="grid  gap-8 items-start">
              {/* Left Section - Pricing */}
              <div className="space-y-6">
                <div className="text-center text-slate-700 font-medium mb-6">
                  Mensualmente
                </div>

                <div className="flex items-center justify-center gap-8">
                  {/* Fixed Amount */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-500 mb-1">
                      RD$1,000
                    </div>
                    <div className="text-sm font-semibold text-emerald-500 uppercase tracking-wide">
                      Fijo
                    </div>
                  </div>

                  {/* Plus */}
                  <div className="text-2xl text-slate-400 font-light">más</div>

                  {/* Per KM */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-500 mb-1">
                      RD$23.15
                    </div>
                    <div className="text-sm font-medium text-emerald-500">
                      por Km recorrido
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="hidden md:block shrink-0 self-stretch" />
              {/* Right Section - Promo Code */}
              <div className="flex flex-col justify-center h-full">
                <div className="space-y-3">
                  <Label
                    htmlFor="promo"
                    className="text-slate-700 font-medium text-base"
                  >
                    ¿Código Promocional o de Referimiento?
                  </Label>
                  <Input
                    id="promo"
                    type="text"
                    placeholder="Ingresa tu código"
                    className="h-12 text-base border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 w-[70%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bloque: Calcula tu ahorro */}
        <div className="mt-8 overflow-hidden rounded-xl border border-orange-500/30">
          <div className="bg-orange-500 px-6 py-3 text-center font-semibold text-white">
            Calcula tu ahorro
          </div>

          <div className="p-6">
            <div className="mx-auto max-w-2xl">
              <p className="mb-4 text-center text-slate-600">
                ¿Cuánto conduces cada mes?
              </p>

              {/* Input con botones -/+ */}
              <div className="mx-auto flex max-w-md items-center gap-3">
                <button
                  type="button"
                  onClick={dec}
                  className="rounded-md border bg-white px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  –
                </button>

                <Input
                  inputMode="numeric"
                  value={kmMes.toString()}
                  onChange={onChangeKm}
                  className="h-12 text-center text-lg font-semibold"
                  placeholder="0"
                  aria-label="Kilómetros al mes"
                />

                <button
                  type="button"
                  onClick={inc}
                  className="rounded-md border bg-white px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  +
                </button>
              </div>

              <Separator
                orientation="vertical"
                className="hidden md:block shrink-0 self-stretch"
              />

              {/* Resultado */}
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="mb-3 space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Prima fija:</span>
                    <span className="font-medium">{formatDOP(premium)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Km recorridos ({kmMes} km):</span>
                    <span className="font-medium">
                      {formatDOP(kmMes * precioPorKm)}
                    </span>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="text-center">
                  <div className="mb-1 text-sm text-slate-500">
                    pagarías en total
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {formatDOP(totalMensual)}/mes{" "}
                    <span className="text-slate-400">o</span>{" "}
                    {formatDOP(totalMensual * 12)}/año
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-10 flex items-center justify-between">
          <Button variant="secondary" className="px-6" onClick={onBack}>
            ATRÁS
          </Button>
          <Button
            className="h-11 px-10 bg-orange-500 hover:bg-orange-600 text-base font-semibold"
            onClick={onEmit}
          >
            EMITIR
          </Button>
        </div>
      </div>
    </div>
  );
}
