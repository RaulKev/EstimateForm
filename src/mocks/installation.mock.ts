export const InstallationTypes = {
  DOMICILIO: 'Visita de un técnico a domicilio',
  CENTRO_ESPECIALIZADO: 'Instalación en un centro especializado',
} as const;

export const installationTypes = [
  'Instalación en un centro especializado',
  'Visita de un técnico a domicilio',
];

export const installationMunicipalities: Record<string, string[]> = {
  'Instalación en un centro especializado': [
    'Santo Domingo',
    'Santo Domingo Este',
    'Santiago',
    'Punta Cana / Bávaro',
    'Puerto Plata',
    'San Francisco de Macoris',
    'La Vega',
    'Alameda'
  ],
  'Visita de un técnico a domicilio': ['Santo Domingo', 'Santo Domingo Este', 'Santiago'],
};

export const municipalityLocations: Record<
  string,
  { location: string; phone: string; schedule?: string }
> = {
  'Santo Domingo': {
    location: 'Av. 27 de Febrero No. 301, Evaristo Morales',
    phone: '(809) 567-8648',
    schedule: 'Lunes a Viernes de 8:30 a.m a 5:30 p.m Sabado: 9:00 a.m a 1:00 p.m',
  },
  'Santo Domingo Este': {
    location: 'C/Bonaire #265, Alma Rosa II, Zona Oriental',
    phone: '(809) 567-8648',
    schedule: 'Lunes a Viernes de 8:30 a.m a 6:00 p.m Sabado: 9:00 a.m a 1:00 p.m',
  },
  Santiago: {
    location: 'Av. Juan Pablo Duarte No. 192, Villa Olga',
    phone: '(809) 567-8648',
    schedule: 'Lunes a Viernes de 8:30 a.m a 6:00 p.m Sabado: 9:00 a.m a 1:00 p.m',
  },
  'Punta Cana / Bávaro': {
    location: 'Montilla Motors, Carretera Barceló Km 2, Bávaro',
    phone: '(809) 567-8648',
    schedule: 'Lunes a Viernes de 9:00 a.m a 5:00 p.m Sabado: 9:00 a.m a 1:00 p.m',
  },
  'Puerto Plata': {
    location: 'Av. Manolo Tavárez Justo No. 70',
    phone: '(809) 567-8648',
    schedule: 'Lunes a Viernes de 8:30 a.m a 6:00 p.m Sabado: 9:00 a.m a 1:00 p.m',
  },
  'San Francisco de Macoris': {
    location: 'Av. Frank Grullón Esq. Villa Olímpica #9',
    phone: '(809) 567-8648',
    schedule: 'Lunes a Viernes de 8:30 a.m a 5:30 p.m Sabado: 9:00 a.m a 1:00 p.m',
  },
  'La Vega': {
    location: 'Av. Pedro A. Rivera #67, Km 1½',
    phone: '(809) 567-8648',
    schedule: 'Lunes a Viernes de 8:30 a.m a 5:30 p.m Sabado: 9:00 a.m a 12:00 p.m',
  },
  'Alameda': {
    location: 'Prol. Av. 27 de Febrero 1055, Santo Domingo',
    phone: '(809) 567-8648',
    schedule: 'Lunes a Viernes de 8:30 a.m a 5:30 p.m Sabado: 9:00 a.m a 1:00 p.m',
  },
};
