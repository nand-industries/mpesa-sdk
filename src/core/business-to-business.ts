import { Fetcher } from "~/core/fetcher";
import { mpesa_errors } from "~/error";
import { BusinessToBusinessParams, BusinessToBusinessRequestBody, MpesaBaseResponse, MpesaBusinessToBusinessResponse } from "~/types";

import { err, MapResult } from "~/types/result";

export const businessToBusiness = (fetcher: Fetcher) => {
  const path = "/ipg/v1x/b2bPayment/singleStage/";
  type Response = MapResult<MpesaBusinessToBusinessResponse, MpesaBaseResponse | string>;

  return async (params: BusinessToBusinessParams): Promise<Response> => {
    const requestBody: BusinessToBusinessRequestBody = {
      input_Amount: params.amount.toFixed(2),
      input_PrimaryPartyCode: params.primaryPartyCode,
      input_RecipientPartyCode: params.recipientPartyCode,
      input_ThirdPartyReference: params.thirdPartyReference,
      input_TransactionReference: params.transactionReference,
      input_ServiceProviderCode: "",
      // input_ServiceProviderCode: this.serviceProviderCode,
      input_PaymentServices: params.paymentServices || "",
    };

    const result = await fetcher.post<MpesaBusinessToBusinessResponse>(path, requestBody);

    if (result.err) return { err: result.err };
    if (result.ok) {
      const error = mpesa_errors[result.ok.output_ResponseCode];
      if (error) return err(error);
    }
    return { err: result.err };
  };
};
