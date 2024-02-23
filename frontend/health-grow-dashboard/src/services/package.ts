import { handleReqElMsg, packageCleanUp } from './utils';

import request from './utils/request';
import { jsonClone } from '@/utils';

import { Package, PackageUnit } from '@/models/package';

/* 批次 Shipment Package API */
export async function queryPackagesAPI(params?) {
	const res = await request.get<Items<Package>>('/warehouse/packages', {
		params
	});

	return res;
}
export async function findPackageAPI(packageId: number) {
	const { item } = await request.get<Item>(`/warehouse/package/${packageId}`);

	return item;
}
export async function createPackageAPI(taskId: number, data) {
	const packageData = packageCleanUp(data);
	const item = handleReqElMsg<Package>(
		request.post(`/warehouse/task/${taskId}/packages`, packageData),
		'Create',
		'Package'
	);

	return item;
}
export async function listTaskPackagesAPI(taskId: number) {
	const { items } = await request.get<Items<Package>>(`/warehouse/task/${taskId}/packages`);

	return items;
}

export async function updatePackageAPI(packageId: number, updates) {
	const data = packageCleanUp(updates);
	delete data['task'];
	delete data['taskId'];

	const item = handleReqElMsg<Package>(
		request.put(`/warehouse/package/${packageId}`, data),
		'Update',
		'Package',
		packageId
	);

	return item;
}
export async function deletePackageAPI(packageId: number) {
	handleReqElMsg(request.delete(`/warehouse/package/${packageId}`), 'Delete', 'Package', packageId);
}

/* Warehousing API */
export async function updatePackageUnitAPI(packageId: number, unitId: number, updates) {
	const data = jsonClone(updates);
	delete data['item'];
	const item = handleReqElMsg<PackageUnit>(
		request.put(`/warehouse/package/${packageId}/unit/${unitId}`, data),
		'Update',
		'Package Unit',
		unitId
	);

	return item;
}

/* 单个商品 Unit API */
export async function queryUnitsAPI(params?) {
	const { items } = await request.get<Items<PackageUnit[]>>('/units/search', { params });

	return items;
}
export async function updateUnitAPI(unitSerial: string, updates) {
	const item = handleReqElMsg<PackageUnit>(
		request.put(`unit/${unitSerial}`, updates),
		'Update',
		'Unit',
		unitSerial
	);

	return item;
}
export async function listUnitsAPI(serialsArr: Array<string>) {
	const serialsStr = serialsArr.join(',');
	const { items } = await request.get<Items<PackageUnit>>('/units/batch/' + serialsStr);

	return items;
}
