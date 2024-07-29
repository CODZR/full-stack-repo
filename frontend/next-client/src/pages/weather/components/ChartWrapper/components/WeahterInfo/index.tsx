import { WeatherHourly } from '@/models/weather';
import { getCurrentWeatherInfo } from './utils';

interface Props {
	weatherHourly: WeatherHourly;
}

const WeatherInfo = ({ weatherHourly }: Props) => {
	console.log('weatherHourly: ', weatherHourly);
	const curWeather = getCurrentWeatherInfo(weatherHourly);

	return (
		<div>
			<h2>实时天气</h2>
			<p>
				<strong>城市：余杭区爱力中心附近</strong>
			</p>
			<p>
				<strong>天气：{curWeather.skycon}</strong>
			</p>
			<p>
				<strong>温度：{curWeather.temperature}℃</strong>
			</p>
			<p>
				<strong>体感温度：{curWeather.apparentTemperature}℃</strong>
			</p>
			<p>
				<strong>体感温度：{curWeather.apparentTemperature}℃</strong>
			</p>
			<p>
				<strong>湿度：{curWeather.humidity}%</strong>
			</p>
			<p>
				<strong>气压：{curWeather.pressure}</strong>
			</p>
			<p>
				<strong>空气质量指数：{curWeather.aqi}</strong>
			</p>
			<p>
				<strong>PM25: {curWeather.pm25}</strong>
			</p>
		</div>
	);
};

export default WeatherInfo;
