import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { COMMON_CHART_OPTIONS, dims } from './constants';
import { renderPrecipitationProbability, renderWeather } from './utils';

interface Props {
	weatherHourly: WeatherHourly;
}

const TemperatureChart = ({ weatherHourly }: Props) => {
	const temperatureChartRef = useRef(null);

	const firstHourTimetamp = new Date(weatherHourly.firstHourDatetime).getTime();
	const data = new Array(48)
		.fill(1)
		.map((_, idx) => [
			new Date(firstHourTimetamp + idx * 60 * 60 * 1000),
			weatherHourly.temperatureIn48h[idx],
			weatherHourly.apparentTemperatureIn48h[idx],
			weatherHourly.precipitationValueIn48h[idx],
			+weatherHourly.precipitationProbabilityIn48h[idx] / 1000,
			weatherHourly.skyconIn48h[idx]
		]);

	const options = {
		...COMMON_CHART_OPTIONS,
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
				name: '温度',
				axisLine: {
					lineStyle: {
						color: '#015DD5'
					}
				},
				axisLabel: {
					formatter: '{value} ℃'
				}
			},
			{
				name: '降雨量',
				type: 'value',
				axisLabel: {
					formatter: '{value} mm／h'
				}
			}
		],
		series: [
			{
				name: '温度',
				type: 'line',
				data: data,
				encode: {
					x: dims.time,
					y: dims.temperature
				},
				lineStyle: {
					type: 'dotted'
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
				}
			},
			{
				type: 'bar',
				data: data,
				yAxisIndex: 1,
				encode: {
					x: dims.time,
					y: dims.precipitationValue
				}
			},
			{
				type: 'custom',
				data: data,
				yAxisIndex: 1,
				renderItem: renderPrecipitationProbability,
				encode: {
					x: dims.time,
					y: dims.precipitationProbability
				}
			},
			{
				type: 'custom',
				renderItem: renderWeather,
				data: data,
				z: 11
			}
		]
	};
	useChart(temperatureChartRef, options);

	return <div ref={temperatureChartRef} style={{ width: 800, height: 500 }} />;
};

export default TemperatureChart;
