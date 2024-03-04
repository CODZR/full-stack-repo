interface Meta {
	keepAlive?: boolean;
	requiresAuth?: boolean;
	title: string;
	icon?: string;
	key?: string;
}

export interface RouteObject {
	children?: RouteObject[];
	element?: React.ReactNode | any;
	path?: string;
	meta?: Meta;
	isLink?: string;
	hidden?: boolean;
}
