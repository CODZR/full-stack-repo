import { WeatherHourly, WeatherMinutely } from '@/models/weather';
import { fetchWeatherHourlyAPI, fetchWeatherMinutelyAPI } from '@/services/weather';
import type { GetStaticProps } from 'next';
import WindChart from './components/WindChart';

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
			<WindChart weatherHourly={weatherHourly} />
			123
		</div>
	);
};

export default WeatherPage;
