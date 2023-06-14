import { Buffer } from 'buffer';

import { FormFieldValues, FormFields } from 'types';
import { httpClient } from './httpClient';

export interface AuthData {
  deepLink: string | null;
  otp: string | null;
  requestId: string | null;
  error: string | null;
}

export interface UploadFile {
  data: FormData;
  requestId: string;
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

  async getActialStatus({ otp, requestId }: Record<string, string>) {
    try {
      const response = await httpClient.get<{ status: string }>(
        `/offer-request/status/${otp}/${requestId}`
      );

      return response.data;
    } catch (e) {
      //@ts-ignore
      throw Error(e?.response?.data?.message);
    }
  },

  async uploadFile({ data, requestId }: UploadFile) {
    try {
      const response = await httpClient.post(
        `/questionnaire/image/${requestId}`,
        data,
        {
          headers: { 'content-type': 'multipart/form-data' },
        }
      );

      if (response.data) {
        return response.data;
      }
    } catch (e) {
      //@ts-ignore
      throw Error(e?.response?.data?.message);
    }
  },

  async getFiles({ name, requestId }: { name: string; requestId: string }) {
    try {
      const response = await httpClient.get(
        `/questionnaire/image/${requestId}/${name}`
      );

      if (response.data) {
        return response.data;
      }
    } catch (e) {
      //@ts-ignore
      throw Error(e?.response?.data?.message);
    }
  },

  async removeFile({ name, requestId }: { name: string; requestId: string }) {
    try {
      const response = await httpClient.delete(
        `/questionnaire/image/${requestId}/${name}`
      );

      if (response.data) {
        return response.data;
      }
    } catch (e) {
      //@ts-ignore
      throw Error(e?.response?.data?.message);
    }
  },

  async sendQuestionnarie(data: FormFields, requestId: string) {
    try {
      const response = await httpClient.post(
        `/questionnaire/form/
        ${requestId}`,
        {
          encodeForm: Buffer.from(JSON.stringify(data)).toString('base64'),
        }
      );

      console.log(response);

      if (response.data) {
        return response.data;
      }
    } catch (e) {
      //@ts-ignore
      console.log(e);
    }
  },
};
