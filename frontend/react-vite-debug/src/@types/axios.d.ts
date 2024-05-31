/* eslint-disable */
import type { Axios } from 'axios';

declare module 'axios' {
	export interface CustomAxiosInstance extends Axios {
		<T = any, R = CustomAxiosResponse<T>, D = any>(config: CustomAxiosRequestConfig<D>): Promise<T>;
		<T = any, R = CustomAxiosResponse<T>, D = any>(
			url: string,
			config?: CustomAxiosRequestConfig<D>
		): Promise<T>;
		get<T = any, R = CustomAxiosResponse<T>, D = any>(
			url: string,
			config?: CustomAxiosRequestConfig<D>
		): Promise<T>;
		delete<T = any, R = CustomAxiosResponse<T>, D = any>(
			url: string,
			config?: CustomAxiosRequestConfig<D>
		): Promise<R>;
		post<T = any, R = CustomAxiosResponse<T>, D = any>(
			url: string,
			data?: D,
			config?: CustomAxiosRequestConfig<D>
		): Promise<T>;
		put<T = any, R = AxiosResponse<T>, D = any>(
			url: string,
			data?: D,
			config?: CustomAxiosRequestConfig<D>
		): Promise<T>;

		defaults: Omit<AxiosDefaults, 'headers'> & {
			headers: HeadersDefaults & {
				[key: string]: AxiosHeaderValue;
			};
		};
	}

	export interface CustomAxiosConfig {}

	export interface CustomAxiosResponse extends AxiosResponse {
		config: CustomAxiosConfig;
	}
	export interface CustomAxiosError extends AxiosError {
		response: CustomAxiosResponse;
	}
}
