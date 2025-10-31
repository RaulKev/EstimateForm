import type { EstimateFormData } from '../config/EstimeFormConfig';
import { Controller, type UseFormReturn } from 'react-hook-form';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

type AssistantFormProps = {
    form: UseFormReturn<EstimateFormData>;
};

export const AssistantForm = ({ form }: AssistantFormProps) => {
    return (
        <div className='flex flex-col justify-center gap-4'>
            <div className='flex items-start'>
                <Controller
                    control={form.control}
                    name='car.terms.vehicleAssistance'
                    render={({ field, fieldState }) => (
                        <label
                            htmlFor='car.term.vehicleAssistanceSwitch'
                            className='w-full cursor-pointer select-none'>
                            <Field
                                orientation='horizontal'
                                data-invalid={fieldState.invalid}
                                className='flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-gray-50 transition-colors'>
                                <FieldContent>
                                    <FieldLabel
                                        htmlFor='car.term.vehicleAssistanceSwitch'
                                        className='cursor-pointer'>
                                        Contratar asistencia 24/7
                                    </FieldLabel>
                                    <FieldDescription>
                                        Ayuda inmediata en caso de emergencia en
                                        carretera
                                    </FieldDescription>
                                </FieldContent>
                                <Switch
                                    id='car.term.vehicleAssistanceSwitch'
                                    name={field.name}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                    className='bg-indigo-500'
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        </label>
                    )}
                />
            </div>
            <div className='bg-indigo-50 p-4 rounded-md'>
                <h4 className='text-center mb-4 '>
                    Por tan solo <br />
                    RD$238/MENSUAL
                </h4>
                <p className='font-medium mb-3 text-gray-700'>
                    Ayuda en caso que requieras:
                </p>
                <ul className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm'>
                    <li>• Avería mecánica ligera</li>
                    <li>• Remolque</li>
                    <li>• Cambio de neumático</li>
                    <li>• Cerrajería vehícular</li>
                    <li>• Envío de combustible</li>
                </ul>
            </div>
        </div>
    );
};
