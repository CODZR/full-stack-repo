import request from './utils/request';

import { Warehouse } from '@/models/global';

/* 仓库 Warehouse API */
export async function listWarehousesAPI(params?) {
	const { items } = await request.get<Items<Warehouse>>('warehouses', {
		params
	});

	return items;
}

/* 用户配置 profile API 登录注册登出 */
export async function loginAPI(formInfo) {
	let res = null;
	await request
		.post('/login', formInfo)
		.then((data) => {
			res = data;
			message.success('Welcome to Vibe Logisitc System.');
		})
		.catch(() => message.error('Wrong username or password.'));
	return res;
}

export async function getInfoAPI() {
	const res = await request.get('/me');

	return res;
}
