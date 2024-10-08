export const dims = {
	time: 0,
	aqi: 1,
	pm25: 2
};

export const COMMON_CHART_OPTIONS = {
	title: {
		text: '48h余杭AQI/PM25',
		left: 'center'
	},
	tooltip: {
		trigger: 'axis'
	},
	toolbox: {
		right: 10,
		feature: {
			restore: {},
			saveAsImage: {}
		}
	},
	grid: {
		left: 32,
		right: 20,
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
				lt: 50,
				color: '#93CE07',
				label: '优'
			},
			{
				gte: 50,
				lt: 100,
				color: '#FBDB0F',
				label: '良'
			},
			{
				gte: 100,
				lt: 150,
				color: '#FC7D02',
				label: '轻度污染'
			},
			{
				gte: 150,
				lt: 200,
				color: '#FD0100',
				label: '中度污染'
			},
			{
				gte: 200,
				color: 'AA069F',
				label: '重度污染'
			}
		],
		outOfRange: {
			color: '#999'
		}
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
