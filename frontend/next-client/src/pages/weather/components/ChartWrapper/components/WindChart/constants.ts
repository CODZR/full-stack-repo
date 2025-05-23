import { handleTooltipFormatter } from './utils';

export const ARROW_SIZE = 18;

export const dims = {
	time: 0,
	windSpeed: 1,
	windDirection: 2
};

// prettier-ignore
const directionArr = ['W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE', 'N', 'NNW', 'NW', 'WNW'];

export const directionMap = directionArr.reduce((obj, name, index) => {
	obj[name] = (Math.PI / 8) * index;
	return obj;
}, {});

export const directionNameMap = {
	N: '北',
	NNE: '北东北',
	NE: '东北',
	ENE: '东东北',
	E: '东',
	ESE: '东东南',
	SE: '东南	',
	SSE: '南东南',
	S: '南',
	SSW: '南西南',
	SW: '西南',
	WSW: '西西南',
	W: '西',
	WNW: '西西北',
	NW: '西北',
	NNW: '北西北'
};

export const windLevelBrief = {
	0: '无风',
	1: '微风徐徐',
	2: '清风',
	3: '树叶摇摆',
	4: '树枝摇动',
	5: '风力强劲',
	6: '风力强劲',
	7: '风力超强',
	8: '狂风大作',
	9: '狂风呼啸',
	10: '暴风毁树',
	11: '暴风毁树',
	12: '飓风',
	13: '台风',
	14: '强台风',
	15: '强台风',
	16: '超强台风',
	17: '超强台风'
};

export const COMMON_CHART_OPTIONS = {
	title: {
		text: '48h风力/风向预报',
		left: 'center'
	},
	tooltip: {
		trigger: 'axis',
		formatter: handleTooltipFormatter
	},
	toolbox: {
		right: 10,
		feature: {
			restore: {},
			saveAsImage: {}
		}
	},
	grid: {
		left: 40,
		right: 20,
		bottom: 125
	},
	visualMap: {
		type: 'piecewise',
		orient: 'horizontal',
		left: 'center',
		bottom: 10,
		pieces: [
			{
				gte: 8,
				color: 'red',
				label: '大风'
			},
			{
				gte: 5,
				lt: 8,
				color: 'orange',
				label: '中风'
			},
			{
				gte: 3,
				lt: 5,
				color: '#f4e9a3',
				label: '微风'
			},
			{
				lt: 3,
				color: 'lightgreen',
				label: '轻风'
			}
		],
		seriesIndex: 0,
		dimension: 1
	},
	dataZoom: [
		{
			type: 'inside',
			xAxisIndex: 0,
			minSpan: 5,
			end: 35
		},
		{
			type: 'slider',
			xAxisIndex: 0,
			minSpan: 5,
			bottom: 50,
			end: 35
		}
	]
};
