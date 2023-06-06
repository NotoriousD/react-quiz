import { httpClient } from './httpClient';

export interface AuthData {
  deepLink: string | null;
  otp: string | null;
  requestId: string | null;
  error: string | null;
}

export const API = {
  async fetchDeepLink() {
    try {
      const response = await httpClient.get<AuthData>('/deeplink');

      return response.data;
    } catch (e) {
      //@ts-ignore
      throw Error(e?.response?.data?.message);
    }
  },
};
