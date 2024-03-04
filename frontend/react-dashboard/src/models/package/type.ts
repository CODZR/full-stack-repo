export interface Package {
	id?: number;
	taskId?: number;
	unitSystem?: string;
	weight?: number;
	length?: number;
	width?: number;
	height?: number;
	sizes?: string;
	trackingNumber?: string;
	createdAt?: string;
	deliveredAt?: string;
	scannedSerials?: string;
	units?: PackageUnit[];
	accessories?: PackageAccessory[];
	pkgFulfilledAt?: string;
}

export interface PackageUnit {
	id?: number;
	packageId?: number;
	serial?: string;
	productCode?: string;
	status?: string;
	shipmentDamage?: boolean;
	shipmentDamageNote?: string;
	packageBoxCondition?: string;
	insuranceCost?: number;
	checked?: boolean;
	restocked?: boolean;
	ifStylus?: boolean;
	ifPowercord?: boolean;
	accessories?: PackageUnitAccessory[];
}

export interface PackageUnitAccessory {
	productCode?: string;
	quantity?: number;
}

export interface PackageAccessory {
	product_code?: string;
	quantity?: number;
	status?: string;
}
