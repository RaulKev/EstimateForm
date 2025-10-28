export const API_DEFAULTS = {
    companyId: '68fbf86399f1ecfe2c04f542',
    product: 'auto-insurance',

    // Datos del cliente que se pedirán más adelante
    customerDefaults: {
        occupation: 'Vendedor o Comerciante', // O 'A definir'
        address: {
            province: 'Distrito Nacional / Santo Domingo',
            municipality: 'Santo Domingo de Guzmán',
            sector: '16 de Agosto',
            street: '1',
            houseNumber: '25',
            referencePoint: 'Cerca del parque',
        },
    },

    // Datos del vehículo que se pedirán más adelante
    vehicleDefaults: {
        plate: 'G320734',
        color: 'BLANCO',
        displacement: 4,
        doors: 4,
        chassis: '123123',
        engine: '25874',
    },

    // Términos de pago (se definirán más adelante)
    paymentDefaults: {
        paymentFraction: 'M', // Mensual por defecto
        paymentMethod: 't/c', // Tarjeta de crédito por defecto
    },
};
