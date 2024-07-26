/* eslint-disable max-lines */
import { CustomChart, LineChart } from 'echarts/charts';
import {
	DataZoomComponent,
	GridComponent,
	TitleComponent,
	TooltipComponent,
	VisualMapComponent,
	MarkLineComponent,
	MarkPointComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

import TemperatureChart from './components/TemperatureChart';
import WindChart from './components/WindChart';

import { WeatherHourly } from '@/models/weather';
import { Flex } from '@chakra-ui/react';
import { wrap } from 'framer-motion';

echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	VisualMapComponent,
	DataZoomComponent,
	MarkLineComponent,
	MarkPointComponent,
	LineChart,
	CustomChart,
	SVGRenderer,
	UniversalTransition
]);

interface Props {
	weatherHourly: WeatherHourly;
}

const ChartWrapper = ({ weatherHourly }: Props) => {
	return (
		<Flex gap={32} wrap="wrap">
			<TemperatureChart weatherHourly={weatherHourly} />
			<WindChart weatherHourly={weatherHourly} />
		</Flex>
	);
};

export default ChartWrapper;
