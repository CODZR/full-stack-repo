import { handleTooltipFormatter } from './utils';

export const dims = {
	time: 0,
	precipitationValue: 1,
	precipitationProbability: 2
};

export const COMMON_CHART_OPTIONS = {
	title: {
		text: '48h降雨量/降雨概率',
		left: 'center'
	},
	tooltip: {
		trigger: 'axis',
		formatter: handleTooltipFormatter,
		axisPointer: {
			type: 'cross',
			crossStyle: {
				color: '#999'
			}
		}
	},
	grid: {
		bottom: 125
	},
	visualMap: {
		type: 'piecewise',
		orient: 'horizontal',
		left: 'center',
		bottom: 10,
		dimension: 1,
		seriesIndex: 0,
		pieces: [
			{
				gte: 12.8638,
				color: 'black',
				label: '暴雨'
			},
			{
				gte: 2.87,
				lt: 12.8638,
				color: 'red',
				label: '大雨'
			},
			{
				gte: 0.8989,
				lt: 2.87,
				color: 'orange',
				label: '中雨'
			},
			{
				gte: 0.0606,
				lt: 0.8989,
				color: 'green',
				label: '小雨'
			},
			{
				lte: 0.0606,
				color: 'lightgreen',
				label: '无雨'
			}
		]
	},
	dataZoom: [
		{
			type: 'inside',
			xAxisIndex: 0,
			minSpan: 5,
			end: 50
		},
		{
			type: 'slider',
			xAxisIndex: 0,
			minSpan: 5,
			bottom: 50,
			end: 50
		}
	]
};
