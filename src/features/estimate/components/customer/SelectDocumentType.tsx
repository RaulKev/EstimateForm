import { IdCard, Globe } from 'lucide-react';
import { Documents } from '../type/types';
import clsx from 'clsx';

type DocButtonCardsProps = {
    value?: Documents;
    onChange: (val: Documents) => void;
};

export function SelectdocumentType({ value, onChange }: DocButtonCardsProps) {
    const base =
        'h-30 w-full rounded-md shadow-lg transition hover:shadow-2xl shadow-blue-100';
    return (
        <div
            role='radiogroup'
            className='grid grid-cols-1 gap-5 md:grid-cols-2 '>
            <button
                type='button'
                role='radio'
                aria-checked={value === Documents.ID}
                onClick={() => onChange(Documents.ID)}
                className={clsx(
                    base,
                    value === Documents.ID
                        ? 'bg-[#072b73] text-white'
                        : 'border text-blue-900'
                )}>
                <div className='flex h-full w-full flex-col items-center justify-center gap-3'>
                    <div className='rounded-2xl p-3 bg-blue-50/20'>
                        <IdCard size={36} />
                    </div>
                    <span className='text-lg font-semibold'>Cédula</span>
                </div>
            </button>

            <button
                type='button'
                role='radio'
                aria-checked={value === Documents.PASSPORT}
                onClick={() => onChange(Documents.PASSPORT)}
                className={clsx(
                    base,
                    value === Documents.PASSPORT
                        ? 'bg-[#072b73] text-white'
                        : 'border text-blue-900'
                )}>
                <div className='flex h-full w-full flex-col items-center justify-center gap-3'>
                    <div className='rounded-2xl p-3 bg-blue-50/20'>
                        <Globe size={36} />
                    </div>
                    <span className='text-lg font-semibold'>Pasaporte</span>
                </div>
            </button>
        </div>
    );
}
