import { WeatherHourly } from '@/models/weather';

export const getCurrentWeatherInfo = (weatherHourly: WeatherHourly) => {
	return {
		firstHourDatetime: weatherHourly.firstHourDatetime,
		temperature: weatherHourly.temperatureIn48h[0],
		apparentTemperature: weatherHourly.apparentTemperatureIn48h[0],
		windSpeed: weatherHourly.windSpeedIn48h[0],
		windDirection: weatherHourly.windDirectionIn48h[0],
		humidity: weatherHourly.humidityIn48h[0],
		cloudrate: weatherHourly.cloudrateIn48h[0],
		visibility: weatherHourly.visibilityIn48h[0],
		dswrf: weatherHourly.dswrfIn48h[0],
		skycon: weatherHourly.skyconIn48h[0],
		pressure: weatherHourly.pressureIn48h[0],
		aqi: weatherHourly.aqiIn48h[0],
		pm25: weatherHourly.pm25In48h[0]
	};
};
