import { WeatherHourly } from '@/models/weather';

export const getCurrentWeatherInfo = (weatherHourly: WeatherHourly) => {
	const {
		firstHourDatetime,
		temperatureIn48h,
		apparentTemperatureIn48h,
		windSpeedIn48h,
		windDirectionIn48h,
		humidityIn48h,
		cloudrateIn48h,
		visibilityIn48h,
		dswrfIn48h,
		skyconIn48h,
		pressureIn48h,
		aqiIn48h,
		pm25In48h
	} = weatherHourly;

	const firstHourDate = new Date(firstHourDatetime);
	const now = new Date();

	const diffInHours = Math.floor((now.getTime() - firstHourDate.getTime()) / (1000 * 60 * 60));

	return {
		firstHourDatetime: firstHourDatetime,
		temperature: temperatureIn48h[diffInHours],
		apparentTemperature: apparentTemperatureIn48h[diffInHours],
		windSpeed: windSpeedIn48h[diffInHours],
		windDirection: windDirectionIn48h[diffInHours],
		humidity: humidityIn48h[diffInHours],
		cloudrate: cloudrateIn48h[diffInHours],
		visibility: visibilityIn48h[diffInHours],
		dswrf: dswrfIn48h[diffInHours],
		skycon: skyconIn48h[diffInHours],
		pressure: pressureIn48h[diffInHours],
		aqi: aqiIn48h[diffInHours],
		pm25: pm25In48h[diffInHours]
	};
};

export const getHumiditySense = (humidity: number) => {
	if (humidity < 30) return '-';
	if (humidity > 60) return '+';
	return '';
};
