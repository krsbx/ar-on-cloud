import {
  AxiosRequestHeaders as OriginalAxiosRequestHeaders,
  AxiosRequestConfig as OriginalAxiosRequestConfig,
} from 'axios';
import { ResourceKey } from 'src/utils/interfaces/resource';

declare module 'axios' {
  interface AxiosRequestHeaders extends OriginalAxiosRequestHeaders {
    Authorization: string;
    resourceName: ResourceKey;
    overwrite: boolean;
  }

  interface AxiosInstance {
    config?: {
      headers?: AxiosRequestHeaders;
    };
  }

  interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
    headers?: AxiosRequestHeaders;
    resourceName?: ResourceKey;
    overwrite?: boolean;
  }
}
