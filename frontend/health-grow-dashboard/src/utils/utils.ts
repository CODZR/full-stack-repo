/* eslint-disable max-lines */
export function isMobileDevice() {
	return window.innerWidth < 500;
}

const EMAIL_REGEX_PATTERN =
	/^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (text: string) => {
	if (!text || text.length > 64) {
		return false;
	}
	return EMAIL_REGEX_PATTERN.test(text);
};

// 简单的数据类型string等对象推荐使用 JSON Clone
export function jsonClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

function isObject(value) {
	const valueType = typeof value;

	// 值不能为null，并且为对象或者函数类型
	return value !== null && (valueType === 'object' || valueType === 'function');
}

export function deepClone(originValue, wMap = new WeakMap()) {
	// 1.判断传入的是否是一个函数类型
	if (typeof originValue === 'function') {
		// 将函数直接返回即可
		return originValue;
	}

	// 2.判断传入的是否是一个Map类型
	if (originValue instanceof Map) {
		return new Map([...originValue]);
	}

	// 3.判断传入的是否是一个Set类型
	if (originValue instanceof Set) {
		return new Set([...originValue]);
	}

	// 4.判断传入的值是否是一个Symbol类型
	if (typeof originValue === 'symbol') {
		// 返回一个新的Symbol，并且将其描述传递过去
		return Symbol(originValue.description);
	}

	// 5.判断传入的值是否是一个undefined
	if (typeof originValue === 'undefined') {
		return undefined;
	}

	// 6.判断传入的是否是对象类型，如果不是，说明是普通类型的值，直接返回即可
	if (!isObject(originValue)) {
		return originValue;
	}

	// 循环引用处理：判断wMap中是否存在原对象，如果存在就取出原对象对应的新对象返回
	if (wMap.has(originValue)) {
		return wMap.get(originValue);
	}

	// 7.定义一个变量，如果传入的是数组就定义为一个数组
	const newValue = Array.isArray(originValue) ? [] : {};

	// 循环引用处理：将原对象作为key，新对象作为value，存入wMap中
	wMap.set(originValue, newValue);

	// 8.循环遍历，如果是对象，就取出key和值存放到空对象中，如果是数组，就去除下标和元素放到空数组中
	// 注意：for...in遍历对象会将其继承的属性也遍历出来，所以需要加hasOwnProperty进行判断是否是自身的属性
	for (const key in originValue) {
		// eslint-disable-next-line no-prototype-builtins
		if (originValue.hasOwnProperty(key)) {
			// 递归调用deepClone，如果对象属性值中还包含对象，就会再次进行拷贝处理
			newValue[key] = deepClone(originValue[key], wMap);
		}
	}

	// 9.对key为Symbol类型的情况进行处理
	// 拿到所有为Symbol类型的key
	const symbolKeys = Object.getOwnPropertySymbols(originValue);
	// for...of遍历取出所有的key，存放到新对象中
	for (const sKey of symbolKeys) {
		newValue[sKey] = deepClone(originValue[sKey], wMap);
	}

	// 10.深拷贝完成，将得到新对象返回
	return newValue;
}

export const removeArrElement = (arr: Array<unknown>, val: unknown) => {
	let slow = 0;
	for (let i = 0, len = arr.length; i < len; i++) {
		if (arr[i] !== val) {
			arr[slow++] = arr[i];
		}
	}
	arr.splice(slow);
	return slow;
};

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate?) {
	let timeout, args, that, timestamp, result;

	const later = function () {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp;

		// 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last);
		} else {
			timeout = null;
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(that, args);
				if (!timeout) that = args = null;
			}
		}
	};

	return function (...args) {
		that = this;
		timestamp = +new Date();
		const callNow = immediate && !timeout;
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait);
		if (callNow) {
			result = func.apply(that, args);
			that = args = null;
		}

		return result;
	};
}

export function containsIgnoreCase(str: string, substr: string) {
	return str.toLowerCase().includes(substr.toLowerCase());
}

/**
 * 去除字符串开头的空格并禁止连续的空格
 */
export function getStrWithoutLeadingSpace(str: string) {
	return str?.replace(/^\s*/g, '').replace('  ', ' ') || '';
}

export function removeQueryParams(paramName: string) {
	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);

	params.delete(paramName);

	url.search = params.toString();

	history.replaceState({}, '', url.href);
}
