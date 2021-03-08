import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AuthServiceInterface {
  login: (email: string, password: string) => void;
  logout: () => void;
}

export type HttpServiceInterface = {
  [key in 'get' | 'patch' | 'put' | 'post' | 'destroy']: (
    request: HttpRequestConfig
  ) => (token: string) => Promise<HttpResponse | never>;
};

export interface HttpResponse extends AxiosResponse {}

export interface HttpRequestConfig extends AxiosRequestConfig {}

export interface ErrorResponse {
  error: Error;
}
