export const ARROW_SIZE = 18;
export const WEAHTER_ICON_SIZE = 45;

export const dims = {
	time: 0,
	windSpeed: 1,
	R: 2,
	temperature: 3,
	apparentTemperature: 4,
	weatherIcon: 2,
	minTemp: 3,
	maxTemp: 4
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
	yAxis: [
		{
			type: 'value',
			max: 45,
			axisLine: {
				lineStyle: {
					color: '#015DD5'
				}
			},
			axisLabel: {
				formatter: '{value} °C'
			}
		},
		{
			type: 'value',
			name: '风速（节）',
			nameLocation: 'middle',
			nameGap: 35,
			max: 27,
			axisLine: {
				lineStyle: {
					color: '#666'
				}
			},
			splitLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				formatter: '{value} 节'
			}
		},
		{}
	],
	visualMap: {
		type: 'piecewise',
		orient: 'horizontal',
		left: 'center',
		bottom: 10,
		pieces: [
			{
				gte: 17,
				color: '#18BF12',
				label: '大风（>=17节）'
			},
			{
				gte: 11,
				lt: 17,
				color: '#f4e9a3',
				label: '中风（11  ~ 17 节）'
			},
			{
				lt: 11,
				color: '#D33C3E',
				label: '微风（小于 11 节）'
			}
		],
		seriesIndex: 1,
		dimension: 1
	},
	dataZoom: [
		{
			type: 'inside',
			xAxisIndex: 0,
			minSpan: 5
		},
		{
			type: 'slider',
			xAxisIndex: 0,
			minSpan: 5,
			bottom: 50
		}
	]
};
