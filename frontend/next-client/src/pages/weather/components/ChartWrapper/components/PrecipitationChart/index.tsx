import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { COMMON_CHART_OPTIONS, dims, getChartOptions } from './constants';

interface Props {
	weatherHourly: WeatherHourly;
}

const PrecipitationChart = ({ weatherHourly }: Props) => {
	const precipitationChartRef = useRef(null);

	const firstHourTimetamp = new Date(weatherHourly.firstHourDatetime).getTime();
	const data = new Array(48)
		.fill(1)
		.map((_, idx) => [
			new Date(firstHourTimetamp + idx * 60 * 60 * 1000),
			weatherHourly.precipitationValueIn48h[idx],
			weatherHourly.precipitationProbabilityIn48h[idx]
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
				name: 'PrecipitationValue',
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#015DD5'
					}
				},
				axisLabel: {
					formatter: '{value} mm／h'
				}
			},
			{
				name: 'PrecipitationProbability',
				type: 'value',
				axisLabel: {
					formatter: '{value} %'
				}
			}
		],
		series: [
			{
				name: 'PrecipitationValue',
				type: 'bar',
				data: data,
				yAxisIndex: 0,
				encode: {
					x: dims.time,
					y: dims.precipitationValue
				}
			},
			{
				name: 'PrecipitationProbability',
				type: 'line',
				data: data,
				yAxisIndex: 1,
				encode: {
					x: dims.time,
					y: dims.precipitationProbability
				}
			}
		]
	};
	useChart(precipitationChartRef, options);

	return <div ref={precipitationChartRef} style={{ width: 700, height: 600 }} />;
};

export default PrecipitationChart;
