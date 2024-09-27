import { handleTooltipFormatter } from './utils';

export const weatherIconSize = 18;

export const dims = {
	time: 0,
	temperature: 1,
	apparentTemperature: 2,
	precipitationValue: 3,
	precipitationProbability: 4,
	skycon: 5,
	humidyty: 6
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

export const WEATHER_SENSE_MAP = {
	CLEAR_DAY: '++', // 晴天（白天）通常会让人感到温暖
	CLEAR_NIGHT: '-', // 晴天（夜间）通常会让人感到寒冷
	PARTLY_CLOUDY_DAY: '+', // 多云（白天）可能会稍微降低体感温度，但通常仍感到温暖
	PARTLY_CLOUDY_NIGHT: '-', // 多云（夜间）通常感到寒冷
	CLOUDY: '', // 阴天对体感温度影响不大
	LIGHT_HAZE: '+', // 轻度雾霾通常会让人觉得不那么舒适，但温度影响不大
	MODERATE_HAZE: '+-', // 中度雾霾可能会让人感到稍微闷热（+）或寒冷（-），视具体环境而定
	HEAVY_HAZE: '-+', // 重度雾霾通常会更冷，尤其在潮湿的环境中
	LIGHT_RAIN: '-', // 小雨可能引起明显的寒冷感
	MODERATE_RAIN: '--', // 中雨通常会让人感到冷
	HEAVY_RAIN: '---', // 大雨会让人感到很冷
	STORM_RAIN: '---', // 暴雨也会让人觉得寒冷，尤其是有风的时候
	FOG: '-', // 雾会让人感到寒冷
	LIGHT_SNOW: '---', // 小雪会让人感到很冷
	MODERATE_SNOW: '---', // 中雪会进一步降低体感温度
	HEAVY_SNOW: '---', // 大雪会让体感温度非常低
	STORM_SNOW: '---', // 暴雪会让体感温度极低
	DUST: '+-', // 浮尘天气可能会让人感到不适，但影响依赖于具体背景
	SAND: '+-', // 沙尘天气可能让人感到闷热或寒冷，具体情况取决于环境
	WIND: '-' // 大风通常会使人感到冷
};

export const COMMON_CHART_OPTIONS = {
	title: {
		text: '48h天气预报(每日6.00更新)',
		left: 'center'
	},
	tooltip: {
		trigger: 'axis',
		formatter: handleTooltipFormatter
	},
	grid: {
		top: 80,
		bottom: 175
	},

	visualMap: [
		{
			type: 'piecewise',
			orient: 'horizontal',
			left: 'center',
			bottom: 90,
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
					color: 'cyan',
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
			orient: 'horizontal',
			bottom: 115,
			left: 'center',
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
