import { z } from "zod";
import { PaymentOutputSchema } from "~/core";

export const C2BInputSchema = z
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

export type C2BInput = z.input<typeof C2BInputSchema>;

/** Wire response (formato cru do Mpesa, exposto via raw()). */
export const C2BResponseRawSchema = z.object({
  output_ConversationID: z.string(),
  output_TransactionID: z.string(),
  output_ResponseDesc: z.string(),
  output_ResponseCode: z.string(),
  output_ThirdPartyReference: z.string(),
});

export type C2BResponseRaw = z.infer<typeof C2BResponseRawSchema>;

/** Wire response → domain (PaymentOutput) via transform. */
export const C2BResponseSchema = C2BResponseRawSchema.transform((r) =>
  PaymentOutputSchema.parse({
    conversation_id: r.output_ConversationID,
    transaction_id: r.output_TransactionID,
    code: r.output_ResponseCode,
    description: r.output_ResponseDesc,
    third_party_reference: r.output_ThirdPartyReference,
  }),
);
