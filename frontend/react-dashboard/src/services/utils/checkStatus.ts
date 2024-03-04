import type { AxiosResponse } from 'axios';

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = async (res: AxiosResponse<UnknownObj, any>) => {
	console.log('res: ', res);
};

// const onSessionExpired = async () => {};
