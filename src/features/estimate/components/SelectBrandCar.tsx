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
    fn: (value: string) => void;
}

export function SelectCarBrand({ items, fn }: SelectData) {
    return (
        <Select onValueChange={(e) => fn(e)}>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Marca' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((item, i) => (
                        <SelectItem key={i} value={item}>{item}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
