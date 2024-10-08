import React from 'react';
import { ChakraProvider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const TemperatureComparisionTable = () => {
	return (
		<ChakraProvider>
			<Table colorScheme="teal" variant="striped">
				<Thead>
					<Tr>
						<Th>温度 ℃</Th>
						<Th>体感</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>{'<4℃'}</Td>
						<Td>寒冷</Td>
					</Tr>
					<Tr>
						<Td>4-16℃</Td>
						<Td>低温</Td>
					</Tr>
					<Tr>
						<Td>17-26℃</Td>
						<Td>凉爽</Td>
					</Tr>
					<Tr>
						<Td>26-37℃</Td>
						<Td>高温</Td>
					</Tr>
					<Tr>
						<Td>{'>=37℃'}</Td>
						<Td>酷热</Td>
					</Tr>
				</Tbody>
			</Table>
		</ChakraProvider>
	);
};

export default TemperatureComparisionTable;
