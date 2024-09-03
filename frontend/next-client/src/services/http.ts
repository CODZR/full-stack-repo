import type { AxiosInstance, CustomAxiosError, CustomAxiosResponse } from 'axios';
import axios from 'axios';

import { jsonToHump, jsonToUnderLineParamsAndData } from './utils/format';

// const baseURL = 'https://api.dzrlab.top/api/';
const baseURL = 'http://127.0.0.1:7001/api/';

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
	service: AxiosInstance;
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

				return config;
			},
			(error: CustomAxiosError) => {
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
				const res = response.data;

				jsonToHump(res);

				return res;
			},
			async (error: CustomAxiosError) => {
				return Promise.reject(error);
			}
		);
	}

	// * 常用请求方法封装
	get<T = any>(url: string, params?: object, _object = {}): Promise<T> {
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
