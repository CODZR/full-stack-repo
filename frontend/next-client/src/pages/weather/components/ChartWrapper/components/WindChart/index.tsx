import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { CHART_OPTIONS, dims } from './constants';
import { handleTooltipFormatter, renderArrow } from './utils';

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
		title: {
			text: '48h风力/风向预报',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			formatter: handleTooltipFormatter
		},
		grid: {
			bottom: 125
		},
		xAxis: CHART_OPTIONS['xAxis'],
		yAxis: CHART_OPTIONS['yAxis'],
		visualMap: CHART_OPTIONS['visualMap'],
		dataZoom: CHART_OPTIONS['dataZoom'],
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

	return <div ref={windChartRef} style={{ width: 600, height: 600 }} />;
};

export default WindChart;
