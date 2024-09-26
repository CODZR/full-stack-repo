import type { GetStaticProps } from 'next';

import ChartWrapper from './components/ChartWrapper';

import RootLayout from '@/layouts';
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
		<RootLayout>
			<ChartWrapper weatherHourly={weatherHourly} weatherMinutely={weatherMinutely} />
		</RootLayout>
	);
};

export default WeatherPage;
