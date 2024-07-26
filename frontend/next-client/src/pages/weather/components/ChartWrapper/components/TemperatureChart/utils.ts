import { formatDatetime } from '@/services/utils/format';
import { dims } from './constants';

export const handleTooltipFormatter = (params) => {
	const value = params[0].value;

	return [
		formatDatetime(value[dims.time]),
		'气温：' + value[dims.temperature],
		'体感温度：' + value[dims.apparentTemperature]
	].join('<br>');
};
