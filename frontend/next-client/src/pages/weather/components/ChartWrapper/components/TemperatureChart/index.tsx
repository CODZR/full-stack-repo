import { useRef } from 'react';

import { useChart } from '@/hooks/echarts';
import { WeatherHourly } from '@/models/weather';
import { getChartOptions } from './constants';

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

	const options = getChartOptions(data);
	useChart(temperatureChartRef, options);

	return <div ref={temperatureChartRef} style={{ width: 700, height: 600 }} />;
};

export default TemperatureChart;
