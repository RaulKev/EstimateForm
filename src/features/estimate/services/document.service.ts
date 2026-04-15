
export interface PersonData {
    firstName: string;
    lastName: string;
    gender: 'M' | 'F';
    birthDate: string;
}
// const VALID_CEDULA = '40220043307';
const VALID_PERSON_DATA: PersonData = {
    firstName: 'María',
    lastName: 'González',
    gender: 'F',
    birthDate: '1985-08-22'
};


export const fetchPersonDataByCedula = async (documentNumber: string): Promise<PersonData | null> => {
    // const cleanNumber = documentNumber.replace(/\D/g, '');

    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 300));

    // Siempre retornamos data válida de prueba
    // La validación real se delegará a los endpoints del servicio backend (uni-t)
    return VALID_PERSON_DATA;
};