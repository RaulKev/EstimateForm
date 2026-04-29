import type { UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../config/EstimeFormConfig';
import type { RentCar } from '../type/types';
import { Spinner } from '@/components/ui/spinner';

interface RentCarSelectionProps {
  options?: RentCar[];
  isLoading: boolean;
  form: UseFormReturn<EstimateFormData>;
}

export const RentCarSelection = ({ options, isLoading, form }: RentCarSelectionProps) => {
  const selectedCodCategoria = form.watch('car.terms.rentCarOption.codCategoria');
  const selectedCodDias = form.watch('car.terms.rentCarOption.codDias');

  if (isLoading) {
    return (
      <div className="mt-4 p-6 border rounded-2xl border-slate-200 bg-slate-50 flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (!options || options.length === 0) {
    return (
      <div className="mt-4 p-6 border rounded-2xl border-slate-200 bg-slate-50 space-y-6">
        <p>No hay opciones de vehículos rentados</p>
      </div>
    );
  }

  const groupedOptions = Object.values(
    options.reduce(
      (acc, curr) => {
        if (!acc[curr.codCategoria]) {
          acc[curr.codCategoria] = {
            categoria: curr.categoria,
            codCategoria: curr.codCategoria,
            dias: [],
          };
        }
        acc[curr.codCategoria].dias.push({
          dias: curr.dias,
          codDias: curr.codDias,
          prima: curr.prima,
        });
        return acc;
      },
      {} as Record<
        string,
        {
          categoria: string;
          codCategoria: string;
          dias: Array<{ dias: number; codDias: string; prima: number }>;
        }
      >
    )
  );
  const selectedCategoryObj = groupedOptions.find(
    (opt) => opt.codCategoria === selectedCodCategoria
  );
  const selectedCategoryName = selectedCategoryObj
    ? selectedCategoryObj.categoria
    : 'Ninguno';
  const selectedDaysObj = selectedCategoryObj?.dias.find(
    (d) => d.codDias === selectedCodDias
  );
  const selectedDaysCount = selectedDaysObj ? selectedDaysObj.dias : 0;
  const currentPrice = selectedDaysObj ? selectedDaysObj.prima : 0;

  return (
    <div className="mt-4 p-6 border rounded-2xl border-slate-200 bg-slate-50 space-y-6">
      <h3 className="text-kover-widget-primary font-bold text-md">
        Selecciona tu vehículo rentado
      </h3>
      <div className="space-y-4">
        {/* Cabecera */}
        <div className="flex justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
          <span className="w-1/3 text-left">Categoría</span>
          <span className="w-1/3 text-center">15 días / mes</span>
          <span className="w-1/3 text-center">30 días / mes</span>
        </div>

        {/* Filas de opciones */}
        {groupedOptions.map((opt) => {
          // Buscamos si la API de UNIT devolvió día 15 o día 30 para esta categoría
          const opt15 = opt.dias.find((d) => d.dias === 15);
          const opt30 = opt.dias.find((d) => d.dias === 30);
          return (
            <div
              key={opt.codCategoria}
              className="flex items-center justify-between py-2 border-t border-slate-100"
            >
              <span className="w-1/3 font-bold text-black text-sm">{opt.categoria}</span>
              {/* Columna: 15 días */}
              <div className="w-1/3 flex justify-center">
                {opt15 ? (
                  <button
                    type="button" // Type "button" evita que submita todo el formulalio grande
                    onClick={() => {
                      form.setValue(
                        'car.terms.rentCarOption',
                        {
                          codCategoria: opt.codCategoria,
                          codDias: opt15.codDias,
                        },
                        { shouldValidate: true }
                      );
                    }}
                    className={`flex items-center justify-center w-28 h-9 rounded-full border-2 cursor-pointer transition-all ${
                      selectedCodCategoria === opt.codCategoria &&
                      selectedCodDias === opt15.codDias
                        ? 'bg-kover-widget-primary text-white border-kover-widget-primary shadow-lg'
                        : 'border-kover-widget-primary text-kover-widget-primary bg-white opacity-80 hover:bg-kover-widget-primary hover:text-white'
                    }`}
                  >
                    RD${opt15.prima}
                  </button>
                ) : (
                  <span className="text-slate-300">-</span>
                )}
              </div>

              {/* Columna 30 días */}
              <div className="w-1/3 flex justify-center">
                {opt30 ? (
                  <button
                    type="button"
                    onClick={() => {
                      form.setValue(
                        'car.terms.rentCarOption',
                        {
                          codCategoria: opt.codCategoria,
                          codDias: opt30.codDias,
                        },
                        { shouldValidate: true }
                      );
                    }}
                    className={`flex items-center justify-center w-28 h-9 rounded-full border-2 cursor-pointer transition-all ${
                      selectedCodCategoria === opt.codCategoria &&
                      selectedCodDias === opt30.codDias
                        ? 'bg-kover-widget-primary text-white border-kover-widget-primary shadow-lg'
                        : 'border-kover-widget-primary text-kover-widget-primary bg-white opacity-80 hover:bg-kover-widget-primary hover:text-white'
                    }`}
                  >
                    RD${opt30.prima}
                  </button>
                ) : (
                  <span className="text-slate-300">-</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Caja de Resumen inferior */}
      <div className="bg-[#f1f5f9] rounded-xl p-3 text-center space-y-1">
        <p className="text-black font-bold text-[15px]">
          Seleccionado: {selectedCategoryName}{' '}
          {selectedDaysCount > 0 ? `– ${selectedDaysCount} días` : ''}
        </p>
        <p className="text-black text-xl font-semibold">RD${currentPrice}</p>
      </div>
    </div>
  );
};
