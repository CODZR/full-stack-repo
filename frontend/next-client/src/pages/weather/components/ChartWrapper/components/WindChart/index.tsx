import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { COMMON_CHART_OPTIONS, dims } from './constants';
import { renderArrow } from './utils';

interface Props {
	weatherHourly: WeatherHourly;
}

const WindChart = ({ weatherHourly }: Props) => {
	const windChartRef = useRef(null);

	const firstHourTimetamp = new Date(weatherHourly.firstHourDatetime).getTime();
	const data = new Array(48)
		.fill(1)
		.map((_, idx) => [
			new Date(firstHourTimetamp + idx * 60 * 60 * 1000),
			weatherHourly.windSpeedIn48h[idx],
			weatherHourly.windDirectionIn48h[idx]
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
			name: '风力等级',
			axisLabel: {
				formatter: '{value} 级'
			}
		},
		series: [
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
			}
		]
	};
	useChart(windChartRef, options);

	return <div ref={windChartRef} style={{ width: 500, height: 300 }} />;
};

export default WindChart;
