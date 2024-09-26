/* eslint-disable max-lines */
import { BarChart, CustomChart, LineChart } from 'echarts/charts';
import {
	DataZoomComponent,
	GridComponent,
	LegendComponent,
	MarkLineComponent,
	MarkPointComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

import AqiChart from './components/AqiChart';
import PressureHumidityChart from './components/PressureHumidityChart';
import TemperatureChart from './components/TemperatureChart';
import WeatherInfo from './components/WeahterInfo';
import WindChart from './components/WindChart';
import { Flex } from '@/components';

import { WeatherHourly, WeatherMinutely } from '@/models/weather';

echarts.use([
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
	VisualMapComponent,
	DataZoomComponent,
	ToolboxComponent,
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
			<Flex align="center" gap={64} wrap="wrap">
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
