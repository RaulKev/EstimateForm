import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import type { Occupations } from '../../type/types';
import { OcuppationInput } from './OcuppationSelect';
import { getOccupations } from '../../services/ocupation.service';
import { Switch } from '@/components/ui/switch';
import { PoliticalExposeData } from './PoliticalExposeData';
import { CustomSelect } from '@/shared/components/CustomSelected';

import type { MixedAdditionalDataFormData } from '../../schemas/additionalDataSchema';
import { useMunicipio, useProvince, useSector } from '../../hook/useAddress';
interface AddressFormProps {
  form: UseFormReturn<MixedAdditionalDataFormData>;
}

export const AddressForm = ({ form }: AddressFormProps) => {
  // Observadores del estado del formulario
  const selectedProvince = form.watch('customer.address.province');
  const selectedMunicipality = form.watch('customer.address.municipality');
  const politicallyExposed = form.watch('customer.dueDiligence.politicallyExposed');

  const { provinces } = useProvince();
  const { municipalities, isLoading: loadingMunis } = useMunicipio(selectedProvince);
  const { sector, isLoading, isError } = useSector(
    selectedProvince ?? '',
    selectedMunicipality ?? ''
  );

  const [occupation, setOccupation] = useState<Occupations[]>([]);

  const hasSectors = sector && sector.length > 0;

  const showInput = !isLoading && selectedMunicipality && (!hasSectors || isError);

  useEffect(() => {
    const occupations = getOccupations();
    setOccupation(occupations);
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-kover-widget-primary">
            Información Laboral
          </h3>
        </div>

        <Controller
          control={form.control}
          name="customer.occupation"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="customer.occupation">Ocupación</FieldLabel>
              <OcuppationInput
                name={field.name}
                value={field.value === '' ? undefined : String(field.value)}
                onValueChange={field.onChange}
                items={occupation}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-kover-widget-primary">
            Declaraciones y Requisitos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name="customer.dueDiligence.politicallyExposed"
            render={({ field, fieldState }) => (
              <label
                htmlFor="customer.politicallyExposed"
                className="cursor-pointer select-none"
              >
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-slate-50 transition-colors"
                >
                  <FieldContent>
                    <FieldLabel htmlFor="customer.politicallyExposed">
                      ¿Estás políticamente expuesto?
                    </FieldLabel>
                    <FieldDescription>
                      Tengo funciones públicas destacadas
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="customer.politicallyExposed"
                    name={field.name}
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="bg-kover-widget-primary"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              </label>
            )}
          />
          <Controller
            control={form.control}
            name="customer.requiresFiscalReceipt"
            render={({ field, fieldState }) => (
              <label
                htmlFor="customer.requiresFiscalReceipt"
                className="cursor-pointer select-none"
              >
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-slate-50 transition-colors"
                >
                  <FieldContent>
                    <FieldLabel htmlFor="customer.requiresFiscalReceipt">
                      ¿Requieres comprobante fiscal?
                    </FieldLabel>
                    <FieldDescription>Requiero factura con NCF</FieldDescription>
                  </FieldContent>
                  <Switch
                    id="customer.requiresFiscalReceipt"
                    name={field.name}
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="bg-kover-widget-primary"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              </label>
            )}
          />
        </div>

        {politicallyExposed && <PoliticalExposeData form={form} />}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-kover-widget-primary">
            Dirección de residencia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Controller
              control={form.control}
              name="customer.address.street"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-4">
                  <FieldLabel htmlFor="customer.address.street">
                    Calle y número
                  </FieldLabel>
                  <Input
                    type="text"
                    id="customer.address.street"
                    placeholder="Ej.: Calle Principal #123, Edificio Torre"
                    className="bg-[#F8FAFC]"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="customer.address.referencePoint"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Edificio</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Edificio"
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="customer.address.province"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="address.province">Provincia</FieldLabel>
                {/* <CustomSelect /> */}
                <Select
                  name={field.name}
                  value={field.value || ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('customer.address.municipality', '');
                    form.setValue('customer.address.sector', '');
                    form.clearErrors([
                      'customer.address.municipality',
                      'customer.address.sector',
                    ]);
                  }}
                >
                  <SelectTrigger
                    id="address.province"
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}
                    className="data-[invalid=true]:border-red-500 bg-[#F8FAFC]"
                  >
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 h-52">
                    {provinces.map((prov) => (
                      <SelectItem key={prov.id} value={prov.name}>
                        {prov.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="customer.address.municipality"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="customer.address.municipality">Municipio</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value || ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('customer.address.sector', '');
                    form.clearErrors(['customer.address.sector']);
                  }}
                  disabled={!selectedProvince || loadingMunis}
                >
                  <SelectTrigger
                    id="address.municipality"
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}
                    className="data-[invalid=true]:border-red-500 bg-[#F8FAFC]"
                  >
                    <SelectValue placeholder="Selecciona un municipio" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {municipalities?.map((muni) => (
                      <SelectItem key={muni.id} value={muni.name}>
                        {muni.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="md:col-span-2">
            <Controller
              control={form.control}
              name="customer.address.sector"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer.address.sector">Sector</FieldLabel>
                  {showInput ? (
                    <Input
                      type="text"
                      id="customer.address.sector"
                      placeholder="Escribe el sector"
                      className="bg-[#F8FAFC]"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                  ) : (
                    <CustomSelect
                      options={sector?.map((s) => ({
                        value: s.name,
                        label: s.name,
                      }))}
                      value={field.value || ''}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      disabled={!selectedMunicipality || isLoading}
                      placeholder="Selecciona un sector"
                    />
                  )}
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
