import { Input } from '@/components/ui/input';
import { Documents } from '../../type/types';
import { PersonalPassportForm } from './PersonalPassportForm';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { useCallback } from 'react';
import { MaskedInput } from './MaskedInput';

interface CustomDataFormProps {
    form: UseFormReturn<EstimateFormData>;
}

export const CustomerDataForm = ({ form }: CustomDataFormProps) => {
    const documentType = form.watch('customer.documentType');
    const isPassport = documentType === Documents.PASSPORT;

    const handleChangeDocumentType = useCallback(
        (value: string, fieldOnChange: (v: number | undefined) => void) => {
            const numValue = value === ' ' ? undefined : Number(value);
            fieldOnChange(numValue);
            form.setValue('customer.documentNumber', '');
            form.clearErrors('customer.documentNumber');
            if (numValue === Documents.ID) {
                form.setValue('customer.name', '');
                form.setValue('customer.lastname', '');
                form.setValue('customer.birthDate', '');
                form.setValue('customer.gender', undefined);
                form.clearErrors([
                    'customer.name',
                    'customer.lastname',
                    'customer.birthDate',
                    'customer.gender',
                ]);
            }
        },
        [form]
    );

    return (
        <>
            <div className='grid grid-cols-2 gap-4 '>
                <Controller
                    control={form.control}
                    name='customer.email'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.email'>
                                Correo electronico
                            </FieldLabel>
                            <Input
                                type='text'
                                id={field.name}
                                placeholder='hola@unit.com.do'
                                className='  bg-[#F8FAFC]'
                                {...field}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='customer.phone'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.phone'>
                                Telefono / WhatsApp
                            </FieldLabel>
                            <MaskedInput
                                mask='(###)-###-####'
                                id={field.name}
                                placeholder='(809)-565-5673'
                                className=' bg-[#F8FAFC]'
                                aria-invalid={fieldState.invalid}
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value)}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
            <div className='grid grid-cols-2 gap-4 '>
                <Controller
                    control={form.control}
                    name='customer.documentType'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Documento</FieldLabel>
                            <Select
                                name={field.name}
                                value={
                                    field.value !== undefined
                                        ? String(field.value)
                                        : ''
                                }
                                onValueChange={(value) =>
                                    handleChangeDocumentType(
                                        value,
                                        field.onChange
                                    )
                                }>
                                <SelectTrigger
                                    id='customer.documentType'
                                    aria-invalid={fieldState.invalid}>
                                    <SelectValue placeholder='Tipo de documento' />
                                </SelectTrigger>
                                <SelectContent className='bg-popover z-50'>
                                    <SelectItem value={Documents.ID.toString()}>
                                        Cedula de identidad
                                    </SelectItem>
                                    <SelectItem
                                        value={Documents.PASSPORT.toString()}>
                                        Pasaporte
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='customer.documentNumber'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.documentNumber'>
                                Número de documento
                            </FieldLabel>
                            <MaskedInput
                                mask={
                                    documentType === Documents.ID
                                        ? '###-#######-#'
                                        : ''
                                }
                                id={field.name}
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                placeholder={
                                    documentType === Documents.ID
                                        ? '000-0000000-0'
                                        : documentType === Documents.PASSPORT
                                        ? 'A12345678'
                                        : ''
                                }
                                className=' bg-[#F8FAFC]'
                                aria-invalid={fieldState.invalid}
                                disabled={!documentType}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
            {isPassport && <PersonalPassportForm form={form} />}
        </>
    );
};
