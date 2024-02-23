export interface RawOrderItem {
	productCode?: string;
	quantity?: number;
}

export interface RawOrderAttachment {
	businessVerified?: boolean;
	financeVerified?: boolean;
	csVerified?: boolean;
}

export interface RawOrder {
	id?: string;
	createdAt?: string;
	latestShipstring?: string;
	latestDeliverystring?: string;
	shopifyId?: number;
	email?: string;
	shippingPhone?: string;
	shippingName?: string;
	shippingAddress1?: string;
	shippingAddress2?: string;
	shippingCompany?: string;
	shippingCity?: string;
	shippingState?: string;
	shippingZip?: string;
	shippingCountry?: string;
	orderFrom?: string;
	marketplace?: string;
	businessVerificationRequired?: boolean;
	financeVerificationRequired?: boolean;
	csReviewRequired?: boolean;
	items?: RawOrderItem[];
	attachment?: RawOrderAttachment;
}

export interface LightningOrder {
	outboundOrderNo?: number;
	data?: UnknownObj;
}
