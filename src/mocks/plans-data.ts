export const InsurancePlansData = [
  {
    coverage: 'Daño a propiedad ajena',
    basico: 'RD$ 500,000',
    plus: 'RD$ 1,000,000',
    autoExceso: 'special',
    autoExcesoPlus:'special'
  },
  {
    coverage: 'R.C. Terceros - Una persona',
    basico: 'RD$ 500,000',
    plus: 'RD$ 1,000,000',
    autoExceso: 'special',
  },
  {
    coverage: 'R.C. Terceros - Más de una persona',
    basico: 'RD$ 1,000,000',
    plus: 'RD$ 2,000,000',
    autoExceso: 'special',
    autoExcesoPlus:'special'
  },
  {
    coverage: 'R.C. Un pasajero',
    basico: 'RD$ 500,000',
    plus: 'RD$ 1,000,000',
    autoExceso: 'special',
    autoExcesoPlus:'special'
  },
  {
    coverage: 'R.C. Más de un pasajero',
    basico: 'RD$ 1,000,000',
    plus: 'RD$ 2,000,000',
    autoExceso: 'special',
    autoExcesoPlus:'special'
  },
  {
    coverage: 'Riesgos del Conductor',
    basico: 'RD$ 100,000',
    plus: 'RD$ 100,000',
    autoExceso: 'RD$ 100,000',
    autoExcesoPlus:'RD$ 100,000'
  },
  {
    coverage: 'Servicios de Fianza Judicial',
    basico: 'RD$ 1,000,000',
    plus: 'RD$ 1,000,000',
    autoExceso: 'RD$ 1,000,000',
    'autoExceso+':'RD$ 1,000,000'
  },
  {
    coverage: 'Casa del Conductor',
    basico: 'Incluido',
    plus: 'Incluido',
    autoExceso: 'Incluido',
    autoExcesoPlus:'Incluido'
  },
];
export const ESPECIAL_DATA = {
  specialCell: {
    text: 'RD$5 millones en exceso sobre las coberturas del Plan Plus.',
    rowspan: 5,
  },
  specialCellAutoExcesoPlus: {
    text: 'RD$10 millones en exceso sobre las coberturas del Plan Plus.',
    rowspan: 5,
  },
};
export const InsurancePlansHeader = ['Básico', 'Plus', 'Auto Exceso','Auto Exceso+'];
