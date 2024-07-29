import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { COMMON_CHART_OPTIONS, dims, getChartOptions } from './constants';
import { renderPrecipitationProbability } from './utils';

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
			+weatherHourly.precipitationProbabilityIn48h[idx] / 1000
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
				name: '降雨量',
				type: 'value',
				axisLabel: {
					formatter: '{value} mm／h'
				}
			}
		],
		series: [
			{
				type: 'bar',
				data: data,
				yAxisIndex: 0,
				encode: {
					x: dims.time,
					y: dims.precipitationValue
				}
			},
			{
				type: 'custom',
				data: data,
				yAxisIndex: 0,
				renderItem: renderPrecipitationProbability,
				encode: {
					x: dims.time,
					y: dims.precipitationProbability
				}
			}
		]
	};
	useChart(precipitationChartRef, options);

	return <div ref={precipitationChartRef} style={{ width: 800, height: 300 }} />;
};

export default PrecipitationChart;
