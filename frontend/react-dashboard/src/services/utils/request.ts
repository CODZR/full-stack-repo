import type { CustomAxiosError, CustomAxiosInstance, CustomAxiosResponse } from 'axios';
import axios from 'axios';

import { jsonToHump, jsonToUnderLineParamsAndData } from './format';
import { showFullScreenLoading, tryHideFullScreenLoading } from './serviceLoading';

import { getToken } from '.';

const baseURL = String(import.meta.env.VITE_API_DOMAIN);

const config = {
	baseURL: baseURL,
	// baseURL: '/api',
	timeout: 50000, // 设置超时时间
	withCredentials: true, // 允许携带cookie
	headers: {
		// 解决ie浏览器会自动缓存
		'cache-control': 'no-cache'
	}
};

class RequestHttp {
	service: CustomAxiosInstance;
	public constructor(config) {
		// 实例化axios
		this.service = axios.create(config);
		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
		 */
		this.service.interceptors.request.use(
			// @ts-ignore
			(config: CustomAxiosRequestConfig) => {
				jsonToUnderLineParamsAndData(config);
				config.headers['Authorization'] = 'Bearer ' + getToken();

				showFullScreenLoading();
				return config;
			},
			(error: CustomAxiosError) => {
				tryHideFullScreenLoading();
				console.log(error); // for debug
				return Promise.reject(error);
			}
		);

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: CustomAxiosResponse) => {
				tryHideFullScreenLoading();
				const res = response.data;

				jsonToHump(res);

				return res;
			},
			async (error: CustomAxiosError) => {
				const errRes = (error.response || {}) as CustomAxiosResponse;
				if (errRes.status === 401) {
					message.error('The token has expired. Please log in again');
					// useUserStore()
					// 	.resetToken()
					// 	.then(() => {
					// 		location.reload();
					// 	});
					// return Promise.reject(new Error('The token has expired. Please log in again'));
				} else if (errRes.status === 503) {
					message.error(errRes?.data.message);
				} else {
					message.error(error.message + ' or No data.');
				}
				tryHideFullScreenLoading();
				console.log('http ' + error); // for debug

				return Promise.reject(error);
			}
		);
	}

	// * 常用请求方法封装
	get<T = any>(url: string, params?: object, _object = {}): Promise<T> {
		console.log('url: ', url);
		return this.service.get(url, { params, ..._object });
	}
	post<T = any>(url: string, data?: object, _object = {}): Promise<T> {
		return this.service.post(url, data, _object);
	}
	put<T = any>(url: string, data?: object, _object = {}): Promise<T> {
		return this.service.put(url, data, _object);
	}
	delete<T = any>(url: string, params?: any, _object = {}): Promise<T> {
		return this.service.delete(url, { params, ..._object });
	}
}

const defaultRequest = new RequestHttp(config).service;

export default defaultRequest;
