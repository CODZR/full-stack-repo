import { handleReqElMsg } from './utils';

import request from './utils/request';

/* 订单 Order API */
export async function queryOrdersAPI(params?) {
	const res = await request.get<Items>('orders/raw', {
		params
	});

	return res;
}
export async function updateOrderAttachment(orderId, attachment) {
	handleReqElMsg(
		request.put(`/orders/raw/${orderId}/attachment`, attachment),
		'Update',
		'Order Attachment',
		orderId
	);
}
export async function queryAssignedOrdersAPI(params?) {
	const res = await request.get<Items>('orders/assigned', {
		params
	});

	return res;
}
export async function queryAssignedBatchOrdersAPI(orderIdArr: Array<number>) {
	const uniqueOrderIdArr = Array.from(new Set(orderIdArr));
	const orderIdStr = uniqueOrderIdArr.join(',');
	const { items } = await request.get<Items>('/orders/assigned/batch/' + orderIdStr);

	return items;
}
export async function findAssignedOrderAPI(orderId: number) {
	const { item } = await request.get<Item>(`orders/assigned/${orderId}`);

	return item;
}
export async function assignOrdersAPI(sourceId: number, orderArr: Array<number>) {
	const item = handleReqElMsg<Item>(
		request.post('orders/assign', {
			assigned_to: sourceId,
			raw_orders: orderArr
		}),
		'Assign',
		'Order',
		orderArr
	);

	return item;
}
export async function unassignOrdersAPI(orderId: number) {
	handleReqElMsg(request.delete(`orders/assigned/${orderId}`), 'Unassign', 'Order', orderId);
}
