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
			}
		]
	};
	useChart(temperatureChartRef, options);

	return <div ref={temperatureChartRef} style={{ width: 800, height: 800 }} />;
};

export default TemperatureChart;
