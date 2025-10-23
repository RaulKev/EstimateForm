import type { EstimateFormData } from '../config/EstimeFormConfig';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type AssistantFormProps = {
    form: UseFormReturn<EstimateFormData>;
};

export const AssistantForm = ({ form }: AssistantFormProps) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleYesClick = () => {
        setSelected('yes');
        console.log('Usuario seleccionó: Sí');
    };

    const handleNoClick = () => {
        setSelected('no');
        console.log('Usuario seleccionó: No');
    };

    return (
        <div>
            <h4>Asistencia vehicular</h4>
            <p className='text-center text-gray-700 mb-8 font-medium'>
                ¿Deseas contar con ayuda 24/7?
            </p>
            <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                <Button
                    onClick={handleYesClick}
                    className='flex-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-6 px-8 rounded-full text-lg transition-all duration-200 shadow-md hover:shadow-lg'
                    size='lg'>
                    ¡Por Supuesto!
                </Button>
                <Button
                    onClick={handleNoClick}
                    variant='outline'
                    className='flex-1 bg-white hover:bg-gray-50 text-blue-900 font-semibold py-6 px-8 rounded-full border-2 border-gray-300 text-lg transition-all duration-200'
                    size='lg'>
                    No, gracias
                </Button>
            </div>
        </div>
    );
};
