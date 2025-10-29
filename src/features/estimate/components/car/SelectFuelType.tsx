import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { FuelType } from '../../type/types';

interface SelectData {
    items: FuelType[];
    name: string;
    value: string;
    onValueChange: (value: string) => void;
}

export function SelectFuelType({
    items,
    name,
    value,
    onValueChange,
}: SelectData) {
    return (
        <Select name={name} onValueChange={onValueChange} value={value}>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Tipo de combustible' />
            </SelectTrigger>
            <SelectContent className='max-h-40 overflow-y-auto'>
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
