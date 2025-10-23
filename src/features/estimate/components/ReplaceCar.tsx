import { ReplacementsCar } from "../type/types";

type Plan = {
    id: ReplacementsCar;
    title: string;
    price: string;
    summary: string;
};

const REPLACEMENT_CAR: Plan[] = [
    {
        id: ReplacementsCar.UBER,
        title: 'UBER',
        price: 'RD$4,962/mes',
        summary: 'Seguro de Ley con cobertura de $500/$500/$1MM.',
    },
    {
        id: ReplacementsCar.RENT_A_CAR,
        title: 'Plus',
        price: 'RD$5,495/mes',
        summary: 'Cobertura extendida, asistencia, grúa, cristales.',
    },
    {
        id: ReplacementsCar.NONE,
        title: 'No, gracias',
        price: 'RD$7,022/mes',
        summary: 'Tope superior de responsabilidad y extras.',
    },
];
export const ReplaceCar = () => {
    return (
        <div className='space-y-6 animate-in fade-in-50 duration-500'>
            <h4 className=' font-bold text-blue-700 mb-6'>Auto sustituto</h4>
            <div></div>
        </div>
    );
};
