import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Aditamentos } from '@/features/estimate/type/types';

interface SelectComplementsProps {
  value?: string;
  onValueChange?: (value: string) => void;
  aditamentos: Aditamentos[]; 
}

export function SelectComplements({ value, onValueChange, aditamentos }: SelectComplementsProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Seleccionar aditamento" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {aditamentos.map((item) => (
            <SelectItem key={item.codAditamento} value={item.codAditamento.toString()}>
              {item.nombreAditamento}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
