import type { MPESA_ERROR_CODES } from "../constants";

export interface MpesaAPIConfig {
  apiKey: string;
  publicKey: string;
  serviceProviderCode: string;
  origin: string;
  apiHost?: string;
  timeout?: number; // request timeout in ms
  environment?: "sandbox" | "live";
}

export type MpesaResponseCode = (typeof MPESA_ERROR_CODES)[number];

export interface MpesaBaseResponse {
  output_ResponseCode: MpesaResponseCode;
  output_ResponseDesc: string;
  output_TransactionID?: string;
  output_ConversationID?: string;
  output_ThirdPartyReference?: string;
}

export type Result<T> = {
  data: T | null;
  error: MpesaBaseResponse | string | null;
};

export interface MpesaAccessTokenResponse extends MpesaBaseResponse {
  output_Token: string;
  output_TokenExpiry: string; // In seconds
}

export interface MpesaCustomerToBusinessResponse extends MpesaBaseResponse {}

export interface MpesaBusinessToCustomerResponse extends MpesaBaseResponse {
  output_Amount?: string;
  output_PrimaryPartyCode?: string;
  output_RecipientFirstName?: string;
  output_RecipientLastName?: string;
  output_SettlementAmount?: string;
}

export interface MpesaQueryResponse extends MpesaBaseResponse {
  output_ResponseTransactionStatus?: string;
  output_ResponsePaymentStatusCode?: string;
  output_ResponsePaymentStatusDesc?: string;
}

export interface MpesaReversalResponse extends MpesaBaseResponse {
  // Reversal specific fields
}

export interface MpesaBusinessToBusinessResponse extends MpesaBaseResponse {
  output_Amount?: string;
  output_PrimaryPartyCode?: string;
  output_RecipientPartyCode?: string;
  output_SettlementAmount?: string;
}

export type CustomerToBusinessRequestBody = {
  input_Amount: string;
  input_CustomerMSISDN: string;
  input_ThirdPartyReference: string;
  input_TransactionReference: string;
  input_ServiceProviderCode: string;
};

export type BusinessToCustomerRequestBody = {
  input_Amount: string;
  input_CustomerMsisdn: string;
  input_ThirdPartyReference: string;
  input_TransactionReference: string;
  input_ServiceProviderCode: string;
  input_PaymentServices: string;
};

export type QueryPaymentRequestBody = {
  input_QueryReference: string;
  input_ServiceProviderCode: string;
  input_ThirdPartyReference: string;
};

export type ReversalRequestBody = {
  input_ReversalAmount: string;
  input_TransactionID: string;
  input_ThirdPartyReference: string;
  input_ServiceProviderCode: string;
};

export type BusinessToBusinessRequestBody = {
  input_Amount: string;
  input_PrimaryPartyCode: string; // Empresa que envia
  input_RecipientPartyCode: string; // Empresa que recebe
  input_ThirdPartyReference: string;
  input_TransactionReference: string;
  input_ServiceProviderCode: string;
  input_PaymentServices: string; // Ex: "BusinessToBusinessTransfer"
};

export type MpesaResponse<T = any> = {
  status: "success" | "error";
  message: string;
  data?: T;
  code?: string;
  httpStatus?: number;
  transactionId?: string;
  conversationId?: string;
  thirdPartyReference?: string;
  timestamp?: string;
};

export type CustomerToBusinessResponseData = {
  transactionId: string;
  conversationId: string;
  thirdPartyReference: string;
  amount: string;
  customerMsisdn: string;
  transactionReference: string;
};

export type BusinessToCustomerResponseData = {
  transactionId: string;
  conversationId: string;
  thirdPartyReference: string;
  amount: string;
  customerMsisdn: string;
  transactionReference: string;
  recipientFirstName?: string;
  recipientLastName?: string;
  settlementAmount?: string;
};

export type BusinessToBusinessResponseData = {
  transactionId: string;
  conversationId: string;
  thirdPartyReference: string;
  amount: string;
  primaryPartyCode: string;
  recipientPartyCode: string;
  transactionReference: string;
  settlementAmount?: string;
};

export type QueryResponseData = {
  transactionId: string;
  conversationId: string;
  thirdPartyReference: string;
  queryReference: string;
  transactionStatus?: string;
  paymentStatusCode?: string;
  paymentStatusDesc?: string;
};

export type ReversalResponseData = {
  transactionId: string;
  conversationId: string;
  thirdPartyReference: string;
  originalTransactionId: string;
  reversalAmount: string;
};

export type CustomerToBusinessParams = {
  amount: number;
  number: string; // MSISDN
  transactionReference: string;
  thirdPartyReference: string;
};

export type BusinessToCustomerParams = {
  amount: number;
  number: string; // MSISDN
  transactionReference: string;
  thirdPartyReference: string;
  paymentServices?: string;
};

export type BusinessToBusinessParams = {
  amount: number;
  primaryPartyCode: string;
  recipientPartyCode: string;
  transactionReference: string;
  thirdPartyReference: string;
  paymentServices?: string;
};

export type QueryParams = {
  queryReference: string;
  thirdPartyReference: string;
};

export type ReversalParams = {
  originalTransactionId: string;
  reversalAmount: number;
  thirdPartyReference: string;
};
