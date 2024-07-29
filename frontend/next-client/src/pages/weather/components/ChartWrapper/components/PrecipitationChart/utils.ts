import { formatDatetime } from '@/services/utils/format';
import { dims } from './constants';

export const handleTooltipFormatter = (params) => {
	const value = params[0].value;

	return [
		formatDatetime(value[dims.time]),
		'降雨量：' + value[dims.precipitationValue],
		`降雨概率：${+value[dims.precipitationProbability] * 100}%`
	].join('<br>');
};

export const renderPrecipitationProbability = (param, api) => {
	const value = api.value;
	const precipitationValue = value(dims.precipitationValue);
	const point = api.coord([value(dims.time), precipitationValue]);

	return {
		type: 'text',
		position: point,
		style: {
			text: precipitationValue > 0.0606 ? `${value(dims.precipitationProbability) * 1000}%` : '',
			y: -10,
			x: -6,
			fontSize: 8,
			fill: '#333'
		}
	};
};
