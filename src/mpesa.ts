import { BusinessToBusiness } from "./core/business-to-business";
import { BusinessToCustomer } from "./core/business-to-customer";
import { CustomerToBusiness } from "./core/customer-to-business";

import type { MpesaAPIConfig } from "./types";
import { formatPublicKey, generateBearerToken, makeSureConfigIsValid } from "./utils";

const defaultApiHost = "api.vm.co.mz:18352";
const defaultTimeout = 30_000; // 30 seconds
const defaultApiHostSandbox = "api.sandbox.vm.co.mz:18352";

class Mpesa {
  private apiHost: string;
  private readonly headers: Headers;
  private timeout: number;

  readonly businessToCustomer: BusinessToCustomer;
  readonly customerToBusiness: CustomerToBusiness;
  readonly businessToBusiness: BusinessToBusiness;

  constructor(config: MpesaAPIConfig) {
    makeSureConfigIsValid(config);

    // if (typeof window !== "undefined") {
    //   throw new Error("This SDK is not intended for use in the browser.");
    // }

    this.apiHost = config.environment === "sandbox" ? defaultApiHostSandbox : defaultApiHost;
    this.timeout = config.timeout || defaultTimeout;

    const serviceProviderCode = config.serviceProviderCode;
    const publicKey = formatPublicKey(config.publicKey);
    const encodedPublicKey = generateBearerToken(config.apiKey, publicKey);

    this.headers = new Headers({
      Authorization: `Bearer ${encodedPublicKey}`,
      Origin: config.origin,
      "Content-Type": "application/json",
    });

    const businessToCustomer = new BusinessToCustomer(this.apiHost, this.headers, serviceProviderCode);
    const customerToBusiness = new CustomerToBusiness(this.apiHost, this.headers, serviceProviderCode);
    const businessToBusiness = new BusinessToBusiness(this.apiHost, this.headers, serviceProviderCode);

    this.businessToCustomer = businessToCustomer;
    this.customerToBusiness = customerToBusiness;
    this.businessToBusiness = businessToBusiness;
  }
}
