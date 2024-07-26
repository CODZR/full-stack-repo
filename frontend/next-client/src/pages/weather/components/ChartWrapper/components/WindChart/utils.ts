import { formatDatetime } from '@/services/utils/format';
import { ARROW_SIZE, dims, directionMap, directionNameMap, windLevelBrief } from './constants';

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
		rotation: directionMap[api.value(dims.windDirection)],
		position: point,
		style: {
			fill: api.visual('color'),
			stroke: '#555',
			lineWidth: 1
		}
	};
};

export const handleTooltipFormatter = (params) => {
	const value = params[0].value;

	return [
		formatDatetime(value[dims.time]),
		`风力等级: ${value[dims.windSpeed]} (${windLevelBrief[value[dims.windSpeed]]})`,
		`风向：${value[dims.windDirection]} (${directionNameMap[value[dims.windDirection]]})`
	].join('<br>');
};
