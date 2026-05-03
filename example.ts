import { createMpesaSdk } from "./src/sdk";

const mpesa = createMpesaSdk({
  env: "sandbox",
  api_key: process.env.MPESA_API_KEY!,
  public_key: process.env.MPESA_PUBLIC_KEY!,
  service_provider_code: process.env.MPESA_SERVICE_PROVIDER_CODE!,
  origin: process.env.MPESA_ORIGIN!,
});

async function main() {
  const response = await mpesa.receive({
    reference: "T1s23",
    msisdn: "25885.....",
    amount: "100.50",
    third_party_reference: "",
    service_provider_code: process.env.MPESA_SERVICE_PROVIDER_CODE!,
  });

  if (response.meta.ok) {
    console.log("conversation_id:", response?.data?.conversation_id);
    console.log("transaction_id:", response?.data?.transaction_id);
    console.log("raw output_ConversationID:", response.raw());
    return;
  }
  console.error(`[${response?.data?.code}] ${response?.data?.description}`);
}
main();
