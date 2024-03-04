/* GlobalState */
export interface GlobalState {
	warehouseList: Warehouse[];
	tab: any;
}
export interface Warehouse {
	id?: number;
	code?: string;
	name?: string;
	isVendor?: boolean;
}
