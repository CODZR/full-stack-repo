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
			if (obj[key] === undefined || obj[key] === '') {
				// 删除value为undefined、''的字段
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
			const [key, value] = item;
			if (value && value !== 'undefined') {
				const newKey = hump2Underline(key);
				newParams += `&${newKey}=${value}`;
			}
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

export const getTimezoneOffsetStr = (date: Date) => {
	const offsetInMinutes = date.getTimezoneOffset();
	const hours = Math.floor(Math.abs(offsetInMinutes) / 60);
	const minutes = Math.abs(offsetInMinutes) % 60;

	return `${offsetInMinutes < 0 ? '+' : '-'}${addZero(hours)}:${addZero(minutes)}`;
};

export function addZero(num: number, length = 2) {
	return ('0000000' + num).slice(-length);
}

// 将Date()对象转成YYYY-MM-DD HH:MM:SS +08:00格式
export const formatDatetime = (date: string) => {
	const v = new Date(date);

	const year = v.getFullYear();
	const month = v.getMonth() + 1;
	const day = v.getDate();
	const hour = v.getHours();
	const minute = v.getMinutes();
	const second = v.getSeconds();
	const offsetNum = getTimezoneOffsetStr(v);

	return `${year}-${month}-${addZero(day)} ${addZero(hour)}:${addZero(minute)}:${addZero(
		second
	)} ${offsetNum}`;
};
