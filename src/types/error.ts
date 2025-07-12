export interface MpesaErrorDetail {
  code: string;
  description: string;
  httpStatus: number;
  transactionId?: string;
  conversationId?: string;
  thirdPartyReference?: string;
}
