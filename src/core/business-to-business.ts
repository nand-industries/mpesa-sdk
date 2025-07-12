import { checkSuccessCode } from "../constants";
import type { BusinessToBusinessParams, BusinessToBusinessRequestBody, MpesaBusinessToBusinessResponse, Result } from "../types";
import { Fetcher } from "./fetcher";

export class BusinessToBusiness extends Fetcher {
  protected readonly BASE_PATH = "/ipg/v1x/b2bPayment/singleStage/";

  public async process(params: BusinessToBusinessParams): Promise<Result<MpesaBusinessToBusinessResponse>> {
    const requestBody: BusinessToBusinessRequestBody = {
      input_Amount: params.amount.toFixed(2),
      input_PrimaryPartyCode: params.primaryPartyCode,
      input_RecipientPartyCode: params.recipientPartyCode,
      input_ThirdPartyReference: params.thirdPartyReference,
      input_TransactionReference: params.transactionReference,
      input_ServiceProviderCode: this.serviceProviderCode,
      input_PaymentServices: params.paymentServices || "BusinessToBusinessTransfer",
    };

    try {
      const { data, error } = await this._post<MpesaBusinessToBusinessResponse>(this.BASE_PATH, requestBody);
      if (error) return { data: null, error };

      if (!data?.output_ResponseCode) {
        return { data: null, error: "no data returned from the server" };
      }

      if (checkSuccessCode(data.output_ResponseCode)) return { data, error: null };

      return { error: data, data: null };
    } catch (error) {
      return { data: null, error: "unable to fetch data. the request could not be resolved." };
    }
  }
}
