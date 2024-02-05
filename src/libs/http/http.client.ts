import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import LocalStorageRepository from '@/utils/localStorage.repository';
import { GetHttpStatusMessage, HttpConfig } from './http.config';

const axiosBase = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: true,
});

export const defaultErrorMessage = 'There was an error making a request. Please contact support about this issue';

interface AxiosError<T = any, D = any> extends Error {
  config: AxiosRequestConfig<D>;
  code?: string;
  request?: any;
  response?: AxiosResponse<T, D>;
  isAxiosError: boolean;
  toJSON: () => object;
}

const HttpClient = {
  get: <T>(url: string, config?: HttpConfig): Promise<T> => {
    return handleAxiosRequest(() => axiosBase.get<T>(url, createConfig(config)));
  },

  delete: <T>(url: string, config?: HttpConfig): Promise<T> => {
    return handleAxiosRequest(() => axiosBase.delete<T>(url, createConfig(config)));
  },

  post: <T>(url: string, data?: object, config?: HttpConfig): Promise<T> => {
    return handleAxiosRequest(() => axiosBase.post<T>(url, data, createConfig(config)));
  },

  put: <T>(url: string, data?: object): Promise<T> => {
    return handleAxiosRequest(() => axiosBase.put<T>(url, data, getAuthConfig()));
  },

  patch: <T>(url: string, data?: object): Promise<T> => {
    return handleAxiosRequest(() => axiosBase.patch<T>(url, data, getAuthConfig()));
  },
};

const handleAxiosRequest = <T>(axiosRequest: () => Promise<AxiosResponse<T>>): Promise<T> => {
  return axiosRequest()
    .then((axiosResponse: AxiosResponse<T>) => axiosResponse.data)
    .catch((axiosError) => mapToHttpClientErrorResponse(axiosError));
};

const mapToHttpClientErrorResponse = <HttpClientError>(axiosError: AxiosError): Promise<HttpClientError> => {
  return Promise.reject({
    content: axiosError.response?.data,
    message: getErrorMessage(axiosError),
    code: GetHttpStatusMessage(axiosError.response?.status),
  });
};

const getErrorMessage = (axiosError: AxiosError): string => {
  return axiosError?.response?.data?.msg ?? defaultErrorMessage;
};

const createConfig = (config?: HttpConfig): AxiosRequestConfig => {
  const authConfig = getAuthConfig();
  return { ...authConfig, ...config };
};

const getAuthConfig = (): object => {
  const userToken = LocalStorageRepository.getUserToken();
  return { headers: { authorization: `Bearer ${userToken}` } };
};

export default HttpClient;
