import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { getChartOptions } from './constants';

interface Props {
	weatherHourly: WeatherHourly;
}

const AqiChart = ({ weatherHourly }: Props) => {
	console.log('weatherHourly: ', weatherHourly);
	const aqiChartRef = useRef(null);

	const firstHourTimetamp = new Date(weatherHourly.firstHourDatetime).getTime();
	const data = new Array(48)
		.fill(1)
		.map((_, idx) => [new Date(firstHourTimetamp + idx * 60 * 60 * 1000), weatherHourly.aqiIn48h[idx]]);

	const options = getChartOptions(data);
	useChart(aqiChartRef, options);

	return <div ref={aqiChartRef} style={{ width: 600, height: 600 }} />;
};

export default AqiChart;
