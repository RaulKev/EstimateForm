import type { Insurance } from '@/mocks/request.mock';
import { useState } from 'react';
import { EstimateForm } from './EstimateForm';
import Emitir from './Emitir';
import { toast } from 'sonner';

type FlowStep = 'estimate' | 'emit';

export const EstimateFlow = () => {
    const [currentStep, setCurrentStep] = useState<FlowStep>('estimate');
    const [insuranceData, setInsuranceData] = useState<Insurance | null>(null);

    const handleEstimateSuccess = (data: Insurance) => {
        setInsuranceData(data);
        setCurrentStep('emit');
    };

    const handleBack = () => {
        setCurrentStep('estimate');
    };

    const handleEmit = () => {
        toast.success('Póliza emitida exitosamente!', {
            description: `Póliza N° ${
                insuranceData?.policyNumber || 'PENDING'
            }`,
        });
        // Aquí podrías hacer otra llamada al servicio o redirigir
        console.log('Emitiendo póliza con datos:', insuranceData);
    };
    return (
        <>
            {currentStep === 'estimate' && (
                <EstimateForm onSuccess={handleEstimateSuccess} />
            )}

            {currentStep === 'emit' && insuranceData && (
                <Emitir
                    onBack={handleBack}
                    onEmit={handleEmit}
                />
            )}
        </>
    );
};
