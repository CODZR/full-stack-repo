// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}

declare interface Items<T = UnknownObj> {
	items: T[];
	total?: number;
	page?: number;
	perPage?: number;
}

declare interface Item<T = UnknownObj> {
	item: T;

	[key: string]: any;
}

declare interface ModalState<T> {
	modalKey: T;
	[key: string]: unknown;
}

declare type emptyObj = {
	[key: string]: any;
};
declare type UnknownObj = {
	[key: string]: any;
};
declare type UnknownArr = UnknownObj[];

declare type Partial<T> = {
	[P in keyof T]?: T[P];
};

declare type RequireAll<T> = {
	[P in keyof T]-?: T[P];
};

declare type AddProperty<T extends object, K extends PropertyKey, V> = {
	[P in keyof T]: T[P] & { [K: K]: V };
};
