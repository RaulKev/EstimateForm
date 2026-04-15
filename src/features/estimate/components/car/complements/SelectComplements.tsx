import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ComplementsCarList } from '@/mocks/car-data.mock';

interface SelectComplementsProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function SelectComplements({ value, onValueChange }: SelectComplementsProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Seleccionar aditamento" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {ComplementsCarList.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
