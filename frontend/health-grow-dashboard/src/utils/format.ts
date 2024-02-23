import { isDate } from './is';

/**
 * 字符串的下划线格式转驼峰格式，eg：hello_world => helloWorld
 */
export function underline2Hump(s) {
	return s.replace(/_(\w)/g, function (all, letter) {
		return letter.toUpperCase();
	});
}

/**
 * 字符串的驼峰格式转下划线格式，eg：helloWorld => hello_world
 */
export function hump2Underline(s) {
	return s.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const monthAbbrEnum = {
	1: 'Jan',
	2: 'Feb',
	3: 'Mar',
	4: 'Apr',
	5: 'May',
	6: 'June',
	7: 'July',
	8: 'Aug',
	9: 'Sep',
	10: 'Oct',
	11: 'Nov',
	12: 'Dec'
};

export function addZero(num: number, length: number = 2) {
	return ('0000000000000000' + num).slice(-length);
}
/**
 * 2022-09-03T09:53:59.480144194Z -> Sep 3, 2022 09:53
 */
export function formatDetailDialogDate(time: string) {
	if (isDate(time)) return '--';

	const date = new Date(time);
	const year = date.getFullYear();
	const month = monthAbbrEnum[date.getMonth() + 1];
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();

	return `${month} ${addZero(day)}, ${year} ${addZero(hour)}:${addZero(minute)}`;
}

/**
 * 2022-09-03T09:53:59.480144194Z -> Sep 3, 2022 09:53
 */
export function formatInvoiceIssueDate(time: string) {
	if (isDate(time)) return '--';

	const date = new Date(time);
	const year = date.getFullYear();
	const month = monthAbbrEnum[date.getMonth() + 1];
	const day = date.getDate();

	return `${month} ${addZero(day)}, ${year}`;
}

/**
 * 2022-09-03T09:53:59.480144194Z -> Sep 3, 2022 09:53
 */
export function formatTableModifiedText(editTime: string) {
	const dl = new Date(editTime);
	const dn = new Date();
	const offHour = (dn.getTime() - dl.getTime()) / 3600000;
	let text = '';
	if (offHour >= 24 * 30) {
		const offMonth = Math.round(offHour / 24 / 30);
		text = `${offMonth} months ago`;
	} else if (offHour >= 24) {
		const offDay = Math.round(offHour / 24);
		text = `${offDay} days ago`;
	} else if (offHour >= 1) {
		text = `${Math.round(offHour)} hours ago`;
	} else {
		const offMinuite = Math.round(offHour * 60);
		text = `${Math.round(offMinuite)} minutes ago`;
	}

	return text;
}
