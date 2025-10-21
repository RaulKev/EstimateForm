import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FuelType } from "../type/types";

interface SelectData {
  items: FuelType[];
  fn: (value: string) => void;
}

export function SelectFuelType({ items, fn }: SelectData) {
  return (
    <Select onValueChange={(e) => fn(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Tipo de combustible" />
      </SelectTrigger>
      <SelectContent className="max-h-40 overflow-y-auto">
        <SelectGroup>
          {items.map((item, i) => (
            <SelectItem key={i} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
