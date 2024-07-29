import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { COMMON_CHART_OPTIONS, dims } from './constants';

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
			weatherHourly.apparentTemperatureIn48h[idx]
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
			}
		]
	};
	useChart(temperatureChartRef, options);

	return <div ref={temperatureChartRef} style={{ width: 700, height: 600 }} />;
};

export default TemperatureChart;
