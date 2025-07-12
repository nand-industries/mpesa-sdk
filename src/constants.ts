import type { MpesaResponseCode } from "./types";

export const MPESA_SUCCESS_CODES: MpesaResponseCode[] = ["INS-0"];

export function checkSuccessCode(code: MpesaResponseCode): boolean {
  return MPESA_SUCCESS_CODES.includes(code);
}
export const MPESA_ERROR_CODES = [
  "INS-0",

  "INS-1",
  "INS-2",
  "INS-4",
  "INS-5",
  "INS-6",
  "INS-9",
  "INS-10",
  "INS-13",
  "INS-14",
  "INS-15",
  "INS-16",
  "INS-17",
  "INS-18",
  "INS-19",
  "INS-20",
  "INS-21",
  "INS-22",
  "INS-23",
  "INS-24",
  "INS-25",
  "INS-26",
  "INS-993",
  "INS-994",
  "INS-995",
  "INS-996",
  "INS-997",
  "INS-998",
  "INS-2001",
  "INS-2002",
  "INS-2006",
  "INS-2051",
  "INS-2057",
] as const;

export const MPESA_ERROR_MESSAGES: Record<MpesaResponseCode, string> = {
  // success code
  "INS-0": "Request processed successfully",

  "INS-1": "Internal Error",
  "INS-2": "Invalid API Key",
  "INS-4": "User is not active",
  "INS-5": "Transaction cancelled by customer",
  "INS-6": "Transaction Failed",
  "INS-9": "Request timeout",
  "INS-10": "Duplicate Transaction",
  "INS-13": "Invalid Shortcode Used",
  "INS-14": "Invalid Reference Used",
  "INS-15": "Invalid Amount Used",
  "INS-16": "Unable to handle the request due to a temporary overloading",
  "INS-17": "Invalid Transaction Reference. Length Should Be Between 1 and 20.",
  "INS-18": "Invalid TransactionID Used",
  "INS-19": "Invalid ThirdPartyReference Used",
  "INS-20": "Not All Parameters Provided. Please try again.",
  "INS-21": "Parameter validations failed. Please try again.",
  "INS-22": "Invalid Operation Type",
  "INS-23": "Unknown Status. Contact M-Pesa Support",
  "INS-24": "Invalid InitiatorIdentifier Used",
  "INS-25": "Invalid SecurityCredential Used",
  "INS-26": "Not authorized",
  "INS-993": "Direct Debit Missing",
  "INS-994": "Direct Debit Already Exists",
  "INS-995": "Customer's Profile Has Problems",
  "INS-996": "Customer Account Status Not Active",
  "INS-997": "Linking Transaction Not Found",
  "INS-998": "Invalid Market",
  "INS-2001": "Initiator authentication error.",
  "INS-2002": "Receiver invalid.",
  "INS-2006": "Insufficient balance",
  "INS-2051": "Invalid number", // MSISDN invalid - usando "Invalid number" para ser mais claro
  "INS-2057": "Language code invalid.",
};
