import React from 'react';
import { Flex, Heading, Icon, Text } from '@chakra-ui/react';

export default function NavHoverBox({ title, icon, description }) {
	return (
		<>
			<Flex
				borderBottom="10px solid transparent"
				borderRight="10px solid #82AAAD"
				borderTop="10px solid transparent"
				height={0}
				ml="-10px"
				mt="calc(100px - 7.5px)"
				pos="absolute"
				width={0}
			/>
			<Flex
				alignItems="center"
				backgroundColor="#82AAAD"
				borderRadius="10px"
				color="#fff"
				flexDir="column"
				h={200}
				justify="center"
				textAlign="center"
				w={200}
			>
				<Icon as={icon} fontSize="3xl" mb={4} />
				<Heading fontWeight="normal" size="md">
					{title}
				</Heading>
				<Text>{description}</Text>
			</Flex>
		</>
	);
}
