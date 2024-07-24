import { WeatherHourly, WeatherMinutely } from '@/models/weather';
import requester from './http';

export async function fetchWeatherHourlyAPI() {
	const res = await requester.get<WeatherHourly>(`weathers/hourly`);

	return res;
}

export async function fetchWeatherMinutelyAPI() {
	const res = await requester.get<WeatherMinutely>(`weathers/minutely`);

	return res;
}
