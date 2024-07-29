export const getChartOptions = (data) => ({
	title: {
		text: '48h余杭AQI（空气质量指数）',
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
	xAxis: {
		type: 'time',
		data: data,
		maxInterval: 3600 * 1000 * 24,
		splitLine: {
			lineStyle: {
				color: '#ddd'
			}
		}
	},
	yAxis: {},
	series: {
		name: '余杭 AQI',
		type: 'line',
		data: data,
		markLine: {
			silent: true,
			lineStyle: {
				color: '#333'
			},
			data: [
				{
					yAxis: 50
				},
				{
					yAxis: 100
				},
				{
					yAxis: 150
				},
				{
					yAxis: 200
				},
				{
					yAxis: 300
				}
			]
		}
	},
	visualMap: {
		type: 'piecewise',
		orient: 'horizontal',
		left: 'center',
		bottom: 10,
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
});
