import { z } from "zod";
import { PaymentOutputSchema } from "~/core";

export const B2CInputSchema = z
  .object({
    reference: z.string(),
    msisdn: z.string(),
    amount: z.string(),
    third_party_reference: z.string(),
    service_provider_code: z.string(),
  })
  .transform((d) => ({
    input_TransactionReference: d.reference,
    input_CustomerMSISDN: d.msisdn,
    input_Amount: d.amount,
    input_ThirdPartyReference: d.third_party_reference,
    input_ServiceProviderCode: d.service_provider_code,
  }));

export type B2CInput = z.input<typeof B2CInputSchema>;

export const B2CResponseRawSchema = z.object({
  output_ConversationID: z.string(),
  output_TransactionID: z.string(),
  output_ResponseDesc: z.string(),
  output_ResponseCode: z.string(),
  output_ThirdPartyReference: z.string(),
});

export type B2CResponseRaw = z.infer<typeof B2CResponseRawSchema>;

export const B2CResponseSchema = B2CResponseRawSchema.transform((r) =>
  PaymentOutputSchema.parse({
    conversation_id: r.output_ConversationID,
    transaction_id: r.output_TransactionID,
    code: r.output_ResponseCode,
    description: r.output_ResponseDesc,
    third_party_reference: r.output_ThirdPartyReference,
  }),
);
