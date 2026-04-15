import { SelectCarYear } from './SelectType';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { useEffect, useState, type ChangeEvent } from 'react';
import {
  FuelsType,
  Gas,
  InstallatationType,
  type CarListResponse,
  type CarModels,
} from '../../type/types';
import { SelectFuelType } from './SelectFuelType';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { SelectCarModel } from './SelectBrancModel';
import { Input } from '@/components/ui/input';
import { SelectBrandCar } from './SearchBrandCar';
import { Checkbox } from '@/components/ui/checkbox';
import { formatNumber } from '@/utils';

import { CustomSelect } from '@/shared/CustomSelected';
import { RequerimentsAdaptedInstallationType } from './RequirementAdaptedInstallationType';
import { CustomTooltip } from '@/shared/CustomTooltip';
import { ComplementsCar } from './complements/ComplementsCar';
import {
  ComplementsDetailsCar,
  type AddedComplement,
} from './complements/ComplementsDetailsCar';

interface CarFormProps {
  form: UseFormReturn<EstimateFormData>;
}
const boolOptions = [
  { value: 'true', label: 'Sí' },
  { value: 'false', label: 'No' },
];
const gasOptions = [
  { value: Gas.GLP, label: 'GLP' },
  { value: Gas.GNV, label: 'GNV' },
];
const installationOptions = [
  {
    value: InstallatationType.ADAPTED,
    label: 'Adaptado',
  },
  { value: InstallatationType.TO_BUILD, label: 'De fabrica' },
];
export function CarForm({ form }: CarFormProps) {
  const [models, setModels] = useState<CarModels[]>([]);
  const [selected, setSelected] = useState<boolean>(false);
  const [complements, setComplements] = useState<AddedComplement[]>([]);

  const actualYear = new Date().getFullYear() + 1;
  const years = Array.from({ length: 17 }, (_, i) => actualYear - i);
  const brand = form.watch('car.brand');
  const fuelType = form.watch('car.fuelType');
  const installationType = form.watch('car.installationType');
  const currentWorth = form.watch('car.worth') || 0;
  const gasEnabled = fuelType === FuelsType.GAS;
  const MIN_WORTH = 200_000;
  const MAX_WORTH = 7_000_000;
  const handleGetModels = (brand: string, rawCarList: CarListResponse[]) => {
    const models = rawCarList.find((car) => car.marca === brand)?.modelos ?? [];
    if (!models) return [];
    setModels(models);
    form.setValue('car.modelId', 0);
    form.clearErrors('car.modelId');
  };

  const handleWorthChange = (
    e: ChangeEvent<HTMLInputElement> | string,
    onChange: (value: number | '') => void
  ) => {
    const rawValue = typeof e === 'string' ? e : e.target.value;
    const cleanValue = rawValue.replace(/[^0-9.]/g, '');
    onChange(cleanValue === '' ? '' : Number(cleanValue));
  };
  useEffect(() => {
    const totalComplements = complements.reduce((acc, c) => acc + c.value, 0);
    const MAX_LIMIT = 7_000_000;
    if (currentWorth + totalComplements > MAX_LIMIT) {
      form.setError('car.worth', {
        type: 'manual',
        message: `El valor del vehículo y aditamentos supera el límite de RD$ ${MAX_LIMIT.toLocaleString('es-DO')}`,
      });
    } else {
      if (form.formState.errors.car?.worth?.type === 'manual') {
        form.clearErrors('car.worth');
      }
    }
  }, [complements, currentWorth, form]);

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 ">
        <Controller
          control={form.control}
          name="car.brand"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.brand">Marca</FieldLabel>
              <SelectBrandCar
                field={field}
                handelGetModels={handleGetModels}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.modelId"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.modelId">Modelo</FieldLabel>
              <SelectCarModel
                field={field}
                items={models}
                invalid={fieldState.invalid}
                disabled={!brand}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.year"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.year">Año</FieldLabel>
              <SelectCarYear
                items={years}
                name={field.name}
                value={field.value || 0}
                onValueChange={(value) => field.onChange(Number(value))}
                invalid={fieldState.invalid}
                disabled={!brand}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.isNew"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.isNew">Cero km</FieldLabel>
              <CustomSelect
                placeholder="¿Es nuevo?"
                name={field.name}
                value={
                  field.value !== undefined && field.value !== null
                    ? String(field.value)
                    : ''
                }
                options={boolOptions}
                onValueChange={(val) => field.onChange(val === 'true')}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.fuelType"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.fuelType">Combustible</FieldLabel>
              <SelectFuelType
                name={field.name}
                value={field.value || ''}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value !== FuelsType.GAS) {
                    form.setValue('car.gasType', undefined);
                    form.setValue('car.installationType', undefined);
                    form.setValue('car.meetsRequirements', undefined);
                    form.clearErrors(['car.gasType', 'car.installationType']);
                  }
                }}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* 6. TIPO DE GAS (Renderizado Condicional INTEGRADO en el Grid) */}
        {fuelType === FuelsType.GAS && (
          <Controller
            control={form.control}
            name="car.gasType"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Tipo de gas</FieldLabel>
                <CustomSelect
                  placeholder="Selecciona el tipo de gas"
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!gasEnabled}
                  invalid={fieldState.invalid}
                  options={gasOptions}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )}

        {/* 7. TIPO DE INSTALACIÓN (Renderizado Condicional INTEGRADO en el Grid) */}
        {fuelType === FuelsType.GAS && (
          <Controller
            control={form.control}
            name="car.installationType"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Tipo de instalación</FieldLabel>
                <CustomSelect
                  placeholder="Seleccione el tipo de instalación"
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!gasEnabled}
                  invalid={fieldState.invalid}
                  options={installationOptions}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )}
        {installationType === InstallatationType.ADAPTED && (
          <RequerimentsAdaptedInstallationType form={form} />
        )}
        {/* 8. VALOR DEL VEHÍCULO */}
        <Controller
          control={form.control}
          name="car.worth"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.worth">Valor del vehículo</FieldLabel>
              <div className="relative w-full">
                <Input
                  type="text"
                  id="car.worth"
                  inputMode="numeric"
                  placeholder="0.00"
                  value={field.value ? formatNumber(field.value) : ''}
                  onChange={(e) => handleWorthChange(e, field.onChange)}
                  className="mb-2 pl-10"
                  aria-invalid={fieldState.invalid}
                />
                <span
                  className={`pointer-events-none absolute left-3 top-0 flex h-10 items-center text-sm ${
                    fieldState.invalid ? 'text-red-500' : 'text-muted-foreground'
                  }`}
                >
                  RD$
                </span>
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Desde{' '}
                    <span className="font-medium">
                      RD$ {MIN_WORTH.toLocaleString('es-DO')}
                    </span>{' '}
                    hasta{' '}
                    <span className="font-medium">
                      RD$ {MAX_WORTH.toLocaleString('es-DO')}
                    </span>
                  </FieldDescription>
                )}
              </div>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.isZeroDeductible"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-1">
                <FieldLabel htmlFor="car.isZeroDeductible">
                  ¿Desea Cero Deducible?{' '}
                </FieldLabel>
                <CustomTooltip
                  message="Con cero deducible, no tendrás que pagar ningún deducible en caso de siniestro."
                  iconClassName="text-kover-widget-primary mt-1"
                />
              </div>
              <CustomSelect
                placeholder="¿Desea Cero Deducible?"
                name={field.name}
                value={
                  field.value !== undefined && field.value !== null
                    ? String(field.value)
                    : ''
                }
                onValueChange={(val) => field.onChange(val === 'true')}
                invalid={fieldState.invalid}
                options={boolOptions}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex flex-col flex-1 justify-center min-w-0">
          <FieldLabel className="mb-3 flex items-center gap-2">
            ¿Desea incluir algún aditamento?
            <CustomTooltip
              message="Los aditamentos son accesorios adicionales instalados en tu vehículo que deseas asegurar."
              iconClassName="text-kover-widget-primary text-blue-900"
            />
          </FieldLabel>
          <ComplementsCar
            complements={complements}
            setSelected={setSelected}
            selected={selected}
            setComplements={setComplements}
          />

          {complements.length > 0 && !selected && (
            <div className="mt-4 flex flex-col items-center gap-2 text-center text-slate-700">
              <p className="text-sm font-medium">
                {complements.length} aditamento(s) agregado(s) - Total: RD$
                {complements.reduce((sum, c) => sum + c.value, 0).toLocaleString('es-DO')}
              </p>
              <button
                type="button"
                onClick={() => setSelected(true)}
                className="text-kover-widget-primary font-medium hover:underline text-sm"
              >
                Gestionar aditamentos
              </button>
            </div>
          )}
        </div>

        <div className="col-span-full mt-4">
          {selected && (
            <ComplementsDetailsCar
              complements={complements}
              setComplements={setComplements}
              onClose={() => setSelected(false)}
            />
          )}
        </div>
      </div>

      <div className="col-span-full mt-4">
        <Controller
          control={form.control}
          name="car.isPersonalUse"
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
                  Por favor, confirme que es de uso particular y no deportivo ni de uso
                  público/comercial.
                </label>
              </div>

              {/* Mensaje de error justo debajo si no lo marcan */}
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
}
