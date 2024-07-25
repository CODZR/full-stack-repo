import { ARROW_SIZE, dims, WEAHTER_ICON_SIZE } from './constants';
import * as echarts from 'echarts/core';

export const renderArrow = function (param, api) {
	const point = api.coord([api.value(dims.time), api.value(dims.windSpeed)]);

	return {
		type: 'path',
		shape: {
			pathData: 'M31 16l-15-15v9h-26v12h26v9z',
			x: -ARROW_SIZE / 2,
			y: -ARROW_SIZE / 2,
			width: ARROW_SIZE,
			height: ARROW_SIZE
		},
		rotation: api.value(dims.R),
		position: point,
		style: api.style({
			stroke: '#555',
			lineWidth: 1
		})
	};
};

export const renderWeather = function (param, api) {
	const point = api.coord([api.value(dims.time) + (3600 * 1000) / 2, 0]);

	return {
		type: 'group',
		children: [
			{
				type: 'image',
				style: {
					image: api.value(dims.weatherIcon),
					x: -WEAHTER_ICON_SIZE / 2,
					y: -WEAHTER_ICON_SIZE / 2,
					width: WEAHTER_ICON_SIZE,
					height: WEAHTER_ICON_SIZE
				},
				position: [point[0], 110]
			},
			{
				type: 'text',
				style: {
					text: api.value(dims.minTemp) + ' - ' + api.value(dims.maxTemp) + '°',
					textFont: api.font({ fontSize: 14 }),
					textAlign: 'center',
					textVerticalAlign: 'bottom'
				},
				position: [point[0], 80]
			}
		]
	};
};

export const handleTooltipFormatter = (params) => {
	return [
		echarts.format.formatTime('yyyy-MM-dd', params[0].value[dims.time]) +
			' ' +
			echarts.format.formatTime('hh:mm', params[0].value[dims.time]),
		'风速：' + params[0].value[dims.windSpeed],
		'风向：' + params[0].value[dims.R],
		'气温：' + params[0].value[dims.temperature],
		'体感温度：' + params[0].value[dims.apparentTemperature]
	].join('<br>');
};
