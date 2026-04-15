import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { EllipsisVertical, Plus } from 'lucide-react';
import { SelectComplements } from './SelectComplements';
import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { ComplementsCarList } from '@/mocks/car-data.mock';

export interface AddedComplement {
  id: string;
  complementId: string;
  name: string;
  value: number;
  comment: string;
}

interface ComplementsDetailsCarProps {
  complements: AddedComplement[];
  setComplements: Dispatch<SetStateAction<AddedComplement[]>>;
  onClose: () => void;
}

export const ComplementsDetailsCar = ({ complements, setComplements, onClose }: ComplementsDetailsCarProps) => {
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
    const complementData = ComplementsCarList.find(
      (c) => c.id === Number(selectedComplement)
    );
    if (!complementData) return;
    const newComplement: AddedComplement = {
      id: Date.now().toString(),
      complementId: selectedComplement,
      name: complementData.name,
      value: numericValue,
      comment: comment,
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
    const deleteComplement = complements.filter((c) => c.id !== id);
    setComplements(deleteComplement);
  };
  
  const totalValue = complements.reduce((acc, c) => acc + Number(c.value), 0);

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
        <form action="">
          <div className="flex items-end w-full gap-4">
            <div className="flex flex-col justify-between gap-2 flex-1">
              <label htmlFor="">Aditamiento:</label>
              <SelectComplements
                value={selectedComplement}
                onValueChange={setSelectedComplement}
              />
            </div>
            <div className="flex flex-col justify-between gap-2 flex-1">
              <label htmlFor="">Valor:</label>
              <Input
                type="text"
                placeholder="RD$0"
                value={value}
                onChange={(e) => handleWorthChange(e, (val) => setValue(val.toString()))}
                className="placeholder:text-kover-widget-primary placeholder:font-semibold"
              />
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
              size="icon"
              type="button"
              className="h-10 w-10 shrink-0"
              disabled={!selectedComplement || !value}
              onClick={handleAddComplement}
            >
              <Plus className="size-5" />
            </Button>
          </div>
        </form>
      </div>
      {complements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-kover-widget-primary font-medium">
            Aditamientos agregados:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            {complements.map((c) => (
              <div key={c.id} className="bg-white border-slate-200 rounded-md p-4 w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-kover-widget-primary font-medium">{c.name}</h3>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveComplement(c.id)} 
                    className="text-slate-400 hover:text-red-500 p-1 rounded-full"
                  >
                    <EllipsisVertical className="size-5" />
                  </button>
                </div>
                <span>RD${c.value.toLocaleString('es-DO')}</span>
                <p>{c.comment}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <div className="flex justify-between items-center gap-8 bg-indigo-50 p-4 rounded-md">
              <p className="text-kover-widget-primary">Valor total de aditamentos:</p>
              <p className="text-black font-semibold">RD${totalValue.toLocaleString('es-DO')}</p>
            </div>
          </div>
        </div>
      )}
      <Separator />
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" type="button" className='cursor-pointer' onClick={onClose}>Cancelar</Button>
        <Button type="button" onClick={onClose}>Guardar</Button>
      </div>
    </div>
  );
};
