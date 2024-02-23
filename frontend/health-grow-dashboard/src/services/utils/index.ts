export const handleReqElMsg = <T>(
	fn: Promise<Item>,
	action: string,
	name: string,
	identifier?
): Promise<T> => {
	return new Promise((resolve, reject) => {
		let item = null;
		const isCreation = action === 'Create';
		fn.then((data) => {
			item = data?.item || data;
			resolve(item);
			message.success(`${action} ${name} (ID: ${isCreation ? item.id : identifier}) successfully.`);
		}).catch((err: any) => {
			message.error(`${action} ${name} ${isCreation ? '' : identifier} failed.`);
			reject(err);
		});
	});
};

const TokenKey = 'vibeToken';

export function setCookie(name, value) {
	const Days = 1;
	const exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString();
}

export function getCookie(name) {
	const arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
	if (arr !== null) {
		return arr[2];
	} else {
		return '';
	}
}

export function delCookie(name) {
	const exp = new Date();
	exp.setTime(exp.getTime() - 1);
	const cval = getCookie(name);
	if (cval !== null) document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
}

export function getToken() {
	return getCookie(TokenKey);
}

export function setToken(token) {
	return setCookie(TokenKey, token);
}

export function removeToken() {
	return delCookie(TokenKey);
}

export function removeEmptyAccessories(units) {
	units.forEach((unit, idx, arr) => {
		delete arr[idx]['item']; // 删除无用字段
		if (!unit.accessories?.length) delete arr[idx]['accessories'];
	});
}

export function packageCleanUp(packageItem) {
	const temp = jsonClone(packageItem);
	for (let idx = temp.units.length - 1; idx >= 0; idx--) {
		delete temp.units[idx]['item'];
		delete temp.units[idx]['hasError'];
		if (!temp.units[idx].serial) temp.units.splice(idx, 1);
	}
	for (let idx = temp.accessories.length - 1; idx >= 0; idx--) {
		if (!temp.accessories[idx].productCode) temp.accessories.splice(idx, 1);
	}
	removeEmptyAccessories(temp.units);
	return temp;
}
