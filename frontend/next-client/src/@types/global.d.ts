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
