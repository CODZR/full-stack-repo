import { useMemo } from 'react';
import { Box, Flex, Tag } from '@chakra-ui/react';

import { WeatherHourly, WeatherMinutely } from '@/models/weather';
import { WEATHER_ICON_MAP, WEATHER_NAME_MAP, WEATHER_SENSE_MAP } from '../TemperatureChart/constants';
import { getCurrentWeatherInfo, getHumiditySense } from './utils';

interface Props {
	weatherHourly: WeatherHourly;
	weatherMinutely: WeatherMinutely;
}

const WeatherInfo = ({ weatherHourly, weatherMinutely }: Props) => {
	const curWeather = useMemo(() => getCurrentWeatherInfo(weatherHourly), [weatherHourly]);
	const { skycon, temperature, apparentTemperature, humidity, pressure, aqi, pm25 } = curWeather;

	const humiditySense = getHumiditySense(+humidity * 100);
	const skyconSense = WEATHER_SENSE_MAP[skycon];

	return (
		<Box ml={[0, 0, 8]} mt={[0, 0, 4]}>
			<h2>天气概况（每小时更新）</h2>
			<p>
				<strong>城市：余杭区爱力中心附近</strong>
			</p>
			<strong>
				<Flex align="center" gap={1}>
					天气：
					<img src={WEATHER_ICON_MAP[skycon]} />
					<span>{WEATHER_NAME_MAP[skycon]}</span>
					{skyconSense && (
						<Tag variant="solid" colorScheme={skyconSense.includes('+') ? 'red' : 'cyan'}>
							{skyconSense}
						</Tag>
					)}
				</Flex>
			</strong>
			<p>
				<strong>一小时内下雨概率：[{weatherMinutely.precipitation.join(', ')}]</strong>
			</p>
			<p>
				<strong>两小时内下雨概率：[{weatherMinutely.precipitationIn2h.join(', ')}]</strong>
			</p>
			<p>
				<strong>温度：{temperature}℃</strong>
			</p>
			<p>
				<strong>体感温度：{apparentTemperature}℃</strong>
			</p>
			<Flex align="center" gap={1}>
				<strong>湿度：{+humidity * 100}%</strong>
				{humiditySense && (
					<Tag variant="solid" colorScheme={humiditySense === '+' ? 'red' : 'cyan'}>
						{humiditySense}
					</Tag>
				)}
			</Flex>
			<p>
				<span>气压：{Math.floor(+pressure / 100)} hPa</span>
			</p>
			<p>
				<span>空气质量指数：{aqi}</span>
			</p>
			<p>
				<span>PM25: {pm25}</span>
			</p>
			<p>数据来源：彩云天气API</p>
		</Box>
	);
};

export default WeatherInfo;
