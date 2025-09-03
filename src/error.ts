import type { MpesaBaseResponse, MpesaResponseCode } from "./types";

type FriendlyError = {
  code: MpesaResponseCode;
  category: "auth" | "validation" | "system" | "user" | "network" | "unknown";
  message: string;
};

export const mpesa_errors: Record<MpesaResponseCode, FriendlyError> = {
  "INS-0": {
    code: "INS-0",
    category: "system",
    message: "Payment completed successfully.",
  },
  "INS-1": {
    code: "INS-1",
    category: "system",
    message: "Something went wrong on our side. Try again.",
  },
  "INS-2": {
    code: "INS-2",
    category: "auth",
    message: "Your API key is not correct.",
  },
  "INS-4": {
    code: "INS-4",
    category: "user",
    message: "The user account is not active.",
  },
  "INS-5": {
    code: "INS-5",
    category: "user",
    message: "The user cancelled the payment.",
  },
  "INS-6": {
    code: "INS-6",
    category: "system",
    message: "We could not process the payment.",
  },
  "INS-9": {
    code: "INS-9",
    category: "network",
    message: "The request took too long. Try again.",
  },
  "INS-10": {
    code: "INS-10",
    category: "validation",
    message: "This payment was already submitted.",
  },
  "INS-13": {
    code: "INS-13",
    category: "validation",
    message: "The shortcode used is not valid.",
  },
  "INS-14": {
    code: "INS-14",
    category: "validation",
    message: "The reference is not valid.",
  },
  "INS-15": {
    code: "INS-15",
    category: "validation",
    message: "The amount is not valid.",
  },
  "INS-16": {
    code: "INS-16",
    category: "system",
    message: "Too many requests. Please try again later.",
  },
  "INS-17": {
    code: "INS-17",
    category: "validation",
    message: "The reference must be 1 to 20 characters.",
  },
  "INS-18": {
    code: "INS-18",
    category: "validation",
    message: "The transaction ID is not valid.",
  },
  "INS-19": {
    code: "INS-19",
    category: "validation",
    message: "The third-party reference is not valid.",
  },
  "INS-20": {
    code: "INS-20",
    category: "validation",
    message: "Some required fields are missing.",
  },
  "INS-21": {
    code: "INS-21",
    category: "validation",
    message: "Some inputs are not valid. Please check and try again.",
  },
  "INS-22": {
    code: "INS-22",
    category: "validation",
    message: "The operation type is not supported.",
  },
  "INS-23": {
    code: "INS-23",
    category: "system",
    message: "We don't know the result. Contact support.",
  },
  "INS-24": {
    code: "INS-24",
    category: "auth",
    message: "Your account ID is not valid.",
  },
  "INS-25": {
    code: "INS-25",
    category: "auth",
    message: "Security credentials are not valid.",
  },
  "INS-26": {
    code: "INS-26",
    category: "auth",
    message: "You are not allowed to perform this operation.",
  },
  "INS-993": {
    code: "INS-993",
    category: "validation",
    message: "The account is not linked for direct debit.",
  },
  "INS-994": {
    code: "INS-994",
    category: "validation",
    message: "The account is already linked.",
  },
  "INS-995": {
    code: "INS-995",
    category: "user",
    message: "There is a problem with the user's account.",
  },
  "INS-996": {
    code: "INS-996",
    category: "user",
    message: "The user's account is not active.",
  },
  "INS-997": {
    code: "INS-997",
    category: "validation",
    message: "We could not find the link transaction.",
  },
  "INS-998": {
    code: "INS-998",
    category: "validation",
    message: "This operation is not allowed in your region.",
  },
  "INS-2001": {
    code: "INS-2001",
    category: "auth",
    message: "We could not verify your identity.",
  },
  "INS-2002": {
    code: "INS-2002",
    category: "validation",
    message: "The receiver's account is not valid.",
  },
  "INS-2006": {
    code: "INS-2006",
    category: "user",
    message: "The user does not have enough balance.",
  },
  "INS-2051": {
    code: "INS-2051",
    category: "validation",
    message: "The phone number format is wrong.",
  },
  "INS-2057": {
    code: "INS-2057",
    category: "validation",
    message: "The language code used is not supported.",
  },
};

export const errors = {
  unexpected: {
    message: "An unexpected error occurred.",
  },
  not_found: {
    message: "The requested resource was not found.",
  },
  forbidden: {
    message: "You are not allowed to perform this operation.",
  },
  unauthorized: {
    message: "You are not authorized to perform this operation.",
  },
  network: {
    message: "The request took too long. Try again.",
  },
};

export function parseMpesaError(error: unknown): MpesaBaseResponse | string {}
