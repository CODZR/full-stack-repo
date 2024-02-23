import { handleReqElMsg } from './utils';

import request from './utils/request';

import { PackageUnit } from '@/models/package';
import { WarehouseTask } from '@/models/task';

/* 仓库 Warehouse Tasks API */
export async function queryTasksAPI(params?) {
	const res = await request.get<Items<WarehouseTask>>('/warehouse/tasks', {
		params
	});

	return res;
}
export async function createTaskAPI(data: WarehouseTask) {
	const item = handleReqElMsg<WarehouseTask>(
		request.post('/warehouse/tasks', data),
		'Create',
		'Warehouse task'
	);

	return item;
}
export async function findTaskAPI(taskId: number) {
	const { item } = await request.get<Item<WarehouseTask>>(`/warehouse/task/${taskId}`);

	return item;
}
export async function updateTaskAPI(taskId: number, updates, params?) {
	const data = jsonClone(updates);
	delete data['packages'];

	const item = handleReqElMsg<WarehouseTask>(
		request.put(`/warehouse/task/${taskId}`, data, { params }),
		'Update',
		'Warehouse Task',
		taskId
	);

	return item;
}
export async function deleteTaskAPI(taskId: number) {
	handleReqElMsg(request.delete(`/warehouse/task/${taskId}`), 'Delete', 'Warehouse Task', taskId);
}
export async function exportTaskSheetAPI(params: { start: string; end: string }) {
	const res = request.post('/google/export-task-sheet/', null, {
		params
	});

	return res;
}
export async function createShipmentUnitsAPI(taskId: number, data) {
	const item = handleReqElMsg<PackageUnit[]>(
		request.post(`/warehouse/task/${taskId}/units`, data),
		'Create',
		'Package'
	);

	return item;
}
export async function findTaskFileAPI(taskId: number, fileId: number) {
	const res = await request.get(`/warehouse/task/${taskId}/file/${fileId}`);

	return res;
}
export async function createTaskFileAPI(taskId: number, data) {
	const res = handleReqElMsg(
		request.post(`/warehouse/task/${taskId}/files`, data),
		'Create',
		'File for Task',
		taskId
	);

	return res;
}
export async function deleteTaskFileAPI(taskId: number, fileId: number) {
	handleReqElMsg(
		request.delete(`/warehouse/task/${taskId}/file/${fileId}`),
		'Delete',
		'Task PDF File',
		fileId
	);
}

// task 相关send email API
export async function sendEmailAPI(taskId: number) {
	const item = handleReqElMsg<Item>(
		request.post(`warehouse/task/${taskId}/send-email`),
		'Send',
		'Email',
		'no'
	);

	return item;
}

export async function syncLightningAPI(taskId: number) {
	const item = handleReqElMsg<Item>(
		request.post(`warehouse/task/${taskId}/sync-lightning`),
		'Sync',
		'Lightning',
		'no'
	);

	return item;
}
