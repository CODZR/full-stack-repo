const toString = Object.prototype.toString;

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, 'Function');
}

/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
	return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
	return !isDef(val);
};
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
	return val !== null && is(val, 'Object');
};

/**
 * @description:  是否为时间
 */
export function isDate(val: unknown): val is Date {
	return is(val, 'Date');
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
	return is(val, 'Number');
}

/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
	return is(val, 'AsyncFunction');
}

/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
	return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
	return is(val, 'String');
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
	return is(val, 'Boolean');
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is any[] {
	return val && Array.isArray(val);
}

// const MAX_SAFE_INTEGER = 9007199254740991;
// function isLength(value) {
// 	return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
// }

// function isArrayLike(value) {
// 	return value != null && isLength(value.length) && !isFunction(value);
// }

/**
 * @description: 是否客户端
 */
export const isClient = () => {
	return typeof window !== 'undefined';
};

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: any): val is Window => {
	return typeof window !== 'undefined' && is(val, 'Window');
};

export const isElement = (val: unknown): val is Element => {
	return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === 'undefined';

// 是否为图片节点
export function isImageDom(o: Element) {
	return o && ['IMAGE', 'IMG'].includes(o.tagName);
}

export function isNull(val: unknown): val is null {
	return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
	return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
	return isUnDef(val) || isNull(val);
}

/**
 * Only for plain objects (Null, Boolean, Number, String, Array,  Map, Set, File, Object)
 */
export function isEmpty(val) {
	// null or undefined
	if (isNull(val)) return true;

	if (val instanceof Error) return val.message === '';

	const type = Object.prototype.toString.call(val);
	switch (type) {
		// Boolean
		case '[object Boolean]': {
			return false;
		}
		// Number
		case '[object Number]': {
			return !val;
		}
		// String or Array
		case '[object String]':
		case '[object Array]': {
			return !val.length;
		}
		// Map or Set or File
		case '[object File]':
		case '[object Map]':
		case '[object Set]': {
			return !val.size;
		}
		// Plain Object
		case '[object Object]': {
			return !Object.keys(val).length;
		}
	}

	return false;
}
