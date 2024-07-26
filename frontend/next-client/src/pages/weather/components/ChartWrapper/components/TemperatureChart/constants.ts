export const dims = {
	time: 0,
	temperature: 1,
	apparentTemperature: 2
};

export const CHART_OPTIONS = {
	xAxis: {
		type: 'time',
		maxInterval: 3600 * 1000 * 24,
		splitLine: {
			lineStyle: {
				color: '#ddd'
			}
		}
	},
	yAxis: {
		type: 'value',
		max: 45,
		axisLine: {
			lineStyle: {
				color: '#015DD5'
			}
		},
		axisLabel: {
			formatter: '{value} ℃'
		}
	},

	visualMap: {
		type: 'piecewise',
		orient: 'horizontal',
		left: 'center',
		bottom: 10,
		dimension: 2,
		seriesIndex: 1,
		pieces: [
			{
				gte: 37,
				color: 'red',
				label: '酷热（>=37℃）'
			},
			{
				gte: 26,
				lt: 37,
				color: 'orange',
				label: '高温（26-37℃）'
			},
			{
				gte: 17,
				lt: 26,
				color: 'lightgreen',
				label: '凉爽（17-26℃）'
			},
			{
				gte: 4,
				lt: 16,
				color: 'lightblue',
				label: '低温（4-16℃）'
			},
			{
				lt: 4,
				color: 'blue',
				label: '严寒（<4℃）'
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
