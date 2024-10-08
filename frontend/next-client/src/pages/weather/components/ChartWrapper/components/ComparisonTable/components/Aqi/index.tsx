import React from 'react';
import { ChakraProvider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const AqiComparisonTable = () => {
	return (
		<ChakraProvider>
			<Table colorScheme="teal" variant="striped">
				<Thead>
					<Tr>
						<Th>国标指数</Th>
						<Th>空气质量等级</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>0~50</Td>
						<Td>优</Td>
					</Tr>
					<Tr>
						<Td>51~100</Td>
						<Td>良</Td>
					</Tr>
					<Tr>
						<Td>101~150</Td>
						<Td>轻度污染</Td>
					</Tr>
					<Tr>
						<Td>151~200</Td>
						<Td>中度污染</Td>
					</Tr>
					<Tr>
						<Td>{'>=200'}</Td>
						<Td>重度污染</Td>
					</Tr>
				</Tbody>
			</Table>
		</ChakraProvider>
	);
};

export default AqiComparisonTable;
