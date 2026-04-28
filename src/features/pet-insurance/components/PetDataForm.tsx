import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { CustomSelect } from '@/shared/components/CustomSelected';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomTooltip } from '@/shared/components/CustomTooltip';
import type { PetEstimateFormDataType } from '../schemas/petInsuranceSchema';
import { usePets } from '../hook/usePets';

interface PetFormProps {
  form: UseFormReturn<PetEstimateFormDataType>;
}

export const PetDataForm = ({ form }: PetFormProps) => {
  const { pets, isLoading, isError } = usePets();
  console.log('data', pets);
  const actualYear = new Date().getFullYear();
  const years = Array.from({ length: 9 }, (_, i) => actualYear - i);
  const petAge = Array.from({ length: 9 }, (_, i) => i);
  const yearsOptions = years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));
  const petAgeOptions = petAge.map((age) => ({
    value: age.toString(),
    label: `${age === 0 ? '6 a 11 meses' : age}${age === 0 ? '' : age > 1 ? ' años' : ' año'}`,
  }));

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <Controller
          control={form.control}
          name="pet.name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nombre</FieldLabel>
              <Input
                placeholder="Ingrese el nombre"
                value={field.value}
                onChange={(value) => field.onChange(value)}
              ></Input>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="pet.birthYear"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>¿Cuál es el año de nacimiento?</FieldLabel>
              <CustomSelect
                value={field.value}
                options={yearsOptions}
                onValueChange={(value) => field.onChange(Number(value))}
              ></CustomSelect>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="pet.age"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>¿Cuál es su edad?</FieldLabel>
              <CustomSelect
                value={field.value}
                options={petAgeOptions}
                onValueChange={(value) => field.onChange(Number(value))}
              ></CustomSelect>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="pet.breedId"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>¿Cuál es su raza?</FieldLabel>
              <CustomSelect
                value={field.value}
                options={pets}
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={isLoading}
              ></CustomSelect>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="col-start-1 col-end-3 mt-4">
        <Controller
          control={form.control}
          name="pet.isDomestic"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <div className="flex flex-row items-center space-x-3 space-y-0">
                <Checkbox
                  id="car.isPersonalUse"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  className={`data-[state=checked]:bg-kover-widget-primary data-[state=checked]:border-kover-widget-primary ${
                    fieldState.invalid ? 'border-red-500' : 'border-gray-400'
                  }`}
                />
                <label
                  htmlFor="car.isPersonalUse"
                  className="text-sm font-bold text-kover-widget-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Confirmo que es una mascota casera
                </label>
                <CustomTooltip
                  message="Animal que acompaña a los seres humanos en su vida cotidiana, por lo que no son destinados al trabajo."
                  iconClassName="text-kover-widget-primary mt-1"
                ></CustomTooltip>
              </div>

              {fieldState.invalid && (
                <p className="text-sm font-medium text-red-500 ml-1">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
};
