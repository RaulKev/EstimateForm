import { SelectCarYear } from './SelectType';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { useEffect, useMemo, useState } from 'react';
import {
    FuelsType,
    type CarListResponse,
    type CarModels,
} from '../../type/types';
import { getCars } from '../../services/car-estimate.service';
import { SelectCarBrand } from './SelectBrandCar';
import { SelectFuelType } from './SelectFuelType';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { Switch } from '@/components/ui/switch';
import { GasAndInstallToggel } from './GasAndInstallToggel';
import { SelectCarModel } from './SelectBrancModel';
import { Input } from '@/components/ui/input';

interface CarFormProps {
    form: UseFormReturn<EstimateFormData>;
}

export function CarForm({ form }: CarFormProps) {
    const [carsList, setCarsList] = useState<CarListResponse[]>([]);
    const [models, setModels] = useState<CarModels[]>([]);

    const actualYear = new Date().getFullYear();
    const years = Array.from({ length: 16 }, (_, i) => actualYear - i);
    const cars = useMemo(() => carsList.map((c) => c.marca), [carsList]);
    const brand = form.watch('car.brand');
    const fuelType = form.watch('car.fuelType');
    const gasEnabled = fuelType === FuelsType.GAS;
    const MIN_WORTH = 200_000;
    const MAX_WORTH = 7_000_000;
    const handleGetModels = (brand: string) => {
        const models =
            carsList.find((car) => car.marca === brand)?.modelos ?? [];
        if (!models) return [];
        setModels(models);
        form.setValue('car.modelId', 0);
        form.clearErrors('car.modelId');
    };

    useEffect(() => {
        getCars().then((cars) => setCarsList(cars));
    }, []);

    return (
        <>
            <div className='space-y-6 animate-in fade-in-50 duration-500'>
                <div className='grid grid-cols-2 gap-4 '>
                    <Controller
                        control={form.control}
                        name='car.brand'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <SelectCarBrand
                                    name={field.name}
                                    value={field.value ?? ''}
                                    items={cars}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        handleGetModels(value);
                                    }}
                                    invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='car.modelId'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <SelectCarModel
                                    name={field.name}
                                    value={
                                        field.value === 0
                                            ? undefined
                                            : String(field.value)
                                    }
                                    items={models}
                                    onValueChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                    invalid={fieldState.invalid}
                                    disabled={!brand}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='car.year'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <SelectCarYear
                                    items={years}
                                    name={field.name}
                                    value={field.value || 0}
                                    onValueChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                    invalid={fieldState.invalid}
                                    disabled={!brand}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <Controller
                        control={form.control}
                        name='car.isNew'
                        render={({ field, fieldState }) => (
                            <label
                                htmlFor='car.isNew'
                                className='cursor-pointer select-none'>
                                <Field
                                    orientation='horizontal'
                                    data-invalid={fieldState.invalid}
                                    className='flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-gray-50 transition-colors'>
                                    <FieldContent>
                                        <FieldLabel htmlFor='car.isNew'>
                                            Vehiculo nuevo
                                        </FieldLabel>
                                        <FieldDescription>
                                            ¿Tu auto es nuevo?
                                        </FieldDescription>
                                    </FieldContent>
                                    <Switch
                                        id='car.isNew'
                                        name={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                        className='bg-indigo-500'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            </label>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='car.isPersonalUse'
                        render={({ field, fieldState }) => (
                            <label
                                htmlFor='car.isPersonalUse'
                                className='cursor-pointer select-none'>
                                <Field
                                    orientation='horizontal'
                                    data-invalid={fieldState.invalid}
                                    className='flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-gray-50 transition-colors'>
                                    <FieldContent>
                                        <FieldLabel htmlFor='form-rhf-complex-emailNotifications'>
                                            Uso Personal
                                        </FieldLabel>
                                        <FieldDescription>
                                            Confirma que es de uso particular
                                        </FieldDescription>
                                    </FieldContent>
                                    <Switch
                                        id='car.isPersonalUse'
                                        name={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                        className='bg-indigo-500'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            </label>
                        )}
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <Controller
                    control={form.control}
                    name='car.fuelType'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='car.fuelType'>
                                Tipo de combustible
                            </FieldLabel>
                            <SelectFuelType
                                name={field.name}
                                value={field.value || ''}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    if (value !== FuelsType.GAS) {
                                        form.setValue('car.gasType', undefined);
                                        form.setValue(
                                            'car.installationType',
                                            undefined
                                        );
                                        form.clearErrors([
                                            'car.gasType',
                                            'car.installationType',
                                        ]);
                                    }
                                }}
                                
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='car.worth'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Valor del vehículo</FieldLabel>
                            <div className='relative w-full'>
                                <Input
                                    type='text'
                                    inputMode='numeric'
                                    placeholder='0.00'
                                    value={field.value || ''}
                                    onChange={(value) => field.onChange(value)}
                                    className='mb-2'
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid ? (
                                    <FieldError errors={[fieldState.error]} />
                                ) : (
                                    <FieldDescription>
                                        Aseguramos vehículos desde{' '}
                                        <span className='font-medium'>
                                            RD$
                                            {MIN_WORTH.toLocaleString('es-DO')}
                                        </span>{' '}
                                        hasta{' '}
                                        <span className='font-medium'>
                                            RD$
                                            {MAX_WORTH.toLocaleString('es-DO')}
                                        </span>
                                        .
                                    </FieldDescription>
                                )}
                            </div>
                        </Field>
                    )}
                />
                {fuelType === FuelsType.GAS && (
                    <GasAndInstallToggel form={form} gasEnabled={gasEnabled} />
                )}
            </div>
        </>
    );
}
