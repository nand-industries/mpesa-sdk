mpesa-sdk

A TypeScript SDK for M-Pesa Mozambique API integration with full type safety and clean error handling.

## Quick Start

```ts
import { Mpesa } from "mpesa-sdk";

const mpesa = new Mpesa({
  apiKey: "your-api-key",
  publicKey: "your-public-key",
  serviceProviderCode: "your-service-provider-code",
  origin: "your-origin",
  environment: "sandbox", // or "live"
  timeout: 30000 // optional, defaults to 30 seconds
});

// Ready to use
const result = await mpesa.customerToBusiness.process({...});
```

## Configuration

| Parameter             | Type                  | Required | Description                               |
| --------------------- | --------------------- | -------- | ----------------------------------------- |
| `apiKey`              | `string`              | Yes      | Your M-Pesa API key                       |
| `publicKey`           | `string`              | Yes      | Your M-Pesa public key                    |
| `serviceProviderCode` | `string`              | Yes      | Your service provider code                |
| `origin`              | `string`              | Yes      | Your application origin                   |
| `environment`         | `"sandbox" \| "live"` | No       | Environment (defaults to live)            |
| `timeout`             | `number`              | No       | Request timeout in ms (defaults to 30000) |

## Payment Methods

### Customer to Business (C2B)

Customer pays to your business.

```ts
const result = await mpesa.customerToBusiness.process({
  amount: 100.5,
  number: "258841234567",
  transactionReference: "TXN001",
  thirdPartyReference: "REF001",
});

if (result.data) {
  console.log("Transaction successful:", result.data.output_TransactionID);
}
```

### Business to Customer (B2C)

Your business pays to customer.

```ts
const result = await mpesa.businessToCustomer.process({
  amount: 50.0,
  number: "258841234567",
  transactionReference: "TXN002",
  thirdPartyReference: "REF002",
  paymentServices: "BusinessPayBill", // optional
});

if (result.data) {
  console.log("Payment sent:", result.data.output_TransactionID);
}
```

### Business to Business (B2B)

Transfer between businesses.

```ts
const result = await mpesa.businessToBusiness.process({
  amount: 200.0,
  primaryPartyCode: "your-business-code",
  recipientPartyCode: "recipient-business-code",
  transactionReference: "TXN003",
  thirdPartyReference: "REF003",
  paymentServices: "BusinessToBusinessTransfer", // optional
});

if (result.data) {
  console.log("Transfer completed:", result.data.output_TransactionID);
}
```

## Error Handling

All methods return a `Result<T>` object with consistent error handling:

```ts
const result = await mpesa.customerToBusiness.process({...});

if (result.error) {
  if (typeof result.error === "string") {
    console.error("Network error:", result.error);
  } else {
    console.error("M-Pesa error:", result.error.output_ResponseDesc);
    console.error("Code:", result.error.output_ResponseCode);
  }
} else {
  console.log("Success:", result.data);
}
```

## Response Types

### Success Response

```ts
{
  data: {
    output_ResponseCode: "INS-0",
    output_ResponseDesc: "Request processed successfully",
    output_TransactionID: "MP240101.1234.A12345",
    output_ConversationID: "AG_20240101_12345",
    output_ThirdPartyReference: "REF001"
  },
  error: null
}
```

### Error Response

```ts
{
  data: null,
  error: "unable to fetch data. the request could not be resolved."
  // or
  error: { output_ResponseCode: "INS-1", output_ResponseDesc: "Error message" }
}
```

## Type Safety

The SDK is fully typed with TypeScript interfaces:

```ts
import type { Result, MpesaCustomerToBusinessResponse, CustomerToBusinessParams } from "mpesa-sdk";

const params: CustomerToBusinessParams = {
  amount: 100,
  number: "258841234567",
  transactionReference: "TXN001",
  thirdPartyReference: "REF001",
};
```
