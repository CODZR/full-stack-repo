/* eslint-disable max-lines */
import { CustomChart, LineChart } from 'echarts/charts';
import {
	DataZoomComponent,
	GridComponent,
	TitleComponent,
	TooltipComponent,
	VisualMapComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

import TemperatureChart from './components/TemperatureChart';
import WindChart from './components/WindChart';

import { WeatherHourly } from '@/models/weather';

echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	VisualMapComponent,
	DataZoomComponent,
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
		<>
			<TemperatureChart weatherHourly={weatherHourly} />
			<WindChart weatherHourly={weatherHourly} />
		</>
	);
};

export default ChartWrapper;
