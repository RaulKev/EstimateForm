import { useState } from 'react';
import type { CarModels } from '../../type/types';
import { useDebounce } from '../../hook/useDebounce';
import type { ControllerRenderProps } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface ModelSelectProps {
  field: ControllerRenderProps<EstimateFormData>;
  items: CarModels[];
  invalid?: boolean;
  disabled?: boolean;
}
export function SelectCarModel({
  field,
  items,
  invalid,
  disabled,
}: ModelSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);

  const mappedItems = items.map((m) => ({
    value: m.idModelo.toString(),
    label: m.modelo,
  }));


  const filteredItems =
    debouncedSearch.length >= 2
      ? mappedItems.filter((item) =>
          item.label.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : mappedItems;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={invalid}
          disabled={disabled}
          className={cn(
            'select-none w-full justify-between font-normal h-10',
            invalid && 'border-red-500'
          )}
        >
          {field.value
            ? mappedItems.find((m) => m.value === String(field.value))?.label
            : 'Selecciona un modelo...'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-106 p-0">
        <Command>
          <CommandInput
            onInput={(e) => setSearchValue((e.target as HTMLInputElement).value)}
            placeholder="Buscar modelo..."
          />
          <CommandList>
            {filteredItems.length === 0 && (
              <CommandEmpty>No se encontraron modelos</CommandEmpty>
            )}
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => {
                    field.onChange(Number(item.value));
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      String(field.value) === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
