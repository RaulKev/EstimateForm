import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CarModels } from "../type/types";

interface SelectData {
  items: CarModels[];
  fn: (value: string) => void;
}

export function SelectCarModel({ items, fn }: SelectData) {
  return (
    <Select onValueChange={(e) => fn(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Modelo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item, i) => (
            <SelectItem key={i} value={item.idModelo.toString()}>
              {item.modelo}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
