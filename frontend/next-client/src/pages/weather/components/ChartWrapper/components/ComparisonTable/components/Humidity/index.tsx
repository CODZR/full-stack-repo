import React from 'react';
import { ChakraProvider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const HumidityComparisionTable = () => {
	return (
		<ChakraProvider>
			<Table colorScheme="teal" variant="striped">
				<Thead>
					<Tr>
						<Th>湿度</Th>
						<Th>体感</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>{'<30%'}</Td>
						<Td>干燥</Td>
					</Tr>
					<Tr>
						<Td>{'30-60%'}</Td>
						<Td>舒适</Td>
					</Tr>
					<Tr>
						<Td>60-90%</Td>
						<Td>潮湿</Td>
					</Tr>
					<Tr>
						<Td>{'>=90%'}</Td>
						<Td>极湿</Td>
					</Tr>
				</Tbody>
			</Table>
		</ChakraProvider>
	);
};

export default HumidityComparisionTable;
