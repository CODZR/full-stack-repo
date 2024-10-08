import { useEffect, useRef, useState } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { COMMON_CHART_OPTIONS, dims } from './constants';

interface Props {
	weatherHourly: WeatherHourly;
}

const AqiChart = ({ weatherHourly }: Props) => {
	const aqiChartRef = useRef(null);
	const [firstHourTimestamp, setFirstHourTimestamp] = useState(0);

	useEffect(() => {
		setFirstHourTimestamp(new Date(weatherHourly.firstHourDatetime).getTime());
	}, [weatherHourly.firstHourDatetime]);

	const data = new Array(48)
		.fill(1)
		.map((_, idx) => [
			new Date(firstHourTimestamp + idx * 60 * 60 * 1000),
			weatherHourly.aqiIn48h[idx],
			weatherHourly.pm25In48h[idx]
		]);

	const options = {
		...COMMON_CHART_OPTIONS,
		xAxis: {
			type: 'time',
			data: data,
			maxInterval: 3600 * 1000 * 24
		},
		yAxis: {},
		series: [
			{
				name: 'AQI',
				type: 'line',
				data: data,
				encode: {
					x: dims.time,
					y: dims.aqi
				},
				markPoint: {
					data: [
						{ type: 'max', name: 'Max' },
						{ type: 'min', name: 'Min' }
					]
				},
				markLine: {
					silent: true,
					lineStyle: {
						color: '#333'
					},
					data: [
						{
							yAxis: 50
						},
						{
							yAxis: 100
						},
						{
							yAxis: 150
						},
						{
							yAxis: 200
						},
						{
							yAxis: 300
						}
					]
				}
			},
			{
				name: 'pm25',
				type: 'line',
				data: data,
				encode: {
					x: dims.time,
					y: dims.pm25
				}
			}
		]
	};
	useChart(aqiChartRef, options);

	return <div ref={aqiChartRef} style={{ width: 500, height: 300 }} />;
};

export default AqiChart;
