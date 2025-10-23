import {
    CarInsurances,
    ReplacementsCar,
    type RequestUnit,
} from '../type/types';
import { CustomerDataForm } from './customer/CustomerDataForm';
import { CarForm } from './car/CarForm';
import { Button } from '@/components/ui/button';
import { LawInsuranceForm } from './LawInsuranceForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    initialValues,
    schemaEstimate,
    type EstimateFormData,
} from '../config/EstimeFormConfig';
import { AssistantForm } from './AssistantForm';
import { Separator } from '@/components/ui/separator';
import { FieldGroup } from '@/components/ui/field';

export const EstimateForm = () => {
    const form = useForm<EstimateFormData>({
        resolver: yupResolver(schemaEstimate),
        defaultValues: initialValues,
        mode: 'onSubmit',
    });

    const onSubmit = (data: EstimateFormData) => {
        console.log('Submit completo:', data);
    };

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
                    {/* 
                        selected={formData.car.terms.insuranceType}
                        onSelect={(plan) =>
                            setFormData((s) => ({
                                ...s,
                                car: {
                                    ...s.car,
                                    terms: {
                                        ...s.car.terms,
                                        insuranceType: plan,
                                    },
                                },
                            }))
                        }
                    /> */}
                    <Separator />
                    <AssistantForm form={form} />
                    <Button
                        type='submit'
                        className='bg-orange-500 hover:bg-orange-600 h-10 px-10 text-lg rounded-md shadow-md hover:shadow-xl cursor-pointer'>
                        COTIZAR
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
};
