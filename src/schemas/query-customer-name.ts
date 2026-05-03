import { z } from "zod";

export const QueryCustomerNameInputSchema = z
  .object({
    msisdn: z.string(),
    third_party_reference: z.string(),
    service_provider_code: z.string(),
  })
  .transform((d) => ({
    input_CustomerMSISDN: d.msisdn,
    input_ThirdPartyReference: d.third_party_reference,
    input_ServiceProviderCode: d.service_provider_code,
  }));

export type QueryCustomerNameInput = z.input<typeof QueryCustomerNameInputSchema>;

export const QueryCustomerNameResponseRawSchema = z.object({
  output_ConversationID: z.string(),
  output_ResponseDesc: z.string().optional(),
  output_ResponseCode: z.string().optional(),
  output_ThirdPartyReference: z.string(),
  output_CustomerName: z.string(),
});

export type QueryCustomerNameResponseRaw = z.infer<typeof QueryCustomerNameResponseRawSchema>;

export const QueryCustomerNameResponseSchema = QueryCustomerNameResponseRawSchema.transform(
  (r) => ({
    conversation_id: r.output_ConversationID,
    code: r.output_ResponseCode,
    description: r.output_ResponseDesc,
    third_party_reference: r.output_ThirdPartyReference,
    customer_name: r.output_CustomerName,
  }),
);

export type QueryCustomerNameOutput = z.infer<typeof QueryCustomerNameResponseSchema>;
