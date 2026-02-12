import { CustomTooltip } from '@/shared/CustomTooltip';
import { XCircle, FileText } from 'lucide-react';

interface ExclusionItem {
  text: string;
}

interface ConsiderationItem {
  title: string;
  tooltip?: string;
  items?: string[];
  description?: string;
}

interface PetInsuranceExclusionsProps {
  exclusions?: ExclusionItem[][];
  considerations?: ConsiderationItem[];
}

const defaultExclusions: ExclusionItem[][] = [
  [
    {
      text: 'Perros usados para funciones de guardia civil, seguridad privada o pública o actividades de la policía.',
    },
  ],
  [
    {
      text: 'Razas catalogadas como potencialmente peligrosas, incluyendo: Dóberman, Pit Bull, Rottweiler, Staffordshire, Mastín Napolitano, Dogo, Tosa Japonés, De Presa Canario y Fila Brasileiro.',
    },
  ],
];

const defaultConsiderations: ConsiderationItem[] = [
  {
    title: 'Período de carencia:',
    tooltip: 'El período que deberá transcurrir para poder hacer un reclamo',
    items: [
      '60 días calendario para enfermedad',
      '7 días calendario para accidente',
      '60 días calendario para hotel',
      '90 días calendario para vacunas y profilaxis',
      '180 días calendario para esterilización',
      '180 días calendario para parto',
      '90 días calendario para grooming',
    ],
  },
  {
    title: 'Edad de aceptación: 6 meses a 8 años (con cobertura hasta 10 años).',
  },
  {
    title: 'Período de gracia: 10 días calendario.',
    tooltip:
      'Es el plazo de días calendario que tienes como asegurado para realizar el pago de tu prima, de acuerdo con la forma de pago pactada al momento de la contratación.',
  },
  {
    title: 'Aviso de Accidente: 30 días calendario.',
  },
  {
    title: 'Prescripción: 2 años.',
    tooltip:
      'Es el tiempo máximo, posterior a que se haya presentado un siniestro, después del cual no podrá establecerse ninguna reclamación o acción legal contra Unit.',
  },
  {
    title: 'Disputabilidad: Durante la vigencia del contrato.',
    tooltip:
      'El tiempo que posee Unit para investigar y verificar que la información que proporcionaste es verídica',
  },
];

export const PetInsuranceExclusions = ({
  exclusions = defaultExclusions,
  considerations = defaultConsiderations,
}: PetInsuranceExclusionsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-kover-widget-primary mb-4">
          Exclusiones (Principales)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exclusions.map((column, colIndex) => (
            <div key={colIndex} className="space-y-3">
              {column.map((exclusion, itemIndex) => (
                <div key={itemIndex} className="flex gap-3">
                  <XCircle className="h-5 text-gray-400 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {exclusion.text}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-kover-widget-primary mb-4">Consideraciones</h4>

        <div className="space-y-3">
          {considerations.map((consideration, index) => (
            <div key={index} className="flex gap-3">
              <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />

              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <p className="text-sm text-gray-700 flex-1">{consideration.title}</p>
                  {consideration.tooltip && (
                    <CustomTooltip message={consideration.tooltip} />
                  )}
                </div>

                {consideration.items && consideration.items.length > 0 && (
                  <ul className="mt-2 ml-4 space-y-1.5">
                    {consideration.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-xs text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-kover-widget-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {consideration.description && (
                  <p className="text-xs text-gray-600 mt-2 ml-4">
                    {consideration.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
