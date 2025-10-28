import { httpClient } from "../core/httpClient";

interface InsurancePaymentResponse {
  data: {
    paymentUrl: string;
  };
}

export interface InsurancePaymentStatusResponse {
  data: {
    quoteNumber: string;
    policyNumber: string;
    isPaid: boolean;
  };
}

export const getUrlPayment = async (insuranceId: string): Promise<string> => {
  const response = await httpClient.post<InsurancePaymentResponse>(`/insurances/${insuranceId}/payment-url`);
  return response.data.paymentUrl;
};

export const checkStatusPayment = async (insuranceId: string): Promise<InsurancePaymentStatusResponse> => {
  const response = await httpClient.get<InsurancePaymentStatusResponse>(`/insurances/${insuranceId}/payment-status`);
  return response;
};
