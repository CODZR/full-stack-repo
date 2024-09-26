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
				gt: 0,
				lte: 50,
				color: '#93CE07'
			},
			{
				gt: 50,
				lte: 100,
				color: '#FBDB0F'
			},
			{
				gt: 100,
				lte: 150,
				color: '#FC7D02'
			},
			{
				gt: 150,
				lte: 200,
				color: '#FD0100'
			},
			{
				gt: 200,
				lte: 300,
				color: '#AA069F'
			},
			{
				gt: 300,
				color: '#AC3B2A'
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
