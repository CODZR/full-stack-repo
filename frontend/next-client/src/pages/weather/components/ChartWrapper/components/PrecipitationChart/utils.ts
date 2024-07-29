import { formatDatetime } from '@/services/utils/format';
import { dims } from './constants';

export const handleTooltipFormatter = (params) => {
	const value = params[0].value;

	return [
		formatDatetime(value[dims.time]),
		'降雨量：' + value[dims.precipitationValue],
		'降雨概率：' + value[dims.precipitationProbability]
	].join('<br>');
};
