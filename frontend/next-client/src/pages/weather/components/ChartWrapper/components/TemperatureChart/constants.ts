import { handleTooltipFormatter } from './utils';

export const weatherIconSize = 18;

export const dims = {
	time: 0,
	temperature: 1,
	apparentTemperature: 2,
	precipitationValue: 3,
	precipitationProbability: 4,
	skycon: 5
};

export const WEATHER_ICON_MAP = {
	CLEAR_DAY: '/weather/clear-day.png',
	CLEAR_NIGHT: '/weather/clear-night.png',
	PARTLY_CLOUDY_DAY: '/weather/partly-cloudy-day.png',
	PARTLY_CLOUDY_NIGHT: '/weather/partly-cloudy-night.png',
	CLOUDY: '/weather/cloudy.png',
	LIGHT_HAZE: '/weather/haze.png',
	MODERATE_HAZE: '/weather/haze.png',
	HEAVY_HAZE: '/weather/haze.png',
	LIGHT_RAIN: '/weather/rain-small.png',
	MODERATE_RAIN: '/weather/rain-middle.png',
	HEAVY_RAIN: '/weather/rain-big.png',
	STORM_RAIN: '/weather/rain-storm.png',
	FOG: '/weather/fog.png',
	LIGHT_SNOW: '/weather/snow-small.png',
	MODERATE_SNOW: '/weather/snow-middle.png',
	HEAVY_SNOW: '/weather/snow-big.png',
	STORM_SNOW: '/weather/snow-storm.png',
	DUST: '/weather/dust.png',
	SAND: '/weather/sand.png',
	WIND: '/weather/wind.png'
};

export const WEATHER_NAME_MAP = {
	CLEAR_DAY: '晴（白天）',
	CLEAR_NIGHT: '晴（夜间）',
	PARTLY_CLOUDY_DAY: '多云（白天）',
	PARTLY_CLOUDY_NIGHT: '多云（夜间）',
	CLOUDY: '阴',
	LIGHT_HAZE: '轻度雾霾',
	MODERATE_HAZE: '中度雾霾',
	HEAVY_HAZE: '重度雾霾',
	LIGHT_RAIN: '小雨',
	MODERATE_RAIN: '中雨',
	HEAVY_RAIN: '大雨',
	STORM_RAIN: '暴雨',
	FOG: '雾',
	LIGHT_SNOW: '小雪',
	MODERATE_SNOW: '中雪',
	HEAVY_SNOW: '大雪',
	STORM_SNOW: '暴雪',
	DUST: '浮尘',
	SAND: '沙尘',
	WIND: '大风'
};

export const COMMON_CHART_OPTIONS = {
	title: {
		text: '48h气温（虚线）/体感温度（实线）',
		left: 'center'
	},
	tooltip: {
		trigger: 'axis',
		formatter: handleTooltipFormatter
	},
	grid: {
		top: 150,
		right: 125,
		bottom: 125
	},

	visualMap: [
		{
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
		{
			type: 'piecewise',
			orient: 'vertical',
			top: 'center',
			right: 0,
			dimension: 3,
			seriesIndex: 2,
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
		}
	],
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
