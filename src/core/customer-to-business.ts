import { checkSuccessCode } from "../constants";
import type { CustomerToBusinessParams, CustomerToBusinessRequestBody, MpesaCustomerToBusinessResponse, Result } from "../types";
import { Fetcher } from "./fetcher";

export class CustomerToBusiness extends Fetcher {
  protected readonly BASE_PATH = "/ipg/v1x/c2bPayment/singleStage/";
  public async process(params: CustomerToBusinessParams): Promise<Result<MpesaCustomerToBusinessResponse>> {
    const requestBody: CustomerToBusinessRequestBody = {
      input_Amount: params.amount.toFixed(2),
      input_CustomerMSISDN: params.number,
      input_ThirdPartyReference: params.thirdPartyReference,
      input_TransactionReference: params.transactionReference,
      input_ServiceProviderCode: this.serviceProviderCode,
    };

    try {
      const { data, error } = await this._post<MpesaCustomerToBusinessResponse>(this.BASE_PATH, requestBody);
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
