import React from 'react';
import { ChakraProvider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const WindComparisionTable = () => {
	return (
		<ChakraProvider>
			<Table colorScheme="teal" variant="striped">
				<Thead>
					<Tr>
						<Th>风力等级</Th>
						<Th>描述</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>{'<3级'}</Td>
						<Td>轻风</Td>
					</Tr>
					<Tr>
						<Td>3-5级</Td>
						<Td>微风</Td>
					</Tr>
					<Tr>
						<Td>5-8级</Td>
						<Td>中风</Td>
					</Tr>
					<Tr>
						<Td>{'>=8级'}</Td>
						<Td>大风</Td>
					</Tr>
				</Tbody>
			</Table>
		</ChakraProvider>
	);
};

export default WindComparisionTable;
