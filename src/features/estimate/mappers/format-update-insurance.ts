import type { PetEstimateFormDataType } from '@/features/pet-insurance/schemas/petInsuranceSchema';
import type { UpdateInsuranceRequest } from '../type/insurance.types';
import { RelationShip } from '../type/types';
import type {
  AdditionalDataFormData,
  MixedAdditionalDataFormData,
} from '../schemas/additionalDataSchema';

export function hasEndorsmentPolicy(
  form: unknown
): form is Omit<AdditionalDataFormData, 'smartDevice'> {
  return typeof form === 'object' && form !== null && 'smartDevice' in form;
}

export function hasSmartDevice(form: unknown): form is AdditionalDataFormData {
  return typeof form === 'object' && form !== null && 'smartDevice' in form;
}

function hasTerms(form: unknown): form is PetEstimateFormDataType {
  return typeof form === 'object' && form !== null && 'terms' in form;
}

export const formatInsuranceUpdateRequest = (
  data: MixedAdditionalDataFormData
): UpdateInsuranceRequest => {
  const smartDevice = hasSmartDevice(data) ? data.smartDevice : null;
  const endorsmentPolicy = hasEndorsmentPolicy(data) ? data.endorsmentPolicy : null;
  const terms = hasTerms(data) ? data.terms : null;

  return {
    customer: {
      occupation: data.customer.occupation,
      address: {
        street: data.customer.address.street,
        province: data.customer.address.province ?? '',
        municipality: data.customer.address.municipality ?? '',
        sector: data.customer.address.sector ?? '',
        building: data.customer.address.referencePoint ?? '',
      },
      dueDiligence: {
        politicallyExposed: data.customer.dueDiligence.politicallyExposed,
        hasFamilyPep:
          data.customer.dueDiligence.isItACloseRelative === RelationShip.FAMILY
            ? true
            : false,
        position: data.customer.dueDiligence.position ?? '',
        familyMemberName: data.customer.dueDiligence.familyName ?? '',
        familyRelationship: data.customer.dueDiligence.kinship,
        familyMemberPosition: data.customer.dueDiligence.positionFamily ?? '',
      },
      requiresFiscalReceipt: data.customer.requiresFiscalReceipt,
    },
    ...(endorsmentPolicy?.hasEndorsmentPolicy && {
      endorsementAssignment: {
        institution: endorsmentPolicy.institution,
        sucursal: endorsmentPolicy.subsidiary,
        executiveName: endorsmentPolicy.executiveName,
        executiveEmail: endorsmentPolicy.executiveEmail,
        executivePhone: endorsmentPolicy.executivePhoneNumber,
      },
    }),
    ...(data.customer.hasIntermediary && { intermediary: data.customer.intermediary }),
    ...(smartDevice && {
      smartDevice: {
        installationCenter: smartDevice?.installationCenter ?? '',
        installationType: smartDevice?.installationType ?? '',
      },
    }),
    ...(terms && {
      terms: {
        ...(terms.paymentFraction && { paymentFraction: terms.paymentFraction }),
      },
    }),
  };
};
