/**
 * API 统一放在该文件，按数据库表名的首字母排序，及同级modules文件下对应的文件顺序
 */

import { toast } from '@comp/base/MyToast';

import requester from './http';
// import { resItemData, resItemsData, loginForm } from './type';

interface Items<T = UnknownObj> {
	items: T[];
	total?: number;
	page?: number;
	perPage?: number;
}

interface Item<T = UnknownObj> {
	item: T;

	[key: string]: any;
}

const handleReqElMsg = <T>(fn: Promise<Item>, action: string, name: string, identifier?): Promise<T> => {
	return new Promise((resolve, reject) => {
		let item = null;
		const isCreation = action === 'Create';
		fn.then((data) => {
			item = data?.item || data;
			resolve(item);
			toast.success(`${action} ${name} (ID: ${isCreation ? item.id : identifier}) successfully.`);
		}).catch((err: any) => {
			toast.error(`${action} ${name} ${isCreation ? '' : identifier} failed.`);
			reject(err);
		});
	});
};

export async function searchHanziAPI(zi: string) {
	const item = handleReqElMsg<Item>(requester.get(`hanzi/search?zi=${zi}`), 'Search', 'Hanzi', zi);

	return item;
}
