/**
 * API 统一放在该文件，按数据库表名的首字母排序，及同级modules文件下对应的文件顺序
 */

import { Message } from '@vcomp/ui';
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

const jsonClone = (obj: object): any => JSON.parse(JSON.stringify(obj));

/* 复合物品 Combination API */
export async function queryCombinationsAPI(params?) {
	const res = await requester.get('combinations', {
		params
	});
	return res;
}
export async function findCombinationAPI(combinationId: number) {
	const res = handleReqElMsg(
		requester.get(`combinations/${combinationId}`),
		'Find',
		'Combination',
		combinationId
	);
	return res;
}
// export async function updateFreightAPI (freightId: number, updates) {
//   const material = handleReqElMsg(
//     requester.put(`freight/${freightId}`, updates), 'Update', 'Freight', freightId
//   );
//   return material;
// }
// export async function deleteFreightAPI (freightId: number) {
//   handleReqElMsg(
//     requester.delete(`freight/${freightId}`), 'Delete', 'Freight', freightId
//   );
// }

/* 物品 Material API */
export async function queryMaterialsAPI(params?) {
	const res = await requester.get('materials', {
		params
	});
	return res;
}
export async function findMaterialAPI(materialId: number) {
	const res = handleReqElMsg(requester.get(`materials/${materialId}`), 'Find', 'Material', materialId);
	return res;
}
// export async function updateFreightAPI (freightId: number, updates) {
//   const material = handleReqElMsg(
//     requester.put(`freight/${freightId}`, updates), 'Update', 'Freight', freightId
//   );
//   return material;
// }
// export async function deleteFreightAPI (freightId: number) {
//   handleReqElMsg(
//     requester.delete(`freight/${freightId}`), 'Delete', 'Freight', freightId
//   );
// }
/* 物品 Material API */
export async function querySymptomsAPI(params?) {
	const res = await requester.get('symptoms', {
		params
	});
	return res;
}
export async function findSymptomAPI(symptomId: number) {
	const res = handleReqElMsg(requester.get(`symptoms/${symptomId}`), 'Find', 'Symptom', symptomId);
	return res;
}
