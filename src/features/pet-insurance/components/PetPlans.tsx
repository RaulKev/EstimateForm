import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { Info } from 'lucide-react';
import clsx from 'clsx';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import type { PetEstimateFormDataType } from '../schemas/petInsuranceSchema';

interface PetFormProps {
  form: UseFormReturn<PetEstimateFormDataType>;
}
const plans = [
  {
    value: 'UltraCan',
    name: 'ULTRA CAN',
    price: 1420,
    coverages: [
      { label: 'Enfermedades o accidentes', amount: 80000 },
      { label: 'Esterilización', amount: 10000 },
      { label: 'Parto', amount: 10000 },
      { label: 'Responsabilidad Civil', amount: 100000 },
      { label: 'Hotel Canino', amount: 2500 },
      { label: 'Vacunas', amount: 2000 },
      { label: 'Profilaxis', amount: 3000 },
      { label: 'Grooming', amount: 2500 },
      { label: 'Últimos gastos', amount: 10000 },
    ],
  },
  {
    value: 'MegaCan',
    name: 'MEGA CAN',
    price: 824,
    coverages: [
      { label: 'Enfermedades o accidentes', amount: 75000 },
      { label: 'Responsabilidad Civil', amount: 100000 },
      { label: 'Hotel Canino', amount: 2500 },
      { label: 'Vacunas', amount: 1000 },
      { label: 'Profilaxis', amount: 1000 },
    ],
  },
  {
    value: 'SuperCan',
    name: 'SUPER CAN',
    price: 659,
    coverages: [
      { label: 'Enfermedades o accidentes', amount: 50000 },
      { label: 'Responsabilidad Civil', amount: 100000 },
      { label: 'Hotel Canino', amount: 2500 },
    ],
  },
];

export const PetPlans = ({ form }: PetFormProps) => {
  return (
    <>
      <Controller
        control={form.control}
        name="terms.petPlan"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>¿Qué plan prefiere?</FieldLabel>
            <Accordion type="multiple" className="space-y-4">
              {plans.map((plan) => {
                const isSelected = field.value === plan.value;

                return (
                  <AccordionItem
                    key={plan.value}
                    value={plan.value}
                    className="border-0r"
                  >
                    <div
                      className={clsx(
                        'relative w-full rounded-lg shadow-md transition-all hover:shadow-lg',
                        'flex items-center gap-4 p-4',
                        isSelected
                          ? 'bg-[var(--kover-widget-primary-50)] border-2 border-[var(--kover-widget-primary)]'
                          : 'bg-white border border-gray-200'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => field.onChange(plan.value)}
                        className="flex-1 text-left cursor-pointer"
                      >
                        <h3
                          className={clsx(
                            'text-lg font-bold',
                            isSelected
                              ? 'text-[var(--kover-widget-primary)]'
                              : 'text-gray-700'
                          )}
                        >
                          {plan.name}
                        </h3>
                        <p
                          className={clsx(
                            'text-xl font-semibold mt-1',
                            isSelected
                              ? 'text-[var(--kover-widget-primary)]'
                              : 'text-gray-900'
                          )}
                        >
                          RD${plan.price.toLocaleString()}/MES
                        </p>
                      </button>

                      <AccordionTrigger
                        className={clsx(
                          'flex-shrink-0 p-2 py-0 hover:no-underline',
                          isSelected
                            ? '[&>svg]:text-[var(--kover-widget-primary)]'
                            : '[&>svg]:text-gray-500'
                        )}
                      >
                        <span className="sr-only">Ver coberturas</span>
                      </AccordionTrigger>
                    </div>

                    <AccordionContent className="pt-0 pb-0">
                      <div
                        className={clsx(
                          'mt-2 bg-white border rounded-lg shadow-md',
                          isSelected
                            ? 'border-[var(--kover-widget-primary)]'
                            : 'border-gray-200'
                        )}
                      >
                        <div className="bg-[var(--kover-widget-primary)] text-white px-6 py-3 rounded-t-lg flex items-center gap-2">
                          <Info size={20} />
                          <h4 className="text-sm font-bold">COBERTURAS {plan.name}</h4>
                        </div>
                        <div className="p-6">
                          <div className="space-y-2">
                            {plan.coverages.map((coverage, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                              >
                                <span className="text-gray-700 text-sm">
                                  {coverage.label}
                                </span>
                                <span className="font-semibold text-[var(--kover-widget-primary)] text-sm">
                                  RD${coverage.amount.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};
