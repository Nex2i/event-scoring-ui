import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export class BillingApi extends BaseRepository {
  getBillingUrl = async (companyId: string): Promise<string> => {
    const billing = await HttpClient.get<{ billingUrl: string }>(
      `${this.apiUrl}/api/stripe/portal/${companyId}`
    );
    return billing.billingUrl;
  };
}
