import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SelectData {
    items: string[];
    value?: string;
    name: string;
    onValueChange: (value: string) => void;
    invalid?: boolean;
}

export function SelectCarBrand({
    items,
    onValueChange,
    value,
    name,
    invalid,
}: SelectData) {
    return (
        <Select
            name={name}
            onValueChange={onValueChange}
            value={value || ''}>
            <SelectTrigger aria-invalid={invalid} >
                <SelectValue placeholder='Marca' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((item, i) => (
                        <SelectItem key={i} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
