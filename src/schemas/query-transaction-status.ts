import { z } from "zod";

export const QueryTransactionStatusInputSchema = z
  .object({
    third_party_reference: z.string(),
    query_reference: z.string(),
    service_provider_code: z.string(),
  })
  .transform((d) => ({
    input_ThirdPartyReference: d.third_party_reference,
    input_QueryReference: d.query_reference,
    input_ServiceProviderCode: d.service_provider_code,
  }));

export type QueryTransactionStatusInput = z.input<typeof QueryTransactionStatusInputSchema>;

export const QueryTransactionStatusResponseRawSchema = z.object({
  output_ConversationID: z.string(),
  output_ResponseDesc: z.string(),
  output_ResponseCode: z.string(),
  output_ThirdPartyReference: z.string(),
  output_ResponseTransactionStatus: z
    .enum(["Cancelled", "Completed", "Expired", "N/A"])
    .or(z.string()),
});

export type QueryTransactionStatusResponseRaw = z.infer<
  typeof QueryTransactionStatusResponseRawSchema
>;

export const QueryTransactionStatusResponseSchema =
  QueryTransactionStatusResponseRawSchema.transform((r) => ({
    conversation_id: r.output_ConversationID,
    code: r.output_ResponseCode,
    description: r.output_ResponseDesc,
    third_party_reference: r.output_ThirdPartyReference,
    status: r.output_ResponseTransactionStatus,
  }));

export type QueryTransactionStatusOutput = z.infer<typeof QueryTransactionStatusResponseSchema>;
