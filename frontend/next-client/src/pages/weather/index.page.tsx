import type { GetStaticProps } from 'next';

import ChartWrapper from './components/ChartWrapper';

import { WeatherHourly, WeatherMinutely } from '@/models/weather';
import { fetchWeatherHourlyAPI, fetchWeatherMinutelyAPI } from '@/services/weather';

export const getStaticProps: GetStaticProps = async () => {
	const weatherHourly = await fetchWeatherHourlyAPI();
	const weatherMinutely = await fetchWeatherMinutelyAPI();

	return {
		props: {
			weatherHourly,
			weatherMinutely
		}
	};
};

interface Props {
	weatherHourly: WeatherHourly;
	weatherMinutely: WeatherMinutely;
}

const WeatherPage = ({ weatherHourly, weatherMinutely }: Props) => {
	return (
		<div>
			<ChartWrapper weatherHourly={weatherHourly} />
		</div>
	);
};

export default WeatherPage;
