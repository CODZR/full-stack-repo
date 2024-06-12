/**
 * 存储bytes 转换
 * 1. 小于1MB, 显示 整数 KB，小于1KB显示为0
 *
 * 2. 大于等于 1MB, 小于1024 MB，显示 数字（1位小数）MB，小数位0则省去
 *
 * 3. 大于等于 1024MB，显示数字（2位小数）GB，小数位 0则省去
 */
export function formatStorageSize(bytes: number): string {
	if (bytes < 1024) {
		return '0 KB';
	}

	const unitArr = ['Bytes', 'KB', 'MB', 'GB'];
	const unitArrLen = unitArr.length;
	let size = bytes;
	let unitIdx = 0;

	while (size >= 1024 && unitIdx < unitArrLen - 1) {
		size /= 1024;
		unitIdx++;
	}

	const precision = unitIdx === 0 ? 0 : unitIdx === 1 ? 1 : 2;
	const formattedSize = size.toFixed(precision);

	return `${formattedSize.replace(/\.0$/, '')} ${unitArr[unitIdx]}`;
}
