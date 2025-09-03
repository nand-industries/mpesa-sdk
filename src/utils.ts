import { constants, publicEncrypt } from "node:crypto";
import type { MpesaAPIConfig } from "./types";

export function encodePublicKeyToBase64(publicKey: string): string {
  return Buffer.from(publicKey).toString("base64");
}

export function generateBearerToken(apiKey: string, publicKey: string): string {
  const buffer = Buffer.from(apiKey, "utf8");
  const rsa = {
    key: publicKey,
    padding: constants.RSA_PKCS1_PADDING,
  };
  const encrypted = publicEncrypt(rsa, buffer);
  return encrypted.toString("base64");
}

export function formatPublicKey(key: string): string {
  if (key.includes("BEGIN PUBLIC KEY")) return key;
  return `-----BEGIN PUBLIC KEY-----\n${key.match(/.{1,64}/g)?.join("\n")}\n-----END PUBLIC KEY-----`;
}

export function makeSureConfigIsValid(config: MpesaAPIConfig): void {
  const missing = [];
  if (!config.apiKey) missing.push("apiKey");
  if (!config.publicKey) missing.push("publicKey");
  if (!config.serviceProviderCode) missing.push("serviceProviderCode");
  if (!config.origin) missing.push("origin");
  if (missing.length > 0) {
    throw new Error(`missing ${missing.join(", ")}, pass it to the constructor new Mpesa({ ... }})`);
  }
}
