import { describe, expect, it } from "bun:test";
import forge from "node-forge";
import { generate_token } from "../src/utils";

describe("generate_token", () => {
  const pair = forge.pki.rsa.generateKeyPair({ bits: 1024 });
  const publicKeyPem = forge.pki.publicKeyToPem(pair.publicKey);
  const publicKeyInline = publicKeyPem
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\s+/g, "");

  it("encrypts the api key using a PEM public key", () => {
    const token = generate_token("api-key", publicKeyPem);
    const decrypted = pair.privateKey.decrypt(Buffer.from(token, "base64").toString("binary"));

    expect(decrypted).toBe("api-key");
  });

  it("accepts a public key without PEM headers", () => {
    const token = generate_token("another-key", publicKeyInline);
    const decrypted = pair.privateKey.decrypt(Buffer.from(token, "base64").toString("binary"));

    expect(decrypted).toBe("another-key");
  });
});
