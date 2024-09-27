export const dims = {
	time: 0,
	pressure: 1,
	humidity: 2
};

export const COMMON_CHART_OPTIONS = {
	title: {
		text: '48h余杭气压/湿度',
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
		seriesIndex: 1,
		pieces: [
			{
				gte: 90,
				color: 'blue',
				label: '极湿（>90%）'
			},
			{
				gte: 60,
				lt: 90,
				color: 'cyan',
				label: '较湿（60-90%）'
			},
			{
				gte: 30,
				lt: 60,
				color: 'green',
				label: '舒适（<60%）'
			},
			{
				lt: 30,
				color: 'red',
				label: '干燥（<30%）'
			}
		]
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
