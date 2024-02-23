export interface Freight {
	id?: number;
	number?: string;
	ataWh?: string;
	etaWh?: string;
	etaDp?: string;
	ataDp?: string;
	etdOp?: string;
	atdOp?: string;
	pickup?: string;
	targetId?: number;
	status?: string;
	mode?: string;
	oriPort?: string;
	destPort?: string;
	container?: string;
	containerNum?: string;
	oceanForwarder?: string;
	cost?: number;
}

export interface FreightBatch {
	id?: number;
	sourceId?: number;
	items?: FreightBatchItem[];
	costs?: object;
}
export interface FreightBatchItem {
	sku?: string;
	serial?: string;
	condition?: string;
}
