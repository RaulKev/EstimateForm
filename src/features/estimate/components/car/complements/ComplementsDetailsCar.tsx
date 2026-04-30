import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Plus, X } from 'lucide-react';
import { SelectComplements } from './SelectComplements';
import { useState, type ChangeEvent } from 'react';
import { useAditamentos } from '@/features/estimate/hook/useAditamentos';
import { formatNumber } from '@/utils';

export interface AddedComplement {
  codigo: string;
  monto: number;
  comentario: string;
}

interface ComplementsDetailsCarProps {
  complements: AddedComplement[];
  setComplements: (complements: AddedComplement[]) => void;
  onClose: () => void;
}

export const ComplementsDetailsCar = ({
  complements,
  setComplements,
  onClose,
}: ComplementsDetailsCarProps) => {
  const { aditamentos } = useAditamentos();
  const [selectedComplement, setSelectedComplement] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleAddComplement = () => {
    if (!selectedComplement || !value) return;

    const numericValue = parseFloat(
      value
        .replace('RD$', '')
        .replace(',', '')
        .replace(/[^0-9.]/g, '')
    );
    if (isNaN(numericValue) || numericValue <= 0) return;

    const complementData = aditamentos.find(
      (c) => c.codAditamento.toString() === selectedComplement
    );

    if (!complementData) return;

    const newComplement: AddedComplement = {
      codigo: selectedComplement,
      monto: numericValue,
      comentario: comment,
    };

    setComplements([...complements, newComplement]);
    setSelectedComplement('');
    setValue('');
    setComment('');
  };

  const handleWorthChange = (
    e: ChangeEvent<HTMLInputElement> | string,
    onChange: (value: number | '') => void
  ) => {
    const rawValue = typeof e === 'string' ? e : e.target.value;
    const cleanValue = rawValue.replace(/[^0-9.]/g, '');
    onChange(cleanValue === '' ? '' : Number(cleanValue));
  };

  const handleRemoveComplement = (id: string) => {
    const deleteComplement = complements.filter((c) => c.codigo !== id);
    setComplements(deleteComplement);
  };

  const totalValue = complements.reduce((acc, c) => acc + Number(c.monto), 0);

  return (
    <div className="border-slate-200 bg-slate-50 p-6 rounded-md w-full">
      <h1 className="text-kover-widget-primary font-medium">
        Agrega los aditamientos de tu vehículo
      </h1>
      <p className="text-slate-500 text-sm">
        Selecciona los aditamentos que tiene tu vehículo para ajustar la cobertura de tu
        seguro.
      </p>
      <div className="my-4 w-full">
        <div className="bg-white border-slate-200 rounded-md p-4 w-full">
          <div className="flex flex-col md:flex-row md:items-end w-full gap-4">
            <div className="flex flex-col justify-between gap-2 flex-1">
              <label htmlFor="">Aditamiento:</label>
              <SelectComplements
                value={selectedComplement}
                onValueChange={setSelectedComplement}
                aditamentos={aditamentos}
              />
            </div>
            <div className="flex flex-col justify-between gap-2 flex-1">
              <label htmlFor="">Valor:</label>
              <div className="relative w-full">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="0.00"
                  value={formatNumber(value)}
                  onChange={(e) =>
                    handleWorthChange(e, (val) => setValue(val.toString()))
                  }
                  className="placeholder:text-kover-widget-primary placeholder:font-semibold pl-10 text-kover-widget-primary font-semibold"
                />
                <span
                  className="pointer-events-none absolute left-3 top-0 flex h-10 items-center text-sm
                  "
                >
                  RD$
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-2 flex-1">
              <label htmlFor="">Comentario:</label>
              <Input
                type="text"
                placeholder="Comentario"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <Button
              size="default" // Cambiamos a default para que pueda expandirse en mobile
              type="button"
              className="h-10 shrink-0 bg-kover-widget-primary text-white hover:bg-kover-widget-primary-hover cursor-pointer 
             w-full md:w-10 flex items-center justify-center gap-2"
              disabled={!selectedComplement || !value}
              onClick={handleAddComplement}
            >
              {/* El ícono se mantiene siempre */}
              <Plus className="size-5 hidden md:block" />

              {/* El texto solo se renderiza/muestra en mobile */}
              <span className="block md:hidden font-medium">Guardar</span>
            </Button>
          </div>
        </div>
      </div>
      {complements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-kover-widget-primary font-medium">
            Aditamientos agregados:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            {complements.map((c) => {
              const complementInfo = aditamentos.find(
                (a) => a.codAditamento.toString() === c.codigo
              );
              const nameComplement = complementInfo
                ? complementInfo.nombreAditamento
                : c.codigo;
              return (
                <div
                  key={c.codigo}
                  className="bg-white border-slate-200 rounded-md p-4 w-full"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-kover-widget-primary font-medium">
                      {nameComplement}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleRemoveComplement(c.codigo)}
                      className="text-slate-400 hover:text-red-500 p-1 rounded-full cursor-pointer transition-colors"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                  <span>RD${c.monto.toLocaleString('es-DO')}</span>
                  <p>{c.comentario}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end">
            <div className="flex justify-between items-center gap-8 bg-indigo-50 p-4 rounded-md">
              <p className="text-kover-widget-primary">Valor total de aditamentos:</p>
              <p className="text-black font-semibold">
                RD${totalValue.toLocaleString('es-DO')}
              </p>
            </div>
          </div>
        </div>
      )}
      <Separator />
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="outline"
          type="button"
          className="cursor-pointer"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={onClose}
          className="bg-kover-widget-primary text-white hover:bg-kover-widget-primary-hover cursor-pointer"
          disabled={complements.length === 0}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};
