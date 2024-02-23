import { underline2Hump } from '@/utils/format';

// JSON对象的key值转换为驼峰式
export function jsonToHump(obj) {
	if (obj instanceof Array) {
		obj.forEach(function (v) {
			jsonToHump(v);
		});
	} else if (obj instanceof Object) {
		Object.keys(obj).forEach(function (key) {
			const newKey = underline2Hump(key);
			if (newKey !== key) {
				obj[newKey] = obj[key];
				delete obj[key];
			}
			jsonToHump(obj[newKey]);
		});
	}
}

// JSON对象的key值转换为下划线格式 顺便删除‘空字段’
export function jsonToUnderline(obj) {
	if (obj instanceof Array) {
		obj.forEach(function (item, idx) {
			jsonToUnderline(item);
			if (JSON.stringify(obj) === '[{}]')
				// 删除由于双向绑定导致的数组中的空对象
				obj.splice(idx, 1);
		});
	} else if (obj instanceof Object) {
		Object.keys(obj).forEach(function (key) {
			if (obj[key] === null) {
				// 删除value为null的字段
				delete obj[key];
				return;
			}

			const newKey = hump2Underline(key);
			if (newKey !== key) {
				obj[newKey] = obj[key];
				delete obj[key];
			}
			jsonToUnderline(obj[newKey]);
		});
	}
}

const hump2Underline = (str: string) => str.replace(/([A-Z])/g, '_$1').toLowerCase();

export function jsonToUnderLineParamsAndData(config: any) {
	let params = config.params;
	if (params && typeof params[Symbol.iterator] === 'function') {
		// 传入的params为URLSearchParams
		let newParams = '';
		for (const item of params) {
			const newKey = hump2Underline(item[0]);
			newParams += `&${newKey}=${item[1]}`;
		}
		params = new URLSearchParams(newParams); // 去除第一个&
	} else {
		jsonToUnderline(params);
	}
	const data = config.data;
	jsonToUnderline(data);
	config.params = params;
	config.data = data;
}
