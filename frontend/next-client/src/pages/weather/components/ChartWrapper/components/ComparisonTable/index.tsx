import { Flex } from '@chakra-ui/react';

import AqiComparisonTable from './components/Aqi';
import HumidityComparisionTable from './components/Humidity';
import RainfallIntensityComparisonTable from './components/RainfallIntensity';
import TemperatureComparisionTable from './components/Temperature';
import WindComparisionTable from './components/Wind';

const ComparisonTable = () => {
	return (
		<div style={{ marginTop: 32 }}>
			<strong>天气格式速查表</strong>
			<Flex direction="column" gap={16} maxW={500}>
				<TemperatureComparisionTable />
				<HumidityComparisionTable />
				<WindComparisionTable />
				<RainfallIntensityComparisonTable />
				<AqiComparisonTable />
			</Flex>
		</div>
	);
};

export default ComparisonTable;
