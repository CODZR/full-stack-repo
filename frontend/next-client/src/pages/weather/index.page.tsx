import { WeatherHourly, WeatherMinutely } from '@/models/weather';
import { fetchWeatherHourlyAPI, fetchWeatherMinutelyAPI } from '@/services/weather';
import type { GetStaticProps } from 'next';

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

const WeatherPage = (props: Props) => {
	console.log('props: ', props);

	return <div></div>;
};

export default WeatherPage;
