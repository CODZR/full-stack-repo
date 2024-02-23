/**
 * API 统一放在该文件，按数据库表名的首字母排序，及同级modules文件下对应的文件顺序
 */

import { Message } from '@/components/MyToast';

import requester from './http';
// import { resItemData, resItemsData, loginForm } from './type';

const handleReqElMsg = (fn, action: string, name: string, identifier?) => {
	return new Promise((resolve, reject) => {
		const isCreation = action === 'Create';
		fn.then((data) => {
			resolve(data);
			Message.success(`${action} ${name} (ID: ${isCreation ? data.id : identifier}) successfully.`);
		}).catch((err: any) => {
			Message.error(`${action} ${name} ${isCreation ? '' : identifier} failed.`);
			reject(err);
		});
	});
};

export async function searchHanziAPI(name: string) {
	const res = handleReqElMsg(requester.get(`hanzi/search?name=${name}`), 'Search', 'Hanzi', name);

	return res;
}
