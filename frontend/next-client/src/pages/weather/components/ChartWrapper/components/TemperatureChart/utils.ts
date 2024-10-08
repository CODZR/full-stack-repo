import { formatDatetime } from '@/services/utils/format';
import { dims, WEATHER_ICON_MAP, WEATHER_NAME_MAP, weatherIconSize } from './constants';

export const handleTooltipFormatter = (params) => {
	const value = params[0].value;

	return [
		formatDatetime(value[dims.time]),
		`天气：${WEATHER_NAME_MAP[value[dims.skycon]]}`,
		`气温：${value[dims.temperature]}℃`,
		`体感温度：${value[dims.apparentTemperature]}℃`,
		`湿度：${value[dims.humidyty].toFixed(1)}%`,
		`降雨量：${value[dims.precipitationValue]}mm/h`,
		`降雨概率：${(+value[dims.precipitationProbability] * 100).toFixed(2)}%`
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

export const renderWeather = function (param, api) {
	const value = api.value;
	const point = api.coord([value(dims.time), value(dims.temperature)]);

	return {
		type: 'group',
		children: [
			{
				type: 'image',
				style: {
					image: WEATHER_ICON_MAP[api.value(dims.skycon)],
					x: -weatherIconSize / 2,
					y: -weatherIconSize / 2,
					width: weatherIconSize,
					height: weatherIconSize
				},
				position: [point[0], point[1] + 15]
			}
		]
	};
};
