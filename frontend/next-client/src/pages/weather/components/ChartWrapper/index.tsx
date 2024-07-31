/* eslint-disable max-lines */
import { CustomChart, LineChart, BarChart } from 'echarts/charts';
import {
	DataZoomComponent,
	GridComponent,
	TitleComponent,
	TooltipComponent,
	VisualMapComponent,
	MarkLineComponent,
	MarkPointComponent,
	LegendComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

import TemperatureChart from './components/TemperatureChart';
import WindChart from './components/WindChart';

import { WeatherHourly, WeatherMinutely } from '@/models/weather';
import { Flex } from '@chakra-ui/react';
import AqiChart from './components/AqiChart';
import PrecipitationChart from './components/PrecipitationChart';
import WeatherInfo from './components/WeahterInfo';
import PressureHumidityChart from './components/PressureHumidityChart';

echarts.use([
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
	VisualMapComponent,
	DataZoomComponent,
	MarkLineComponent,
	MarkPointComponent,
	LineChart,
	BarChart,
	CustomChart,
	SVGRenderer,
	UniversalTransition
]);

interface Props {
	weatherHourly: WeatherHourly;
	weatherMinutely: WeatherMinutely;
}

const ChartWrapper = ({ weatherHourly, weatherMinutely }: Props) => {
	return (
		<>
			<Flex gap={64} wrap="wrap" align="center">
				<WeatherInfo weatherHourly={weatherHourly} weatherMinutely={weatherMinutely} />
				<TemperatureChart weatherHourly={weatherHourly} />
			</Flex>
			<Flex gap={32} wrap="wrap">
				<WindChart weatherHourly={weatherHourly} />
				<AqiChart weatherHourly={weatherHourly} />
				<PressureHumidityChart weatherHourly={weatherHourly} />
			</Flex>
		</>
	);
};

export default ChartWrapper;
