export interface UploadImageResponse {
  success: boolean;
  url?: string;
}

export const enum UploadFileType {
  IMAGE = 'image',
  CAR_LICENSE = 'Matricula',
}

export interface PurchasePolicyResponse {
  status: string;
  policyNumber: string;
}
