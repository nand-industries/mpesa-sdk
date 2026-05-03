import { z } from "zod";
import { PaymentOutputSchema } from "~/core";

export const ReversalInputSchema = z
  .object({
    transaction_id: z.string(),
    security_credential: z.string(),
    initiator_identifier: z.string(),
    third_party_reference: z.string(),
    service_provider_code: z.string(),
    amount: z.string().optional(),
  })
  .transform((d) => ({
    input_TransactionID: d.transaction_id,
    input_SecurityCredential: d.security_credential,
    input_InitiatorIdentifier: d.initiator_identifier,
    input_ThirdPartyReference: d.third_party_reference,
    input_ServiceProviderCode: d.service_provider_code,
    input_ReversalAmount: d.amount,
  }));

export type ReversalInput = z.input<typeof ReversalInputSchema>;

export const ReversalResponseRawSchema = z.object({
  output_ConversationID: z.string(),
  output_TransactionID: z.string(),
  output_ResponseDesc: z.string(),
  output_ResponseCode: z.string(),
  output_ThirdPartyReference: z.string(),
});

export type ReversalResponseRaw = z.infer<typeof ReversalResponseRawSchema>;

export const ReversalResponseSchema = ReversalResponseRawSchema.transform((r) =>
  PaymentOutputSchema.parse({
    conversation_id: r.output_ConversationID,
    transaction_id: r.output_TransactionID,
    code: r.output_ResponseCode,
    description: r.output_ResponseDesc,
    third_party_reference: r.output_ThirdPartyReference,
  }),
);
