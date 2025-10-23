import { CustomerDataForm } from './customer/CustomerDataForm';
import { CarForm } from './car/CarForm';
import { LawInsuranceForm } from './LawInsuranceForm';
import { AssistantForm } from './AssistantForm';
import { ReplaceCar } from './ReplaceCar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    initialValues,
    schemaEstimate,
    type EstimateFormData,
} from '../config/EstimeFormConfig';
import { Separator } from '@/components/ui/separator';
import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { CSSProperties } from 'react';
import { generateInsurance } from '../services/car-estimate.service';

export const EstimateForm = () => {
    const form = useForm<EstimateFormData>({
        resolver: yupResolver(schemaEstimate),
        defaultValues: initialValues,
        mode: 'onChange', 
        reValidateMode: 'onChange', 
    });
    const {
        formState: { isValid, isSubmitting },
    } = form;

    const onSubmit = async (data: EstimateFormData) => {
        form.reset();
        const response = await generateInsurance(data);
        console.log(response);
        // toast('You submitted the following values:', {
        //     description: (
        //         <pre className='bg-indigo-50 text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
        //             <code>{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        //     position: 'bottom-right',
        //     classNames: {
        //         content: 'flex flex-col gap-2',
        //     },
        //     style: {
        //         '--border-radius': 'calc(var(--radius)  + 4px)',
        //     } as CSSProperties,
        // });
    };

    const canSubmit = isValid && !isSubmitting;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <div className='flex flex-col gap-8 max-w-4xl'>
                    <div className='space-y-6 animate-in fade-in-50 duration-500'>
                        <h4 className=' font-bold text-blue-700 mb-6'>
                            Información de contacto
                        </h4>
                        <CustomerDataForm form={form} />
                    </div>
                    <Separator />
                    <div className='space-y-6 animate-in fade-in-50 duration-500'>
                        <h4 className=' font-bold text-blue-700 mb-6'>
                            Datos del Vehículo
                        </h4>
                        <CarForm form={form} />
                    </div>
                    <Separator />
                    <div className='space-y-6 animate-in fade-in-50 duration-500'>
                        <h4 className=' font-bold text-blue-700 mb-6'>
                            Planes de seguros
                        </h4>
                        <LawInsuranceForm form={form} />
                    </div>
                    <Separator />
                    <div className='space-y-6 animate-in fade-in-50 duration-500'>
                        <h4 className=' font-bold text-blue-700 mb-6'>
                            Asistencia Vehcular
                        </h4>
                        <AssistantForm form={form} />
                    </div>
                    <div className='space-y-6 animate-in fade-in-50 duration-500'>
                        <h4 className=' font-bold text-blue-700 mb-6'>
                            Auto sustituto
                        </h4>
                        <ReplaceCar form={form} />
                    </div>
                    <Button
                        type='submit'
                        disabled={!canSubmit}
                        className={`
                                h-12 px-12 text-lg rounded-md shadow-md transition-all
                                ${
                                    canSubmit
                                        ? 'bg-orange-500 hover:bg-orange-600 hover:shadow-xl cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                                }
                            `}>
                        {isSubmitting ? 'ENVIANDO...' : 'COTIZAR'}
                    </Button>
                </div>

            </FieldGroup>
        </form>
    );
};
