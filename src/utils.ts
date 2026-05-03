import { publicEncrypt, constants } from "node:crypto";

function formatPublicKey(key: string): string {
  if (key.includes("BEGIN PUBLIC KEY")) return key;
  // const cleaned = key.replace(/\s+/g, "");
  // const lines = cleaned.match(/.{1,64}/g)?.join("\n") ?? "";
  return `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`;
}

export function generate_token(api_key: string, public_key: string): string {
  const pem = formatPublicKey(public_key);

  const buffer = Buffer.from(api_key, "utf8");

  const encrypted = publicEncrypt(
    {
      key: pem,
      padding: constants.RSA_PKCS1_PADDING,
    },
    buffer,
  );
  return encrypted.toString("base64");
  // const forge_key = forge.pki.publicKeyFromPem(pem);
  // const encrypted = forge_key.encrypt(api_key, "RSAES-PKCS1-V1_5");
  // return Buffer.from(encrypted, "binary").toString("base64");
}

// function _getBearerToken(mpesa_public_key: string, mpesa_api_key: string) {
//   const publicKey =
//     "-----BEGIN PUBLIC KEY-----\n" + mpesa_public_key + "\n-----END PUBLIC KEY-----";

//   return encrypted.toString("base64");
// }
