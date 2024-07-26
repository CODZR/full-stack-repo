import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { CHART_OPTIONS, dims } from './constants';
import { handleTooltipFormatter } from './utils';

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
		title: {
			text: '48h气温/体感温度',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			formatter: handleTooltipFormatter
		},
		grid: {
			bottom: 125
		},
		dataSet: {
			source: data
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

	return <div ref={temperatureChartRef} style={{ width: 600, height: 600 }} />;
};

export default TemperatureChart;
