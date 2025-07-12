import { checkSuccessCode } from "../constants";
import type { BusinessToCustomerParams, BusinessToCustomerRequestBody, MpesaBusinessToCustomerResponse, Result } from "../types";
import { Fetcher } from "./fetcher";

export class BusinessToCustomer extends Fetcher {
  protected readonly BASE_PATH = "/ipg/v1x/b2cPayment/singleStage/";

  public async process(params: BusinessToCustomerParams): Promise<Result<MpesaBusinessToCustomerResponse>> {
    const requestBody: BusinessToCustomerRequestBody = {
      input_Amount: params.amount.toFixed(2),
      input_CustomerMsisdn: params.number,
      input_ThirdPartyReference: params.thirdPartyReference,
      input_TransactionReference: params.transactionReference,
      input_ServiceProviderCode: this.serviceProviderCode,
      input_PaymentServices: params.paymentServices || "BusinessPayBill",
    };

    try {
      const { data, error } = await this._post<MpesaBusinessToCustomerResponse>(this.BASE_PATH, requestBody);
      if (error) return { data: null, error };

      if (!data?.output_ResponseCode) {
        return { data: null, error: "no data returned from the server" };
      }

      if (checkSuccessCode(data.output_ResponseCode)) return { data, error: null };

      return { data: null, error: data };
    } catch (error) {
      return { data: null, error: "unable to fetch data. the request could not be resolved." };
    }
  }
}
