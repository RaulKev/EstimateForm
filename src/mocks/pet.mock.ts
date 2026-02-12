import type { PetPlans } from "@/features/pet-insurance/types/insurance.type";

export const petBreeds = [
  { label: 'Airedale Terrier', value: '1' },
  { label: 'Akita', value: '2' },
  { label: 'Akita Americano', value: '3' },
  { label: 'Alaskan Husky', value: '4' },
  { label: 'Alaskan Malamute', value: '5' },
];

export const petPlans = [
  { label: 'Ultra can', value: 'UltraCan' },
  { label: 'Mega can', value: 'MegaCan' },
  { label: 'Super can', value: 'SuperCan' },
];

export interface BenefitItem {
  title: string;
  amount?: string;
}

export const petPlansBenefits: Record<PetPlans, BenefitItem[][]> = {
  UltraCan: [
    [
      {
        title: 'Emergencia por enfermedad o accidente',
        amount: 'RD$80,000',
      },
      {
        title: 'Esterilización',
        amount: 'RD$10,000',
      },
      {
        title: 'Parto',
        amount: 'RD$10,000',
      },
      {
        title: 'Responsabilidad civil',
        amount: 'RD$100,000',
      },
      {
        title: 'Hotel Canino',
        amount: 'RD$2,500',
      },
    ],
    [
      {
        title: 'Vacunas',
        amount: 'RD$2,000',
      },
      {
        title: 'Profilaxis',
        amount: 'RD$3,000',
      },
      {
        title: 'Grooming',
        amount: 'RD$2,500',
      },
      {
        title: 'Últimos gastos',
        amount:
          'Hasta RD$10,000 por reembolso. (Aplica cuando la vigencia de la póliza esta saldada en su totalidad )',
      },
      {
        title: 'Cancelación sin penalidad',
      },
    ],
  ],
  MegaCan: [
    [
      {
        title: 'Emergencia por enfermedad o accidente',
        amount: 'RD$75,000',
      },
      {
        title: 'Responsabilidad civil',
        amount: 'RD$100,000',
      },
      {
        title: 'Hotel Canino',
        amount: 'RD$2,500',
      },
    ],
    [
      {
        title: 'Vacunas',
        amount: 'RD$1,000',
      },
      {
        title: 'Profilaxis',
        amount: 'RD$1,000',
      },
      {
        title: 'Cancelación sin penalidad',
      },
    ],
  ],
  SuperCan: [
    [
      {
        title: 'Emergencia por enfermedad o accidente',
        amount: 'RD$75,000',
      },
      {
        title: 'Responsabilidad civil',
        amount: 'RD$100,000',
      },
      {
        title: 'Hotel Canino',
        amount: 'RD$2,500',
      },
    ],
    [
      {
        title: 'Cancelación sin penalidad',
      },
    ],
  ],
};

export const insurancePetData = {
  companyId: '691c8caf6d186e46500cbc3e',
  product: 'pet-insurance',
  status: 'quoted',
  customer: {
    firstName: 'María',
    lastName: 'González',
    gender: 'F',
    documentType: 'Cedula',
    documentNumber: '402-2004330-7',
    phone: '8091234567',
    email: 'maria.gonzalez@email.com',
    occupation: 'Vendedor o Comerciante',
    address: {
      province: 'Distrito Nacional / Santo Domingo',
      municipality: 'Santo Domingo de Guzmán',
      sector: 'Santo Domingo',
      street: 'Calle de la República',
      _id: '6970f6c92c832aca38f4c747',
    },
    requiresFiscalReceipt: false,
    _id: '6970f6c92c832aca38f4c746',
  },
  pet: {
    name: 'hugo',
    birthYear: 2025,
    age: 1,
    raceId: 2,
    isDomestic: true,
    _id: '6970f6c92c832aca38f4c748',
  },
  terms: {
    paymentFraction: 'M',
    petPlan: 'MegaCan',
    premium: 710.1264,
    tax: 113.6202,
    totalAmount: 824,
    _id: '6970f6c92c832aca38f4c749',
  },
  requestDate: '2026-01-21T15:54:49.550Z',
  quotationRequest: {
    companyId: '691c8caf6d186e46500cbc3e',
    product: 'pet-insurance',
    customer: {
      firstName: 'María',
      lastName: 'González',
      birthDate: '1985-08-22',
      occupation: 'Vendedor o Comerciante',
      gender: 'F',
      email: 'maria.gonzalez@email.com',
      phone: '8091234567',
      documentType: 'Cedula',
      documentNumber: '402-2004330-7',
      address: {
        province: 'Distrito Nacional / Santo Domingo',
        municipality: 'Santo Domingo de Guzmán',
        sector: 'Santo Domingo',
        street: 'Calle de la República',
        houseNumber: '1',
        referencePoint: 'siu',
      },
    },
    pet: {
      name: 'hugo',
      birthYear: '2025',
      raceId: 2,
      age: 1,
      isDomestic: true,
    },
    terms: {
      petPlan: 'MegaCan',
      paymentFraction: 'M',
    },
  },
  createdAt: '2026-01-21T15:54:49.550Z',
  updatedAt: '2026-01-21T15:54:52.508Z',
  quoteNumber: 225420,
  quoteDate: '2026-01-21T15:54:52.503Z',
  quotationResponse: {
    producto: 'F-MA',
    data: {
      requestId: '6970f6c92c832aca38f4c745',
      codigoCliente: '00000000075435',
      idUsuarioPortales: null,
      tipo: 'FMA',
      numeroCotizacion: 225420,
      numeroPoliza: '',
      codigoIntermediario: null,
      cotizacionRelacionada: '',
      estaAprobada: false,
      estado: '',
      estadoCertificado: '',
      idePol: null,
      ramo: 'SMAS',
      plan: '003',
      revPlan: '001',
      indBancaSeg: false,
      descPlanProd: 'PLAN MEGACAN',
      cliente: {
        nombre: 'ARIEL DE JESUS',
        apellido: 'FELIZ GUZMAN',
        genero: 'M',
        fechaNacimiento: '1992-01-11T00:00:00',
        tipoDocumento: 'Cédula',
        numeroDocumento: '402-2004330-7',
        telefono: '8091234567',
        nacionalidad: '',
        correo: 'maria.gonzalez@email.com',
        correoAlterno: '',
        estadoCivil: 'S',
        ocupacion: 'Vendedor o Comerciante',
        imagenPasaporteUrl: '',
        paisResidencia: '',
        fechaExpiracionPasaporte: null,
        peso: 0,
        estatura: 0,
        requiereComprobanteFiscal: false,
        trabajaSectorTurismoZonasFrancasSectorPublico: false,
        direccion: {
          provincia: 'Distrito Nacional / Santo Domingo',
          municipio: 'Santo Domingo de Guzmán',
          sector: 'Santo Domingo',
          edificio: '',
          calle: 'Calle de la República',
        },
        condicionMedica: {
          diabetes: false,
          hipertension: false,
          enfermedadCatastrofica: false,
          enfermedadCatastroficaDescripcion: '',
          actividadDeportivaPeligrosa: false,
          actividadDeportivaPeligrosaDescripcion: '',
          hipertensionCondicionado: false,
          estaEmbarazada: false,
          enfermedadesGravesCondicionado: false,
          embarazoCondicionado: false,
          enfermedadCronica: false,
          enfermedadRiesgosa: false,
        },
        debidaDiligencia: {
          politicamenteExpuesto: false,
          poseeUnFamiliarPep: false,
          cargo: '',
          nombreFamiliar: '',
          parentescoFamiliar: '',
          cargoFamiliar: '',
        },
      },
      codeudor: null,
      vehiculo: null,
      mascota: {
        nombre: 'hugo',
        anioNacimiento: 2025,
        edad: 1,
        edadRango: '1 año',
        idRaza: 2,
        raza: 'Airedale Terrier',
        esDomestico: true,
        mascotaImagenUrl: null,
      },
      bicicleta: null,
      ingreso: null,
      bienesAsegurados: [],
      beneficiarios: [],
      endosoCesion: null,
      terminos: {
        cupon: null,
        cuponTipo: null,
        cuponMonto: 0,
        fraccionamientoPago: 'M',
        formaPago: null,
        seguroLey: '',
        planMascota: 'MegaCan',
        planEspecial: null,
        asistenciaVehicular: false,
        autoSustituto: 'No',
        montoAsegurado: 0,
        extraPrima: 0,
        primaMinima: null,
        plazo: 0,
        inicioVigencia: '2026-01-21T00:00:00',
        finVigencia: '2027-01-21T00:00:00',
        fechaEmision: null,
        fechaCancelacion: null,
        incluyeDesempleo: false,
        primaFija: 0,
        primaKm: 0,
        prima: 710.1264,
        impuesto: 113.6202,
        totalCobro: 824,
        planAccidentes: '',
      },
      pago: {
        pagado: false,
      },
      primas: [
        {
          fraccionamientoPago: 'A',
          descripcion: 'Anual',
          prima: 8088,
          impuesto: 1294.08,
          primaKm: 0,
          cobro: 9382,
        },
        {
          fraccionamientoPago: 'S',
          descripcion: 'Semestral',
          prima: 4205.76,
          impuesto: 672.9216,
          primaKm: 0,
          cobro: 4879,
        },
        {
          fraccionamientoPago: 'T',
          descripcion: 'Trimestral',
          prima: 2102.88,
          impuesto: 336.4608,
          primaKm: 0,
          cobro: 2439,
        },
        {
          fraccionamientoPago: 'M',
          descripcion: 'Mensual',
          prima: 710.1264,
          impuesto: 113.6202,
          primaKm: 0,
          cobro: 824,
        },
        {
          fraccionamientoPago: 'PU',
          descripcion: 'Pago Unico',
          prima: 8088,
          impuesto: 1294.08,
          primaKm: 0,
          cobro: 9382,
        },
      ],
      intermediarios: [],
    },
  },
  id: '6970f6c92c832aca38f4c745',
};
