import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { Gas, InstallatationType } from '../../type/types';
interface CarFormProps {
    form: UseFormReturn<EstimateFormData>;
    gasEnabled: boolean;
}
export const GasAndInstallToggel = ({ form, gasEnabled }: CarFormProps) => {
    const btnBase =
        'py-2.5 px-5 rounded-md border-none transition-colors w-full';
    const onCls = 'bg-[#072b73] text-white';
    const offCls = 'bg-gray-300 text-gray-700';
    return (
        <>
            <div className='col-span-1'>
                {/* =============== Tipo de gas =============== */}
                <Controller
                    control={form.control}
                    name='car.gasType'
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className='flex flex-col items-center justify-center gap-4'>
                            <FieldLabel>Tipo de gas</FieldLabel>
                            <div className='grid grid-cols-2 gap-3 w-full'>
                                <Button
                                    type='button'
                                    disabled={!gasEnabled}
                                    aria-pressed={field.value === Gas.GLP}
                                    onClick={() => field.onChange(Gas.GLP)}
                                    className={`${btnBase} ${
                                        field.value === Gas.GLP ? onCls : offCls
                                    } ${
                                        !gasEnabled
                                            ? 'opacity-50 pointer-events-none'
                                            : ''
                                    }`}>
                                    GLP
                                </Button>

                                <Button
                                    type='button'
                                    disabled={!gasEnabled}
                                    aria-pressed={field.value === Gas.GNV}
                                    onClick={() => field.onChange(Gas.GNV)}
                                    className={`${btnBase} ${
                                        field.value === Gas.GNV ? onCls : offCls
                                    } ${
                                        !gasEnabled
                                            ? 'opacity-50 pointer-events-none'
                                            : ''
                                    }`}>
                                    GNV
                                </Button>
                            </div>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
            <div>
                {/* =========== Tipo de instalación =========== */}
                <Controller
                    control={form.control}
                    name='car.installationType'
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className='flex flex-col items-center justify-center gap-4'>
                            <FieldLabel>Tipo de instalación</FieldLabel>
                            <div className='grid grid-cols-2 gap-3 w-full'>
                                <Button
                                    type='button'
                                    disabled={!gasEnabled}
                                    aria-pressed={
                                        field.value ===
                                        InstallatationType.ADAPTED
                                    }
                                    onClick={() =>
                                        field.onChange(
                                            InstallatationType.ADAPTED
                                        )
                                    }
                                    className={`${btnBase} ${
                                        field.value ===
                                        InstallatationType.ADAPTED
                                            ? onCls
                                            : offCls
                                    } ${
                                        !gasEnabled
                                            ? 'opacity-50 pointer-events-none'
                                            : ''
                                    }`}>
                                    Adaptado
                                </Button>

                                <Button
                                    type='button'
                                    disabled={!gasEnabled}
                                    aria-pressed={
                                        field.value ===
                                        InstallatationType.TO_BUILD
                                    }
                                    onClick={() =>
                                        field.onChange(
                                            InstallatationType.TO_BUILD
                                        )
                                    }
                                    className={`${btnBase} ${
                                        field.value ===
                                        InstallatationType.TO_BUILD
                                            ? onCls
                                            : offCls
                                    } ${
                                        !gasEnabled
                                            ? 'opacity-50 pointer-events-none'
                                            : ''
                                    }`}>
                                    De fábrica
                                </Button>
                            </div>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
        </>
    );
};
