import { handleReqElMsg } from './utils';

import request from './utils/request';

import { Freight, FreightBatch } from '@/models/freight';

/* 海运 Freight API */
export async function queryFreightsAPI(params?) {
	const res = await request.get<Items<Freight>>('freights', {
		params
	});

	return res;
}
export async function createFreightAPI(data) {
	const item = handleReqElMsg<Freight>(request.post('freights', data), 'Create', 'Freight');

	return item;
}
export async function findFreightAPI(freightId: number) {
	const { item } = await request.get<Item<Freight>>(`freight/${freightId}`);

	return item;
}
export async function updateFreightAPI(freightId: number, updates) {
	const item = handleReqElMsg<Freight>(
		request.put(`freight/${freightId}`, updates),
		'Update',
		'Freight',
		freightId
	);

	return item;
}
export async function deleteFreightAPI(freightId: number) {
	handleReqElMsg(request.delete(`freight/${freightId}`), 'Delete', 'Freight', freightId);
}

/* 批次 Batch API */
export async function listBatchesAPI(freightId: number) {
	const { items } = await request.get<Items<FreightBatch[]>>(`freight/${freightId}/batches`);

	return items;
}
export async function createBatchAPI(freightId: number, data) {
	const item = handleReqElMsg<FreightBatch>(
		request.post(`freight/${freightId}/batches`, data),
		'Create',
		'Sub-Batch'
	);

	return item;
}
export async function updateBatchAPI(batchId: number, updates) {
	const item = handleReqElMsg<FreightBatch>(
		request.put(`batch/${batchId}`, updates),
		'Update',
		'Sub-Batch',
		batchId
	);

	return item;
}
export async function deleteBatchAPI(batchId: number) {
	handleReqElMsg(request.delete(`batch/${batchId}`), 'Delete', 'Sub-Batch', batchId);
}
