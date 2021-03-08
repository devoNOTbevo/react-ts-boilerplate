import {
  ErrorResponse,
  HttpRequestConfig,
  HttpServiceInterface,
} from '../types/service-interfaces';
import axios, { AxiosInstance } from 'axios';
import { AxiosRequestConfig, AxiosError } from 'axios';

type AxiosServiceConfig = AxiosRequestConfig & {};

export default class AxiosHttpService implements HttpServiceInterface {
  readonly client: AxiosInstance;
  constructor(config: AxiosServiceConfig) {
    this.client = axios.create(config);
  }

  get(config: HttpRequestConfig) {
    const { url = '' } = config;
    return (token: string) => {
      try {
        return this.client.get(url, this.makeConfigObject(config, token));
      } catch (e) {
        this.handleAxiosError(e);
        throw e;
      }
    };
  }

  patch(config: HttpRequestConfig) {
    const { url = '', data } = config;
    return (token: string) => {
      try {
        return this.client.patch(
          url,
          data,
          this.makeConfigObject(config, token)
        );
      } catch (e) {
        this.handleAxiosError(e);
        throw e;
      }
    };
  }

  put(config: HttpRequestConfig) {
    const { url = '', data } = config;
    return (token: string) => {
      try {
        return this.client.put(url, data, this.makeConfigObject(config, token));
      } catch (e) {
        this.handleAxiosError(e);
        throw e;
      }
    };
  }

  post(config: HttpRequestConfig) {
    const { url = '', data } = config;
    return (token: string) => {
      try {
        return this.client.post(
          url,
          data,
          this.makeConfigObject(config, token)
        );
      } catch (e) {
        this.handleAxiosError(e);
        throw e;
      }
    };
  }

  destroy(config: HttpRequestConfig) {
    const { url = '' } = config;
    return (token: string) => {
      try {
        return this.client.delete(url, this.makeConfigObject(config, token));
      } catch (e) {
        this.handleAxiosError(e);
        throw e;
      }
    };
  }

  makeConfigObject(
    config: HttpRequestConfig,
    token: string
  ): HttpRequestConfig {
    const headers = config.headers ? { ...config.headers } : {};
    console.log('making config object', config, token);
    return {
      ...config,
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }

  /*
   * Handling came from axios docs
   */
  handleAxiosError(error: AxiosError) {
    console.log('--------Handling Request error--------');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log('config', error.config);
    console.log('---------------------------------');
  }
}
