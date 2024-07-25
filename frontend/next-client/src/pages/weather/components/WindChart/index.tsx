/* eslint-disable max-lines */
import { useRef } from 'react';
import { CustomChart, LineChart } from 'echarts/charts';
import {
	DataZoomComponent,
	GridComponent,
	TitleComponent,
	TooltipComponent,
	VisualMapComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { CHART_OPTIONS, dims } from './constants';
import { handleTooltipFormatter, renderArrow, renderWeather } from './utils';

echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	VisualMapComponent,
	DataZoomComponent,
	LineChart,
	CustomChart,
	SVGRenderer,
	UniversalTransition
]);

interface Props {
	weatherHourly: WeatherHourly;
}

const WindChart = ({ weatherHourly }: Props) => {
	const chartRef = useRef(null);

	const firstHourTimetamp = new Date(weatherHourly.firstHourDatetime).getTime();
	const data = new Array(48)
		.fill(1)
		.map((_, idx) => [
			new Date(firstHourTimetamp + idx * 60 * 60 * 1000),
			weatherHourly.windSpeedIn48h[idx],
			weatherHourly.windDirectionIn48h[idx],
			weatherHourly.temperatureIn48h[idx],
			weatherHourly.apparentTemperatureIn48h[idx]
		]);

	const weatherData = new Array(5).map((_, idx) => [
		new Date(firstHourTimetamp + idx * 60 * 60 * 1000),
		0,
		0,
		weatherHourly.temperatureIn48h[idx],
		weatherHourly.apparentTemperatureIn48h[idx]
	]);

	const options = {
		title: {
			text: '天气 风向 风速 气温 预报',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			formatter: handleTooltipFormatter
		},
		grid: {
			top: 160,
			bottom: 125
		},
		xAxis: CHART_OPTIONS['xAxis'],
		yAxis: CHART_OPTIONS['yAxis'],
		visualMap: CHART_OPTIONS['visualMap'],
		dataZoom: CHART_OPTIONS['dataZoom'],
		series: [
			{
				name: '温度',
				type: 'line',
				data: data,
				encode: {
					x: dims.time,
					y: dims.temperature
				},
				markPoint: {
					data: [
						{ type: 'max', name: 'Max' },
						{ type: 'min', name: 'Min' }
					]
				},
				markLine: {
					data: [{ type: 'average', name: 'Avg' }]
				}
			},
			{
				name: '体感温度',
				type: 'line',
				data: data,
				encode: {
					x: dims.time,
					y: dims.apparentTemperature
				},
				markPoint: {
					data: [
						{ type: 'max', name: 'Max' },
						{ type: 'min', name: 'Min' }
					]
				},
				markLine: {
					data: [{ type: 'average', name: 'Avg' }]
				}
			},
			{
				type: 'custom',
				renderItem: renderArrow,
				encode: {
					x: dims.time,
					y: dims.windSpeed
				},
				data: data,
				z: 10
			},
			{
				type: 'line',
				symbol: 'none',
				encode: {
					x: dims.time,
					y: dims.windSpeed
				},
				lineStyle: {
					color: '#aaa',
					type: 'dotted'
				},
				data: data,
				z: 1
			},
			{
				type: 'custom',
				renderItem: renderWeather,
				data: weatherData,
				tooltip: {
					trigger: 'item',
					formatter: function ({ value }) {
						return value[dims.time] + ': ' + value[dims.minTemp] + ' - ' + value[dims.maxTemp] + '°';
					}
				},
				yAxisIndex: 2,
				z: 11
			}
		]
	};
	useChart(chartRef, options);

	return <div ref={chartRef} style={{ width: 800, height: 800 }}></div>;
};

export default WindChart;
