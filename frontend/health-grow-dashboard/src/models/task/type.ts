import { LightningOrder } from '../order';
import { Package } from '../package';
import type { TASK_MODAL_KEY } from './constant';

export interface TaskState {
	taskFetchLoading: boolean;
	taskList: WarehouseTask[];
	taskModal: ModalState<TASK_MODAL_KEY>;
}

export interface WarehouseTask {
	id?: number;
	orderId?: number;
	taskType?: string;
	sourceId?: number;
	targetId?: number;
	newAddress?: string;
	note?: string;
	products?: WarehouseTaskProduct[];
	createdAt?: string;
	carrier?: string;
	transportMode?: string;
	deliveryCost?: number;
	liftgateCost?: number;
	limitedCost?: number;
	residentialCost?: number;
	insideCost?: number;
	insureCost?: number;
	returnReason?: string;
	returnDetails?: string;
	onHold?: boolean;
	trackingNumberNote?: string;
	emailSended?: boolean;
	packages?: Package[];
	lightningOrder?: LightningOrder;
	files?: TaskFile[];
	fulfilledAt?: string;
	onholdModifiedAt?: string;
	scheduledDate?: string;

	// only for client
	refTaskId?: number;
}

export interface WarehouseTaskProduct {
	id?: number;
	productCode?: string;
	sku?: string;
	quantity?: number;
	serialNote?: string;
	condition?: string;
}

export interface TaskFile {
	fileId?: number;
	fileName?: string;
	taskId?: number;
}
