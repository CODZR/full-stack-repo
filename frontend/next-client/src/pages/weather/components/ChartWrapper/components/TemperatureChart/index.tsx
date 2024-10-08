import { useEffect, useRef, useState } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { COMMON_CHART_OPTIONS, dims } from './constants';
import { renderPrecipitationProbability, renderWeather } from './utils';

interface Props {
	weatherHourly: WeatherHourly;
}

const TemperatureChart = ({ weatherHourly }: Props) => {
	const {
		firstHourDatetime,
		temperatureIn48h,
		apparentTemperatureIn48h,
		precipitationProbabilityIn48h,
		precipitationValueIn48h,
		skyconIn48h,
		humidityIn48h
	} = weatherHourly;

	const temperatureChartRef = useRef(null);

	const [firstHourTimestamp, setFirstHourTimestamp] = useState(0);

	useEffect(() => {
		setFirstHourTimestamp(new Date(firstHourDatetime).getTime());
	}, [firstHourDatetime]);

	const data = new Array(48)
		.fill(1)
		.map((_, idx) => [
			new Date(firstHourTimestamp + idx * 60 * 60 * 1000),
			temperatureIn48h[idx],
			apparentTemperatureIn48h[idx],
			+precipitationProbabilityIn48h[idx] > 20 ? precipitationValueIn48h[idx] : 0,
			+precipitationProbabilityIn48h[idx] / 100,
			skyconIn48h[idx],
			+humidityIn48h[idx] * 100
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

	return <div ref={temperatureChartRef} style={{ width: 1000, height: 500 }} />;
};

export default TemperatureChart;
