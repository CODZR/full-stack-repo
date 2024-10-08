import React from 'react';
import { ChakraProvider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const RainfallIntensityComparisonTable = () => {
	return (
		<ChakraProvider>
			<Table colorScheme="teal" variant="striped">
				<Thead>
					<Tr>
						<Th>降水强度</Th>
						<Th>降水量 mm/h</Th>
						<Th>天气</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>{'<0.031'}</Td>
						<Td>{'<0.08'}</Td>
						<Td>无雨／雪</Td>
					</Tr>
					<Tr>
						<Td>0.031～0.25</Td>
						<Td>0.08~3.44</Td>
						<Td>小雨／雪</Td>
					</Tr>
					<Tr>
						<Td>0.25～0.35</Td>
						<Td>3.44~11.33</Td>
						<Td>中雨／雪</Td>
					</Tr>
					<Tr>
						<Td>0.35～0.48</Td>
						<Td>11.33~51.30</Td>
						<Td>大雨／雪</Td>
					</Tr>
					<Tr>
						<Td>{'>=0.48'}</Td>
						<Td>{'>=51.30'}</Td>
						<Td>暴雨／雪</Td>
					</Tr>
				</Tbody>
			</Table>
		</ChakraProvider>
	);
};

export default RainfallIntensityComparisonTable;
