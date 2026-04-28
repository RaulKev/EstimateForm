import { Controller, type UseFormReturn } from 'react-hook-form';
import { ReplacementsCar } from '../type/types';
import type { EstimateFormData } from '../config/EstimeFormConfig';
import { Field, FieldDescription } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RentCarSelection } from './RentCarSelection';
import { useQuery } from '@tanstack/react-query';
import { getRentACar } from '../services/term.service';
import { useEffect } from 'react';

type Plan = {
  id: ReplacementsCar;
  title: string;
  price?: string;
  summary?: string;
};

const REPLACEMENT_CAR: Plan[] = [
  {
    id: ReplacementsCar.UBER,
    title: 'Uber',
    price: 'RD$133/mes',
    summary: 'Seguro de Ley con cobertura de $500/$500/$1MM.',
  },
  {
    id: ReplacementsCar.RENT_A_CAR,
    title: 'Rent-a-Car',
    price: 'RD$329/mes',
    summary: 'Recibirás un auto compacto por hasta 15 días en un año.',
  },
  {
    id: ReplacementsCar.NONE,
    title: 'No',
  },
];

type ReplaceCarProps = {
  form: UseFormReturn<EstimateFormData>;
  insurancesId: string;
};
export const ReplaceCar = ({ form, insurancesId }: ReplaceCarProps) => {
  const replacementValue = form.watch('car.terms.replacementCar');

  const { data: rentCarOptions, isLoading } = useQuery({
    queryKey: ['rent-a-car', insurancesId],
    queryFn: () => getRentACar(insurancesId),
    enabled: !!insurancesId && replacementValue === ReplacementsCar.RENT_A_CAR,
  });
  useEffect(() => {
    if (rentCarOptions && rentCarOptions.length > 0) {
      const rentCarOption = form.getValues('car.terms.rentCarOption');

      if (!rentCarOption?.codCategoria) {
        form.setValue(
          'car.terms.rentCarOption',
          {
            codCategoria: rentCarOptions[0].codCategoria,
            codDias: rentCarOptions[0].codDias,
          },
          { shouldValidate: true }
        );
      }
    }
  }, [rentCarOptions, form]);
  return (
    <>
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        <Controller
          control={form.control}
          name="car.terms.replacementCar"
          render={({ field, fieldState }) => {
            const isInvalid = fieldState.invalid;
            return (
              <Field>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`w-full ${isInvalid ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Selecciona un auto..." />
                  </SelectTrigger>
                  <SelectContent>
                    {REPLACEMENT_CAR.map((replace) => (
                      <SelectItem key={replace.id} value={String(replace.id)}>
                        <span className="font-medium ">{replace.title}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && (
                  <FieldDescription className="text-red-500 mt-2">
                    {fieldState.error?.message}
                  </FieldDescription>
                )}
              </Field>
            );
          }}
        />
        {replacementValue === ReplacementsCar.RENT_A_CAR && (
          <RentCarSelection options={rentCarOptions} isLoading={isLoading} form={form} />
        )}
      </div>
    </>
  );
};
