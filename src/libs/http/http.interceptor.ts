import axios, { InternalAxiosRequestConfig } from 'axios';

export class HttpInterceptor {
  private _apiGateway: string;
  private _accessToken = '';

  constructor() {
    const { VITE_ENV } = import.meta.env;

    if (VITE_ENV) {
      this._apiGateway = import.meta.env[`VITE_API_BASE_URL_${VITE_ENV}`];
    } else {
      throw new Error('VITE_ENV is not defined');
    }
  }

  public initializeInterceptor(): void {
    axios.defaults.baseURL = `${this._apiGateway}`;
    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      //   config.headers.Authorization = `Bearer ${this._accessToken}`;

      return config;
    });
  }

  public get apiGateway(): string {
    return this._apiGateway;
  }

  public get accessToken(): string {
    return this._accessToken;
  }
}
