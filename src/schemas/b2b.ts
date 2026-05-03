import { z } from "zod";
import { PaymentOutputSchema } from "~/core";

export const B2BInputSchema = z
  .object({
    reference: z.string(),
    amount: z.string(),
    third_party_reference: z.string(),
    primary_party_code: z.string(),
    receiver_party_code: z.string(),
  })
  .transform((d) => ({
    input_TransactionReference: d.reference,
    input_Amount: d.amount,
    input_ThirdPartyReference: d.third_party_reference,
    input_PrimaryPartyCode: d.primary_party_code,
    input_ReceiverPartyCode: d.receiver_party_code,
  }));

export type B2BInput = z.input<typeof B2BInputSchema>;

export const B2BResponseRawSchema = z.object({
  output_ConversationID: z.string(),
  output_TransactionID: z.string(),
  output_ResponseDesc: z.string(),
  output_ResponseCode: z.string(),
  output_ThirdPartyReference: z.string(),
});

export type B2BResponseRaw = z.infer<typeof B2BResponseRawSchema>;

export const B2BResponseSchema = B2BResponseRawSchema.transform((r) =>
  PaymentOutputSchema.parse({
    conversation_id: r.output_ConversationID,
    transaction_id: r.output_TransactionID,
    code: r.output_ResponseCode,
    description: r.output_ResponseDesc,
    third_party_reference: r.output_ThirdPartyReference,
  }),
);
