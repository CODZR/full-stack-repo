import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { COMMON_CHART_OPTIONS, dims } from './constants';

interface Props {
	weatherHourly: WeatherHourly;
}

const PressureHumidityChart = ({ weatherHourly }: Props) => {
	const pressureHumidityChartRef = useRef(null);

	const firstHourTimetamp = new Date(weatherHourly.firstHourDatetime).getTime();
	const data = new Array(48)
		.fill(1)
		.map((_, idx) => [
			new Date(firstHourTimetamp + idx * 60 * 60 * 1000),
			Math.floor(+weatherHourly.pressureIn48h[idx] / 100),
			+weatherHourly.humidityIn48h[idx] * 100
		]);

	const options = {
		...COMMON_CHART_OPTIONS,
		xAxis: {
			type: 'time',
			data: data,
			maxInterval: 3600 * 1000 * 24,
			splitLine: {
				lineStyle: {
					color: '#ddd'
				}
			}
		},
		yAxis: [
			{
				name: '气压',
				type: 'value',
				startValue: 950,
				axisLabel: {
					formatter: '{value} hPa'
				}
			},
			{
				name: '湿度',
				type: 'value',
				axisLabel: {
					formatter: '{value} %'
				}
			}
		],
		series: [
			{
				name: '气压',
				type: 'line',
				data: data,
				encode: {
					x: dims.time,
					y: dims.pressure
				},
				markPoint: {
					data: [
						{ type: 'max', name: 'Max' },
						{ type: 'min', name: 'Min' }
					]
				}
			},
			{
				name: '湿度',
				type: 'bar',
				data: data,
				yAxisIndex: 1,
				encode: {
					x: dims.time,
					y: dims.humidity
				}
			}
		]
	};
	useChart(pressureHumidityChartRef, options);

	return <div ref={pressureHumidityChartRef} style={{ width: 500, height: 300 }} />;
};

export default PressureHumidityChart;
