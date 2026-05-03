import z from "zod";

export type Response<T, O> = {
  data: null | T;
  raw: () => O;
  meta: {
    status: number;
    statusText: string;
    ok: boolean;
  };
};
export const PaymentOutputSchema = z.object({
  conversation_id: z.string(),
  transaction_id: z.string(),
  code: z.string(),
  description: z.string(),
  third_party_reference: z.string(),
});

export type PaymentOutput = z.infer<typeof PaymentOutputSchema>;
