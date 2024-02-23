/* eslint-disable */
import type { Axios } from 'axios';

declare module 'axios' {
	export interface AxiosInstance extends Axios {
		<T = any, R = CustomAxiosResponse<T>, D = any>(config: CustomAxiosRequestConfig<D>): Promise<T>;
		<T = any, R = CustomAxiosResponse<T>, D = any>(
			url: string,
			config?: CustomAxiosRequestConfig<D>
		): Promise<T>;

		defaults: Omit<AxiosDefaults, 'headers'> & {
			headers: HeadersDefaults & {
				[key: string]: AxiosHeaderValue;
			};
		};
	}

	export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
		useCheckStatus?: boolean;
		showNgProgress?: boolean;
		addCanceler?: boolean;
	}

	export interface CustomAxiosConfig extends InternalAxiosRequestConfig {
		useCheckStatus?: boolean;
		showNgProgress?: boolean;
		addCanceler?: boolean;
	}

	export interface CustomAxiosResponse extends AxiosResponse {
		config: CustomAxiosConfig;
	}
	export interface CustomAxiosError extends AxiosError {
		config: CustomAxiosConfig;
		response: CustomAxiosResponse;
	}
}
